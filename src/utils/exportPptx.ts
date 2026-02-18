import {
  slides,
  heroStats,
  bleedScenarios,
  productPillars,
  pipelineNodes,
  autopsySteps,
  autopsySummary,
  autopsyTitle,
  autopsyContext,
  personas,
  tractionMetrics,
  businessTiers,
  businessModel,
  moatItems,
} from '../data/pitchDeckData';

const BG = '#020405';
const GREEN = '#0ECB81';
const RED = 'FF4D4D';
const DARK_CARD = '#0A0F0D';
const WHITE = '#E5E7EB';
const GRAY = '#9CA3AF';
const FONT_BODY = 'Segoe UI';
const FONT_MONO = 'Consolas';

export async function exportPptx() {
  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'CryptoPrism';
  pptx.title = 'CryptoPrism - AI Quant Platform for Crypto';

  const addAccentLine = (slide: ReturnType<typeof pptx.addSlide>) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.04,
      fill: { color: GREEN },
    });
  };

  // ── Slide 1: Hero ──────────────────────────────────────────────
  const s1 = pptx.addSlide();
  s1.background = { color: BG };
  addAccentLine(s1);
  s1.addText('CryptoPrism', {
    x: 1, y: 1, w: 11, h: 0.6,
    fontSize: 14, fontFace: FONT_MONO, color: GREEN,
  });
  s1.addText('Ask markets questions.\nGet quant-grade answers.', {
    x: 1, y: 2, w: 11, h: 2,
    fontSize: 36, fontFace: FONT_BODY, color: WHITE, bold: true, lineSpacingMultiple: 1.2,
  });
  s1.addText('The AI quant copilot for crypto. Natural language terminal, strategy library,\ndynamic watchlists, and news intelligence — powered by a real-time data pipeline.', {
    x: 1, y: 4.2, w: 9, h: 1,
    fontSize: 14, fontFace: FONT_BODY, color: GRAY,
  });
  heroStats.forEach((s, i) => {
    const x = 1 + i * 3.5;
    s1.addText(s.value, { x, y: 5.5, w: 3, h: 0.7, fontSize: 28, fontFace: FONT_MONO, color: GREEN, bold: true });
    s1.addText(s.label, { x, y: 6.2, w: 3, h: 0.5, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  });

  // ── Slide 2: Problem ───────────────────────────────────────────
  const s2 = pptx.addSlide();
  s2.background = { color: BG };
  addAccentLine(s2);
  s2.addText(slides[1].headline, {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  bleedScenarios.forEach((sc, i) => {
    const x = 0.6 + i * 4.2;
    s2.addShape(pptx.ShapeType.roundRect, {
      x, y: 2, w: 3.8, h: 4.5, fill: { color: DARK_CARD }, line: { color: RED, width: 1 }, rectRadius: 0.15,
    });
    s2.addText(sc.label.toUpperCase(), {
      x: x + 0.3, y: 2.3, w: 3.2, h: 0.5, fontSize: 11, fontFace: FONT_MONO, color: RED, bold: true,
    });
    s2.addText(sc.stat, {
      x: x + 0.3, y: 3, w: 3.2, h: 0.7, fontSize: 22, fontFace: FONT_MONO, color: RED, bold: true,
    });
    s2.addText(sc.description, {
      x: x + 0.3, y: 3.9, w: 3.2, h: 2, fontSize: 10, fontFace: FONT_BODY, color: GRAY,
    });
  });

  // ── Slide 3: Product — 4 Intelligence Layers ───────────────────
  const s3 = pptx.addSlide();
  s3.background = { color: BG };
  addAccentLine(s3);
  s3.addText('One platform. Four intelligence layers.', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  productPillars.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6;
    const y = 2 + row * 2.5;
    s3.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 5.5, h: 2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    s3.addText(p.title, {
      x: x + 0.4, y: y + 0.3, w: 4.7, h: 0.5, fontSize: 13, fontFace: FONT_MONO, color: GREEN, bold: true,
    });
    s3.addText(p.tagline, {
      x: x + 0.4, y: y + 0.9, w: 4.7, h: 0.8, fontSize: 10, fontFace: FONT_BODY, color: GRAY,
    });
  });

  // ── Slide 4: Engine / Pipeline ─────────────────────────────────
  const s4 = pptx.addSlide();
  s4.background = { color: BG };
  addAccentLine(s4);
  s4.addText('What powers the answers', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  pipelineNodes.forEach((node, i) => {
    const x = 0.3 + i * 2.55;
    s4.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.2, w: 2.3, h: 3.2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    s4.addText(node.label, {
      x, y: 2.5, w: 2.3, h: 0.5, fontSize: 12, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center',
    });
    s4.addText(node.description, {
      x: x + 0.1, y: 3.1, w: 2.1, h: 1.5, fontSize: 8, fontFace: FONT_BODY, color: GRAY, align: 'center',
    });
    if (node.stat) {
      s4.addText(node.stat, {
        x: x + 0.1, y: 4.6, w: 2.1, h: 0.4, fontSize: 9, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center',
      });
    }
    if (i < pipelineNodes.length - 1) {
      s4.addText('>>', { x: x + 2.3, y: 3.2, w: 0.25, h: 0.5, fontSize: 14, fontFace: FONT_MONO, color: GREEN, align: 'center' });
    }
  });
  const pipeStats = ['99.9% uptime', '8.5s news pipeline', '24/7 scoring'];
  pipeStats.forEach((s, i) => {
    s4.addText(s, { x: 1 + i * 4, y: 6, w: 3.5, h: 0.5, fontSize: 12, fontFace: FONT_MONO, color: GREEN, align: 'center' });
  });

  // ── Slide 5: Trade Autopsy ─────────────────────────────────────
  const s5 = pptx.addSlide();
  s5.background = { color: BG };
  addAccentLine(s5);
  s5.addText('One crash. Two outcomes.', {
    x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  s5.addText(autopsyTitle, {
    x: 1, y: 1.1, w: 5, h: 0.4, fontSize: 12, fontFace: FONT_MONO, color: GREEN,
  });
  s5.addText(autopsyContext, {
    x: 1, y: 1.5, w: 11, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY,
  });
  s5.addText('TIME', { x: 0.3, y: 2.2, w: 1.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s5.addText('TRADER', { x: 1.6, y: 2.2, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: RED });
  s5.addText('CRYPTOPRISM', { x: 7.2, y: 2.2, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GREEN });
  autopsySteps.forEach((step, i) => {
    const y = 2.7 + i * 1.05;
    s5.addText(step.time.split(', ')[1] || step.time, {
      x: 0.3, y, w: 1.2, h: 0.9, fontSize: 8, fontFace: FONT_MONO, color: GRAY,
    });
    s5.addShape(pptx.ShapeType.roundRect, {
      x: 1.6, y, w: 5.4, h: 0.9,
      fill: { color: DARK_CARD }, line: { color: step.traderOutcome === 'loss' ? RED : '333333', width: 0.5 }, rectRadius: 0.08,
    });
    s5.addText(step.trader, {
      x: 1.8, y, w: 5, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: step.traderOutcome === 'loss' ? RED : GRAY,
    });
    s5.addShape(pptx.ShapeType.roundRect, {
      x: 7.2, y, w: 5.4, h: 0.9,
      fill: { color: DARK_CARD }, line: { color: step.systemOutcome === 'win' ? GREEN : '333333', width: 0.5 }, rectRadius: 0.08,
    });
    s5.addText(step.system, {
      x: 7.4, y, w: 5, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: step.systemOutcome === 'win' ? GREEN : GRAY,
    });
  });
  s5.addText('RESULT', { x: 0.3, y: 6.9, w: 1.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s5.addText(autopsySummary.traderResult, { x: 1.8, y: 6.9, w: 5, h: 0.4, fontSize: 16, fontFace: FONT_MONO, color: RED, bold: true });
  s5.addText(autopsySummary.systemResult, { x: 7.4, y: 6.9, w: 5, h: 0.4, fontSize: 16, fontFace: FONT_MONO, color: GREEN, bold: true });

  // ── Slide 6: Personas ──────────────────────────────────────────
  const s6 = pptx.addSlide();
  s6.background = { color: BG };
  addAccentLine(s6);
  s6.addText('Built for three types of users', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  personas.forEach((p, i) => {
    const x = 0.6 + i * 4.2;
    s6.addShape(pptx.ShapeType.roundRect, {
      x, y: 2, w: 3.8, h: 5, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    s6.addText(p.role, {
      x: x + 0.3, y: 2.3, w: 3.2, h: 0.6, fontSize: 16, fontFace: FONT_MONO, color: GREEN, bold: true,
    });
    s6.addText(p.description, {
      x: x + 0.3, y: 3, w: 3.2, h: 0.8, fontSize: 10, fontFace: FONT_BODY, color: GRAY,
    });
    p.tools.forEach((tool, j) => {
      s6.addText('> ' + tool, {
        x: x + 0.3, y: 4 + j * 0.55, w: 3.2, h: 0.45, fontSize: 9, fontFace: FONT_MONO, color: WHITE,
      });
    });
  });

  // ── Slide 7: Traction ──────────────────────────────────────────
  const s7 = pptx.addSlide();
  s7.background = { color: BG };
  addAccentLine(s7);
  s7.addText("What's already running", {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  tractionMetrics.forEach((m, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * 3.2;
    const y = 2 + row * 2.8;
    s7.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.9, h: 2.2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    const display = Number.isInteger(m.value) ? m.value.toLocaleString() : String(m.value);
    s7.addText(display + m.suffix, {
      x, y: y + 0.3, w: 2.9, h: 0.9, fontSize: 28, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center',
    });
    s7.addText(m.label, {
      x, y: y + 1.3, w: 2.9, h: 0.6, fontSize: 9, fontFace: FONT_BODY, color: GRAY, align: 'center',
    });
  });

  // ── Slide 8: Business Model ────────────────────────────────────
  const s8 = pptx.addSlide();
  s8.background = { color: BG };
  addAccentLine(s8);
  s8.addText('SaaS + DaaS. Two revenue engines.', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  // Dual model
  s8.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.7, w: 5.5, h: 1, fill: { color: DARK_CARD }, rectRadius: 0.1,
  });
  s8.addText(businessModel.saasLabel, { x: 1, y: 1.75, w: 3, h: 0.3, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true });
  s8.addText(businessModel.saasDesc, { x: 1, y: 2.1, w: 5, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  s8.addShape(pptx.ShapeType.roundRect, {
    x: 7, y: 1.7, w: 5.5, h: 1, fill: { color: DARK_CARD }, rectRadius: 0.1,
  });
  s8.addText(businessModel.daasLabel, { x: 7.2, y: 1.75, w: 3, h: 0.3, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true });
  s8.addText(businessModel.daasDesc, { x: 7.2, y: 2.1, w: 5, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  // Pricing tiers
  businessTiers.forEach((tier, i) => {
    const x = 0.8 + i * 4.2;
    s8.addShape(pptx.ShapeType.roundRect, {
      x, y: 3.2, w: 3.8, h: 3.5,
      fill: { color: DARK_CARD },
      line: { color: tier.highlighted ? GREEN : '333333', width: tier.highlighted ? 1.5 : 0.5 },
      rectRadius: 0.15,
    });
    s8.addText(tier.tier, { x: x + 0.3, y: 3.4, w: 3.2, h: 0.5, fontSize: 12, fontFace: FONT_MONO, color: WHITE, bold: true });
    s8.addText(tier.price, { x: x + 0.3, y: 3.9, w: 3.2, h: 0.7, fontSize: 24, fontFace: FONT_MONO, color: GREEN, bold: true });
    s8.addText(tier.audience, { x: x + 0.3, y: 4.7, w: 3.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GREEN });
    s8.addText(tier.features, { x: x + 0.3, y: 5.2, w: 3.2, h: 1.2, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  });

  // ── Slide 9: Moat ──────────────────────────────────────────────
  const s9 = pptx.addSlide();
  s9.background = { color: BG };
  addAccentLine(s9);
  s9.addText('Why this compounds', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  moatItems.forEach((item, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.2;
    const y = 2 + row * 2.5;
    s9.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 3.8, h: 2.2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.15,
    });
    s9.addText(item.title, {
      x: x + 0.3, y: y + 0.2, w: 3.2, h: 0.5, fontSize: 11, fontFace: FONT_MONO, color: GREEN, bold: true,
    });
    s9.addText(item.description, {
      x: x + 0.3, y: y + 0.8, w: 3.2, h: 1.2, fontSize: 8, fontFace: FONT_BODY, color: GRAY,
    });
  });

  // ── Slide 10: CTA ──────────────────────────────────────────────
  const s10 = pptx.addSlide();
  s10.background = { color: BG };
  addAccentLine(s10);
  s10.addText('CryptoPrism', {
    x: 1, y: 1.5, w: 11, h: 0.6, fontSize: 14, fontFace: FONT_MONO, color: GREEN, align: 'center',
  });
  s10.addText('See the next signal first.', {
    x: 1, y: 2.5, w: 11, h: 1.2, fontSize: 36, fontFace: FONT_BODY, color: WHITE, bold: true, align: 'center',
  });
  s10.addText('The platform is live. The pipeline is processing 24/7.\n1,000+ coins. 130+ indicators. 44 news sources.\nYour AI quant copilot is ready.', {
    x: 2, y: 4, w: 9, h: 1.2, fontSize: 14, fontFace: FONT_BODY, color: GRAY, align: 'center',
  });
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 4, y: 5.5, w: 5.33, h: 0.9, fill: { color: GREEN }, rectRadius: 0.15,
  });
  s10.addText('Apply for Early Access', {
    x: 4, y: 5.5, w: 5.33, h: 0.9, fontSize: 16, fontFace: FONT_BODY, color: BG, bold: true, align: 'center',
  });
  s10.addText('cryptoprism.io  /  @cryptoprism_io', {
    x: 1, y: 6.7, w: 11, h: 0.4, fontSize: 11, fontFace: FONT_BODY, color: GRAY, align: 'center',
  });

  await pptx.writeFile({ fileName: 'CryptoPrism-Deck.pptx' });
}
