export const meta = {
  name: 'design-fidelity-check',
  description: 'Compare a Claude Design source against its local implementation, screen-by-screen, and synthesize a gap report',
  whenToUse: 'When a Claude Design mockup has been updated (or is suspected to have drifted from the live site) and you need a per-screen/per-component gap analysis. The ORCHESTRATOR must do prep work before calling this workflow — see .claude/skills/design-fidelity-check/SKILL.md — because DesignSync MCP and the authenticated claude-in-chrome browser session are NOT available inside workflow agents.',
  phases: [
    { title: 'Compare', detail: 'one subagent per screen/component — reads its design-spec line range + the local implementation file, screenshots the local render via Playwright, reports a structured gap' },
    { title: 'Synthesize', detail: 'one agent consolidates all per-screen findings into an executive-ready gap summary with a suggested remediation sequence' },
  ],
}

// Expected `args` shape (all fields except `screens` are optional but recommended):
// {
//   contextNote: string,            // 1-2 sentences of shared context every compare agent needs
//   designSourcePath: string,       // absolute path to the design source file the orchestrator already fetched/extracted
//   designSourceNotes: string,      // e.g. "template language with sc-if/{{}} bindings — read past the syntax"
//   localFilePath: string,          // absolute path to the local implementation file(s) — describe if shared across screens
//   localNotes: string,             // e.g. "shared by all N screens; there is no per-screen file"
//   devServerUrl: string,           // e.g. http://localhost:5173 — orchestrator must re-detect this each run, ports drift
//   playwrightSkillDir: string,     // absolute path to the playwright-skill directory
//   synthesisNote: string,          // optional extra instruction for the synthesis agent
//   screens: [{
//     name: string,                 // display name, e.g. "Analytics"
//     jsxRange: [offset, limit],    // line range in designSourcePath for this screen's markup
//     dataRange: [offset, limit],   // optional — line range for this screen's data/content block
//     localUiHint: string,          // how to reveal this screen in the local UI, e.g. "hover the shelf card titled 'Analytics'"
//     extraDesignRanges: [[offset, limit], ...],  // optional — extra ranges (e.g. shared chart-construction code)
//   }, ...],
// }

const GAP_SCHEMA = {
  type: 'object',
  properties: {
    screen: { type: 'string' },
    designSpecSummary: { type: 'string' },
    localImplSummary: { type: 'string' },
    gaps: { type: 'array', items: { type: 'string' } },
    severity: { type: 'string', enum: ['Critical', 'Major', 'Minor', 'None'] },
  },
  required: ['screen', 'designSpecSummary', 'localImplSummary', 'gaps', 'severity'],
}

function buildComparePrompt(screen, ctx) {
  const extraRanges = (screen.extraDesignRanges || [])
    .map(([offset, limit]) => `- Also read lines ${offset}-${offset + limit} (offset ${offset}, limit ${limit}) in the same design source — additional context relevant to this screen.`)
    .join('\n')

  return `You are auditing a visual/functional gap between a Claude Design mockup and its live implementation, for the "${screen.name}" screen/component. Report the gap only — do not propose or write implementation code.

Context: ${ctx.contextNote || 'A design source has evolved and the local implementation may have drifted from it.'}

Step 1 — Read the design source for this screen:
- File: ${ctx.designSourcePath}
- Read lines ${screen.jsxRange[0]}-${screen.jsxRange[0] + screen.jsxRange[1]} (offset ${screen.jsxRange[0]}, limit ${screen.jsxRange[1]}) — this is the markup/structure for "${screen.name}".
${screen.dataRange ? `- Read lines ${screen.dataRange[0]}-${screen.dataRange[0] + screen.dataRange[1]} (offset ${screen.dataRange[0]}, limit ${screen.dataRange[1]}) — this is the data/content feeding that markup.` : ''}
${extraRanges}
${ctx.designSourceNotes ? `- Note: ${ctx.designSourceNotes}` : ''}

Step 2 — Read the current local implementation:
- File(s): ${ctx.localFilePath}
${ctx.localNotes ? `- Note: ${ctx.localNotes}` : ''}

Step 3 — Screenshot the current local rendering:
- Dev server: ${ctx.devServerUrl}
- Use the playwright-skill (base dir ${ctx.playwrightSkillDir}) — write a script to a uniquely named temp file and run it via \`node run.js <script>\` from that directory.
- In the script: launch chromium headless:false, viewport 1600x1000, goto ${ctx.devServerUrl}, then: ${screen.localUiHint || 'navigate to whatever reveals this screen/component'}. Wait ~600ms for any CSS transition, then screenshot the relevant area to a temp png.
- View that screenshot with the Read tool before writing your report, so your local-implementation summary reflects what is actually rendered right now, not an assumption.

Step 4 — Report as structured output:
- screen: "${screen.name}"
- designSpecSummary: concrete content/structure the design source specifies (be specific — names, values, colors, data shapes; read past any template-language syntax to the real content).
- localImplSummary: what the local implementation actually renders today, confirmed via the screenshot.
- gaps: a list of concrete gaps — content/data drift, visual/style drift, interactivity/architecture drift — whichever apply. Each item should be a single concrete, checkable statement, not a vague generality.
- severity: your judgment — Critical (broken/misleading or flagship feature badly behind), Major (meaningfully behind but not misleading), Minor (small drift), or None (no meaningful gap found).`
}

phase('Compare')
const screens = (args && args.screens) || []
if (screens.length === 0) {
  log('No screens provided in args.screens — nothing to compare. See .claude/skills/design-fidelity-check/SKILL.md for expected args shape.')
  return { findings: [], synthesis: null }
}

const findings = await pipeline(
  screens,
  (screen) => agent(buildComparePrompt(screen, args), {
    label: `compare:${screen.name}`,
    phase: 'Compare',
    schema: GAP_SCHEMA,
  })
)

const clean = findings.filter(Boolean)
log(`${clean.length}/${screens.length} screen comparisons completed`)

phase('Synthesize')
const synthesisPrompt = `You are synthesizing ${clean.length} independent screen-comparison reports (Claude Design source vs. local implementation) into one consolidated gap analysis. Do not invent data beyond what is in the findings below.

FINDINGS (JSON):
${JSON.stringify(clean, null, 2)}

${args.synthesisNote || ''}

Write a consolidated report covering:
1. A one-paragraph overall verdict.
2. A per-screen severity table.
3. Any cross-cutting or architecture-level pattern visible across multiple screens (not just per-screen issues) — e.g. a shared root cause, a shared missing dependency, a shared component that all screens sit on top of.
4. A suggested remediation sequencing — which screens/fixes to tackle in what order, and why (e.g. shared-foundation-first, quick-wins-first, or severity-first), flagging any real tradeoff rather than presuming one answer.

Return the report as markdown text.`

const synthesis = await agent(synthesisPrompt, { phase: 'Synthesize', label: 'synthesize-report' })

return { findings: clean, synthesis }
