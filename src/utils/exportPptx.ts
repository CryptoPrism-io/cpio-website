import {
  slides,
  bleedScenarios,
  autopsySteps,
  autopsySummary,
  autopsyTitle,
  autopsyContext,
  repetitionCases,
  pipelineNodes,
  edgeMetrics,
  beforeAfterCases,
  tractionMetrics,
  businessModel,
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
  pptx.title = 'CryptoPrism - Performance Multiplier for Crypto Traders';

  const addAccentLine = (slide: ReturnType<typeof pptx.addSlide>) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.04,
      fill: { color: GREEN },
    });
  };

  // ── Slide 1: Hero — Economic Pain ─────────────────────────────
  const s1 = pptx.addSlide();
  s1.background = { color: BG };
  addAccentLine(s1);
  s1.addText('CryptoPrism', {
    x: 1, y: 1, w: 11, h: 0.6,
    fontSize: 14, fontFace: FONT_MONO, color: GREEN,
  });
  s1.addText('Traders systematically lose money\nin predictable situations.', {
    x: 1, y: 2, w: 11, h: 2,
    fontSize: 36, fontFace: FONT_BODY, color: WHITE, bold: true, lineSpacingMultiple: 1.2,
  });
  s1.addText('Regime shifts. False breakouts. Late exits.\nThese aren\'t random - they\'re structural. We built a system that detects and corrects them.', {
    x: 1, y: 4.2, w: 9, h: 1,
    fontSize: 14, fontFace: FONT_BODY, color: GRAY,
  });
  // Stats row
  const stats = [
    { val: '73-81%', desc: 'of retail crypto investors\nlost money (BIS, 2022)', color: RED },
    { val: '1.5x', desc: 'more likely to sell winners\nthan losers (Odean, 1998)', color: RED },
    { val: '~70%', desc: 'of breakouts fail to\nsustain (Bulkowski)', color: RED },
  ];
  stats.forEach((s, i) => {
    const x = 1 + i * 3.5;
    s1.addText(s.val, { x, y: 5.5, w: 3, h: 0.7, fontSize: 28, fontFace: FONT_MONO, color: s.color, bold: true });
    s1.addText(s.desc, { x, y: 6.2, w: 3, h: 0.8, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  });

  // ── Slide 2: Where money disappears ───────────────────────────
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

  // ── Slide 3: Trade Autopsy ────────────────────────────────────
  const s3 = pptx.addSlide();
  s3.background = { color: BG };
  addAccentLine(s3);
  s3.addText('One trade. Two outcomes.', {
    x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  s3.addText(autopsyTitle, {
    x: 1, y: 1.1, w: 5, h: 0.4, fontSize: 12, fontFace: FONT_MONO, color: GREEN,
  });
  s3.addText(autopsyContext, {
    x: 1, y: 1.5, w: 11, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY,
  });
  // Headers
  s3.addText('TIME', { x: 0.3, y: 2.2, w: 1.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s3.addText('TRADER', { x: 1.6, y: 2.2, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: RED });
  s3.addText('CRYPTOPRISM', { x: 7.2, y: 2.2, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GREEN });
  autopsySteps.forEach((step, i) => {
    const y = 2.7 + i * 1.05;
    s3.addText(step.time.split(', ')[1] || step.time, {
      x: 0.3, y, w: 1.2, h: 0.9, fontSize: 8, fontFace: FONT_MONO, color: GRAY,
    });
    s3.addShape(pptx.ShapeType.roundRect, {
      x: 1.6, y, w: 5.4, h: 0.9,
      fill: { color: DARK_CARD }, line: { color: step.traderOutcome === 'loss' ? RED : '333333', width: 0.5 }, rectRadius: 0.08,
    });
    s3.addText(step.trader, {
      x: 1.8, y, w: 5, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: step.traderOutcome === 'loss' ? RED : GRAY,
    });
    s3.addShape(pptx.ShapeType.roundRect, {
      x: 7.2, y, w: 5.4, h: 0.9,
      fill: { color: DARK_CARD }, line: { color: step.systemOutcome === 'win' ? GREEN : '333333', width: 0.5 }, rectRadius: 0.08,
    });
    s3.addText(step.system, {
      x: 7.4, y, w: 5, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: step.systemOutcome === 'win' ? GREEN : GRAY,
    });
  });
  // Result
  s3.addText('RESULT', { x: 0.3, y: 6.9, w: 1.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s3.addText(autopsySummary.traderResult, { x: 1.8, y: 6.9, w: 5, h: 0.4, fontSize: 16, fontFace: FONT_MONO, color: RED, bold: true });
  s3.addText(autopsySummary.systemResult, { x: 7.4, y: 6.9, w: 5, h: 0.4, fontSize: 16, fontFace: FONT_MONO, color: GREEN, bold: true });

  // ── Slide 4: Repetition ───────────────────────────────────────
  const s4 = pptx.addSlide();
  s4.background = { color: BG };
  addAccentLine(s4);
  s4.addText('Not one trade. Every regime shift.', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  // Table header
  const cols = [0.5, 2, 3.5, 7.5, 10.5];
  const colW = [1.4, 1.4, 3.8, 2.8, 2.2];
  const headers = ['ASSET', 'DATE', 'EVENT', 'PRICE ACTION', 'SOURCE'];
  headers.forEach((h, i) => {
    s4.addText(h, { x: cols[i], y: 1.8, w: colW[i], h: 0.5, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  });
  repetitionCases.forEach((c, i) => {
    const y = 2.4 + i * 0.75;
    s4.addShape(pptx.ShapeType.roundRect, {
      x: 0.4, y, w: 12.5, h: 0.65, fill: { color: DARK_CARD }, rectRadius: 0.06,
    });
    s4.addText(c.asset, { x: cols[0], y, w: colW[0], h: 0.65, fontSize: 10, fontFace: FONT_MONO, color: WHITE, bold: true });
    s4.addText(c.date, { x: cols[1], y, w: colW[1], h: 0.65, fontSize: 9, fontFace: FONT_MONO, color: GRAY });
    s4.addText(c.event, { x: cols[2], y, w: colW[2], h: 0.65, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
    s4.addText(c.priceAction, { x: cols[3], y, w: colW[3], h: 0.65, fontSize: 10, fontFace: FONT_MONO, color: RED, bold: true });
    s4.addText(c.source, { x: cols[4], y, w: colW[4], h: 0.65, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  });

  // ── Slide 5: Pipeline ─────────────────────────────────────────
  const s5 = pptx.addSlide();
  s5.background = { color: BG };
  addAccentLine(s5);
  s5.addText(slides[4].headline, {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  pipelineNodes.forEach((node, i) => {
    const x = 0.3 + i * 2.15;
    s5.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.2, w: 1.9, h: 2.8, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    s5.addText(node.label, {
      x, y: 2.5, w: 1.9, h: 0.5, fontSize: 12, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center',
    });
    s5.addText(node.description, {
      x: x + 0.1, y: 3.1, w: 1.7, h: 1.5, fontSize: 8, fontFace: FONT_BODY, color: GRAY, align: 'center',
    });
    if (i < pipelineNodes.length - 1) {
      s5.addText('>>', { x: x + 1.9, y: 3, w: 0.25, h: 0.5, fontSize: 14, fontFace: FONT_MONO, color: GREEN, align: 'center' });
    }
  });
  // Stats
  const pipeStats = ['<200ms latency', '200+ features/candle', '24/7 scoring'];
  pipeStats.forEach((s, i) => {
    s5.addText(s, { x: 1 + i * 4, y: 5.8, w: 3.5, h: 0.5, fontSize: 12, fontFace: FONT_MONO, color: GREEN, align: 'center' });
  });

  // ── Slide 6: Edge Metrics ─────────────────────────────────────
  const s6 = pptx.addSlide();
  s6.background = { color: BG };
  addAccentLine(s6);
  s6.addText('Measured edge', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  edgeMetrics.forEach((m, i) => {
    const x = 0.6 + i * 4.2;
    s6.addShape(pptx.ShapeType.roundRect, {
      x, y: 2, w: 3.8, h: 4.5, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    s6.addText(m.value, {
      x, y: 2.5, w: 3.8, h: 1.2, fontSize: 40, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center',
    });
    s6.addText(m.label, {
      x: x + 0.3, y: 3.7, w: 3.2, h: 0.6, fontSize: 13, fontFace: FONT_BODY, color: WHITE, align: 'center',
    });
    s6.addText(m.context, {
      x: x + 0.3, y: 4.4, w: 3.2, h: 1.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY, align: 'center',
    });
  });

  // ── Slide 7: Before/After ─────────────────────────────────────
  const s7 = pptx.addSlide();
  s7.background = { color: BG };
  addAccentLine(s7);
  s7.addText('What changes for the trader', {
    x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  beforeAfterCases.forEach((c, i) => {
    const y = 1.4 + i * 2;
    s7.addText(c.scenario, {
      x: 0.5, y, w: 12, h: 0.4, fontSize: 11, fontFace: FONT_MONO, color: WHITE, bold: true,
    });
    // Without
    s7.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y: y + 0.5, w: 6, h: 1.3, fill: { color: DARK_CARD }, line: { color: RED, width: 0.5 }, rectRadius: 0.08,
    });
    s7.addText('WITHOUT SYSTEM', { x: 0.7, y: y + 0.55, w: 3, h: 0.3, fontSize: 7, fontFace: FONT_MONO, color: RED });
    s7.addText(c.before, { x: 0.7, y: y + 0.85, w: 4.5, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
    s7.addText(c.beforeResult, { x: 5, y: y + 0.7, w: 1.3, h: 0.8, fontSize: 14, fontFace: FONT_MONO, color: RED, bold: true, align: 'right' });
    // With
    s7.addShape(pptx.ShapeType.roundRect, {
      x: 6.8, y: y + 0.5, w: 6, h: 1.3, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.08,
    });
    s7.addText('WITH CRYPTOPRISM', { x: 7, y: y + 0.55, w: 3, h: 0.3, fontSize: 7, fontFace: FONT_MONO, color: GREEN });
    s7.addText(c.after, { x: 7, y: y + 0.85, w: 4.5, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
    s7.addText(c.afterResult, { x: 11.3, y: y + 0.7, w: 1.3, h: 0.8, fontSize: 14, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'right' });
  });

  // ── Slide 8: Traction ─────────────────────────────────────────
  const s8 = pptx.addSlide();
  s8.background = { color: BG };
  addAccentLine(s8);
  s8.addText('Early traction', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  tractionMetrics.forEach((m, i) => {
    const x = 0.5 + i * 3.2;
    s8.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.5, w: 2.9, h: 3, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15,
    });
    s8.addText(m.value.toLocaleString(), {
      x, y: 2.8, w: 2.9, h: 1.3, fontSize: 32, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center',
    });
    s8.addText(m.label, {
      x, y: 4.2, w: 2.9, h: 0.8, fontSize: 10, fontFace: FONT_BODY, color: GRAY, align: 'center',
    });
  });

  // ── Slide 9: Business Model ───────────────────────────────────
  const s9 = pptx.addSlide();
  s9.background = { color: BG };
  addAccentLine(s9);
  s9.addText('Who pays. How much. How often.', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  // ICP
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 1, y: 1.7, w: 11.33, h: 1, fill: { color: DARK_CARD }, rectRadius: 0.1,
  });
  s9.addText('TARGET CUSTOMER', { x: 1.3, y: 1.75, w: 3, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GREEN });
  s9.addText(businessModel.icp, { x: 1.3, y: 2.1, w: 10, h: 0.5, fontSize: 12, fontFace: FONT_BODY, color: WHITE });
  // Pricing
  businessModel.pricing.forEach((tier, i) => {
    const x = 0.8 + i * 4.2;
    s9.addShape(pptx.ShapeType.roundRect, {
      x, y: 3.2, w: 3.8, h: 2.5,
      fill: { color: DARK_CARD },
      line: { color: tier.tier === 'Edge' ? GREEN : '333333', width: tier.tier === 'Edge' ? 1.5 : 0.5 },
      rectRadius: 0.15,
    });
    s9.addText(tier.tier, { x: x + 0.3, y: 3.4, w: 3.2, h: 0.5, fontSize: 12, fontFace: FONT_MONO, color: WHITE, bold: true });
    s9.addText(tier.price, { x: x + 0.3, y: 3.9, w: 3.2, h: 0.7, fontSize: 24, fontFace: FONT_MONO, color: GREEN, bold: true });
    s9.addText(tier.features, { x: x + 0.3, y: 4.7, w: 3.2, h: 0.8, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  });
  // Usage + TAM
  s9.addText(businessModel.frequency, { x: 1, y: 6, w: 7, h: 0.5, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  s9.addText('TAM: ' + businessModel.tam, { x: 8, y: 6, w: 4.5, h: 0.5, fontSize: 11, fontFace: FONT_MONO, color: GREEN, bold: true });

  // ── Slide 10: CTA ─────────────────────────────────────────────
  const s10 = pptx.addSlide();
  s10.background = { color: BG };
  addAccentLine(s10);
  s10.addText('CryptoPrism', {
    x: 1, y: 1.5, w: 11, h: 0.6, fontSize: 14, fontFace: FONT_MONO, color: GREEN, align: 'center',
  });
  s10.addText('See the next regime shift first.', {
    x: 1, y: 2.5, w: 11, h: 1.2, fontSize: 36, fontFace: FONT_BODY, color: WHITE, bold: true, align: 'center',
  });
  s10.addText('The system is live. The pipeline is processing.\nEarly access is limited to traders who want measurable edge, not more dashboards.', {
    x: 2, y: 4, w: 9, h: 1, fontSize: 14, fontFace: FONT_BODY, color: GRAY, align: 'center',
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
