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

// ── V2: 14-slide Story Deck Export ───────────────────────────────────────
export async function exportPptxV2() {
  const {
    indiaStats,
    targetMarkets,
    competitors,
    moatItemsV2,
  } = await import('../data/pitchDeckVariants');
  const {
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
  } = await import('../data/pitchDeckData');

  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'CryptoPrism';
  pptx.title = 'CryptoPrism - AI Quant Platform for Crypto (Story Deck)';

  const addAccentLine = (slide: ReturnType<typeof pptx.addSlide>) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.04, fill: { color: GREEN },
    });
  };

  // ── S1: Title / Cover ────────────────────────────────────────────
  const s0 = pptx.addSlide();
  s0.background = { color: BG };
  addAccentLine(s0);
  s0.addText('CryptoPrism', {
    x: 1, y: 1.5, w: 11, h: 1.5, fontSize: 54, fontFace: FONT_BODY, color: WHITE, bold: true, align: 'center',
  });
  s0.addText('AI Quant Platform for Crypto', {
    x: 1, y: 3.2, w: 11, h: 0.6, fontSize: 16, fontFace: FONT_MONO, color: GREEN, align: 'center',
  });
  s0.addText('cryptoprism.io', {
    x: 1, y: 4.2, w: 11, h: 0.4, fontSize: 12, fontFace: FONT_MONO, color: GREEN, align: 'center',
  });
  s0.addText('A product by Trinetri Infotech Private Limited  |  Established November 2025', {
    x: 1, y: 4.7, w: 11, h: 0.4, fontSize: 9, fontFace: FONT_BODY, color: GRAY, align: 'center',
  });
  // Team
  s0.addText('Yogesh Sahu', { x: 2, y: 5.6, w: 4, h: 0.4, fontSize: 14, fontFace: FONT_BODY, color: WHITE, bold: true, align: 'center' });
  s0.addText('MSc FinTech, SBS UK', { x: 2, y: 6, w: 4, h: 0.3, fontSize: 9, fontFace: FONT_MONO, color: GRAY, align: 'center' });
  s0.addText('FOUNDER & DIRECTOR', { x: 2, y: 6.3, w: 4, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GREEN, align: 'center' });
  s0.addText('Umesh Sahu', { x: 7, y: 5.6, w: 4, h: 0.4, fontSize: 14, fontFace: FONT_BODY, color: WHITE, bold: true, align: 'center' });
  s0.addText('MBA Marketing', { x: 7, y: 6, w: 4, h: 0.3, fontSize: 9, fontFace: FONT_MONO, color: GRAY, align: 'center' });
  s0.addText('NON-EXECUTIVE DIRECTOR', { x: 7, y: 6.3, w: 4, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GREEN, align: 'center' });

  // ── S2: Hero — 119M Hook ─────────────────────────────────────────
  const s1 = pptx.addSlide();
  s1.background = { color: BG };
  addAccentLine(s1);
  s1.addText('CryptoPrism', {
    x: 1, y: 1, w: 11, h: 0.6, fontSize: 14, fontFace: FONT_MONO, color: GREEN,
  });
  s1.addText('119M of 580M global crypto traders\nare in India. Zero quant-grade tools.', {
    x: 1, y: 2, w: 11, h: 2, fontSize: 36, fontFace: FONT_BODY, color: WHITE, bold: true, lineSpacingMultiple: 1.2,
  });
  s1.addText('The world\'s #1 crypto market by adoption — for the third year running.\nYet its traders make decisions from Telegram groups and YouTube videos.\nCryptoPrism gives them institutional-grade intelligence through plain English.', {
    x: 1, y: 4.2, w: 9, h: 1.2, fontSize: 14, fontFace: FONT_BODY, color: GRAY,
  });
  const heroV2Stats = [
    { value: '119M', label: 'crypto users in India' },
    { value: '#1', label: 'Chainalysis adoption, 3yr' },
    { value: '49%', label: 'ended FY25 with losses' },
  ];
  heroV2Stats.forEach((s, i) => {
    const x = 1 + i * 3.5;
    s1.addText(s.value, { x, y: 5.5, w: 3, h: 0.7, fontSize: 28, fontFace: FONT_MONO, color: s.value === '49%' ? RED : GREEN, bold: true });
    s1.addText(s.label, { x, y: 6.2, w: 3, h: 0.5, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  });

  // ── S2: Problem — Where the money disappears ─────────────────────
  const s2 = pptx.addSlide();
  s2.background = { color: BG };
  addAccentLine(s2);
  s2.addText('Where the money disappears', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  bleedScenarios.forEach((sc, i) => {
    const x = 0.6 + i * 4.2;
    s2.addShape(pptx.ShapeType.roundRect, { x, y: 2, w: 3.8, h: 4.5, fill: { color: DARK_CARD }, line: { color: RED, width: 1 }, rectRadius: 0.15 });
    s2.addText(sc.label.toUpperCase(), { x: x + 0.3, y: 2.3, w: 3.2, h: 0.5, fontSize: 11, fontFace: FONT_MONO, color: RED, bold: true });
    s2.addText(sc.stat, { x: x + 0.3, y: 3, w: 3.2, h: 0.7, fontSize: 22, fontFace: FONT_MONO, color: RED, bold: true });
    s2.addText(sc.description, { x: x + 0.3, y: 3.9, w: 3.2, h: 2, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  });

  // ── S3: India Amplifier — "In India, it's worse" ─────────────────
  const s3 = pptx.addSlide();
  s3.background = { color: BG };
  addAccentLine(s3);
  s3.addText("In India, it's worse", {
    x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  s3.addText('119 million traders. And almost half of them lost money last year.', {
    x: 1, y: 1.1, w: 11, h: 0.5, fontSize: 12, fontFace: FONT_BODY, color: GRAY,
  });
  const indiaStatsArr = [
    { value: indiaStats.users, label: 'Crypto users in India', sub: '#1 globally — more than US (65M)' },
    { value: indiaStats.losers + '%', label: 'Ended FY25 with net losses', sub: 'Indian Income Tax Dept data' },
    { value: indiaStats.socialReliance + '%', label: 'Trade on social media signals', sub: 'CoinGecko survey' },
    { value: indiaStats.scamLosses, label: 'Lost to GainBitcoin Ponzi alone', sub: 'CBI, Feb 2025' },
  ];
  indiaStatsArr.forEach((stat, i) => {
    const col = i % 4;
    const x = 0.5 + col * 3.2;
    s3.addShape(pptx.ShapeType.roundRect, { x, y: 2, w: 2.9, h: 2.5, fill: { color: DARK_CARD }, line: { color: i === 0 ? GREEN : RED, width: 1 }, rectRadius: 0.15 });
    s3.addText(stat.value, { x, y: 2.2, w: 2.9, h: 0.7, fontSize: 26, fontFace: FONT_MONO, color: i === 0 ? GREEN : RED, bold: true, align: 'center' });
    s3.addText(stat.label, { x, y: 3, w: 2.9, h: 0.6, fontSize: 9, fontFace: FONT_BODY, color: GRAY, align: 'center' });
    s3.addText(stat.sub, { x, y: 3.7, w: 2.9, h: 0.4, fontSize: 7, fontFace: FONT_MONO, color: '666666', align: 'center' });
  });
  // What they use vs need
  s3.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 5, w: 5.5, h: 2.2, fill: { color: DARK_CARD }, line: { color: RED, width: 0.5 }, rectRadius: 0.1 });
  s3.addText('WHAT INDIAN TRADERS USE TODAY', { x: 1, y: 5.1, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: RED, bold: true });
  s3.addText('✗ Telegram signal groups\n✗ YouTube influencer calls\n✗ WhatsApp rumors\n✗ Basic exchange charts', { x: 1, y: 5.5, w: 5, h: 1.6, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  s3.addShape(pptx.ShapeType.roundRect, { x: 7, y: 5, w: 5.5, h: 2.2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.1 });
  s3.addText('WHAT THEY ACTUALLY NEED', { x: 7.2, y: 5.1, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GREEN, bold: true });
  s3.addText('• Pipeline-verified intelligence\n• AI sentiment from verified sources\n• Natural language interface\n• Quant strategies — not guesswork', { x: 7.2, y: 5.5, w: 5, h: 1.6, fontSize: 9, fontFace: FONT_BODY, color: GRAY });

  // ── S4: Where Crypto Actually Lives ──────────────────────────────
  const s4 = pptx.addSlide();
  s4.background = { color: BG };
  addAccentLine(s4);
  s4.addText('Where crypto actually lives', {
    x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  // Left: where products built
  s4.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.5, h: 2.5, fill: { color: DARK_CARD }, line: { color: RED, width: 0.5 }, rectRadius: 0.1 });
  s4.addText('WHERE PRODUCTS ARE BUILT', { x: 1, y: 1.6, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: RED, bold: true });
  s4.addText('San Francisco, London, Singapore\n\nGlassnode, Nansen, Messari, Dune — all built for Western quants', { x: 1, y: 2.1, w: 5, h: 1.5, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  // Right: where traders are
  s4.addShape(pptx.ShapeType.roundRect, { x: 7, y: 1.5, w: 5.5, h: 2.5, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.1 });
  s4.addText('WHERE TRADERS ACTUALLY ARE', { x: 7.2, y: 1.6, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GREEN, bold: true });
  targetMarkets.slice(0, 3).forEach((m, i) => {
    s4.addText(`${m.flag} ${m.country}`, { x: 7.2, y: 2.2 + i * 0.5, w: 3, h: 0.4, fontSize: 10, fontFace: FONT_BODY, color: WHITE });
    s4.addText(m.users, { x: 10.5, y: 2.2 + i * 0.5, w: 1.5, h: 0.4, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true });
  });
  // 5 market cards
  targetMarkets.forEach((m, i) => {
    const x = 0.3 + i * 2.55;
    s4.addShape(pptx.ShapeType.roundRect, { x, y: 4.5, w: 2.3, h: 2.5, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.1 });
    s4.addText(m.flag, { x, y: 4.6, w: 2.3, h: 0.5, fontSize: 18, align: 'center' });
    s4.addText(m.country, { x, y: 5.1, w: 2.3, h: 0.3, fontSize: 9, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center' });
    s4.addText(m.users, { x, y: 5.5, w: 2.3, h: 0.4, fontSize: 14, fontFace: FONT_MONO, color: WHITE, bold: true, align: 'center' });
    s4.addText(m.rank, { x, y: 6, w: 2.3, h: 0.3, fontSize: 7, fontFace: FONT_BODY, color: GRAY, align: 'center' });
  });

  // ── S5: Competitors ──────────────────────────────────────────────
  const s5 = pptx.addSlide();
  s5.background = { color: BG };
  addAccentLine(s5);
  s5.addText("Why existing tools don't solve this", {
    x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  // Table header
  const cols = [0.3, 2.0, 3.5, 5.0, 6.5, 7.5, 8.5, 9.5];
  const headers = ['PLATFORM', 'HQ', 'PRICE', 'NL/AI', 'NEWS', 'STRAT', 'TA', 'KEY LIMITATION'];
  headers.forEach((h, i) => {
    s5.addText(h, { x: cols[i], y: 1.3, w: i < 3 ? 1.5 : i === 7 ? 3.5 : 0.9, h: 0.4, fontSize: 7, fontFace: FONT_MONO, color: GRAY });
  });
  const check = '✓';
  const cross = '✗';
  competitors.forEach((c, i) => {
    const y = 1.8 + i * 0.7;
    s5.addShape(pptx.ShapeType.roundRect, { x: 0.2, y, w: 12.9, h: 0.6, fill: { color: DARK_CARD }, rectRadius: 0.08 });
    s5.addText(c.name, { x: 0.3, y, w: 1.5, h: 0.6, fontSize: 9, fontFace: FONT_MONO, color: WHITE, bold: true });
    s5.addText(c.hq, { x: 2.0, y, w: 1.5, h: 0.6, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
    s5.addText(c.pricing, { x: 3.5, y, w: 1.5, h: 0.6, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
    s5.addText(c.hasNL ? check : cross, { x: 6.5, y, w: 0.9, h: 0.6, fontSize: 12, fontFace: FONT_BODY, color: c.hasNL ? GREEN : RED, align: 'center' });
    s5.addText(c.hasNewsSentiment ? check : cross, { x: 7.5, y, w: 0.9, h: 0.6, fontSize: 12, fontFace: FONT_BODY, color: c.hasNewsSentiment ? GREEN : RED, align: 'center' });
    s5.addText(c.hasStrategyLib ? check : cross, { x: 8.5, y, w: 0.9, h: 0.6, fontSize: 12, fontFace: FONT_BODY, color: c.hasStrategyLib ? GREEN : RED, align: 'center' });
    s5.addText(c.hasIndicators ? check : cross, { x: 9.5, y, w: 0.9, h: 0.6, fontSize: 12, fontFace: FONT_BODY, color: c.hasIndicators ? GREEN : RED, align: 'center' });
    s5.addText(c.limitation, { x: 10.5, y, w: 2.5, h: 0.6, fontSize: 7, fontFace: FONT_BODY, color: GRAY });
  });
  // CryptoPrism row
  const cpY = 1.8 + competitors.length * 0.7;
  s5.addShape(pptx.ShapeType.roundRect, { x: 0.2, y: cpY, w: 12.9, h: 0.6, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.08 });
  s5.addText('CryptoPrism', { x: 0.3, y: cpY, w: 1.5, h: 0.6, fontSize: 9, fontFace: FONT_MONO, color: GREEN, bold: true });
  s5.addText('India', { x: 2.0, y: cpY, w: 1.5, h: 0.6, fontSize: 8, fontFace: FONT_BODY, color: GREEN });
  s5.addText('$49-149/mo', { x: 3.5, y: cpY, w: 1.5, h: 0.6, fontSize: 8, fontFace: FONT_MONO, color: GREEN });
  [6.5, 7.5, 8.5, 9.5].forEach((x) => {
    s5.addText(check, { x, y: cpY, w: 0.9, h: 0.6, fontSize: 12, fontFace: FONT_BODY, color: GREEN, align: 'center' });
  });
  s5.addText('All four. One platform. 130+ indicators.', { x: 10.5, y: cpY, w: 2.5, h: 0.6, fontSize: 7, fontFace: FONT_BODY, color: GREEN, bold: true });
  // Punchline
  s5.addShape(pptx.ShapeType.roundRect, { x: 2, y: 6, w: 9, h: 1, fill: { color: DARK_CARD }, rectRadius: 0.1 });
  s5.addText('No platform combines all four pillars.\nNL interface + news sentiment + strategy library + 130+ technical indicators.\nAnd none of them target the 400M+ traders in the world\'s fastest-growing markets.', {
    x: 2.3, y: 6.1, w: 8.4, h: 0.8, fontSize: 9, fontFace: FONT_BODY, color: GRAY, align: 'center',
  });

  // ── S6: Product — 4 Intelligence Layers ──────────────────────────
  const s6 = pptx.addSlide();
  s6.background = { color: BG };
  addAccentLine(s6);
  s6.addText('One platform. Four intelligence layers.', {
    x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  productPillars.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6;
    const y = 2 + row * 2.5;
    s6.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.5, h: 2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15 });
    s6.addText(p.title, { x: x + 0.4, y: y + 0.3, w: 4.7, h: 0.5, fontSize: 13, fontFace: FONT_MONO, color: GREEN, bold: true });
    s6.addText(p.tagline, { x: x + 0.4, y: y + 0.9, w: 4.7, h: 0.8, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
  });

  // ── S7: Engine — Multi-source Architecture ──────────────────────
  const s7 = pptx.addSlide();
  s7.background = { color: BG };
  addAccentLine(s7);
  s7.addText('What powers the answers', {
    x: 1, y: 0.3, w: 11, h: 0.7, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true,
  });
  s7.addText('Not just price data. Six distinct data streams feed into a multi-stage processing engine.', {
    x: 1, y: 1, w: 11, h: 0.4, fontSize: 10, fontFace: FONT_BODY, color: GRAY,
  });
  // Data sources — 3x2 grid
  s7.addText('DATA SOURCES', { x: 0.3, y: 1.5, w: 3, h: 0.3, fontSize: 7, fontFace: FONT_MONO, color: '666666' });
  const sources = [
    { label: 'OHLCV', desc: 'Price & volume across 1,000+ coins', stat: '108K+/run' },
    { label: 'On-Chain', desc: 'Wallet flows, whale moves, exchange flows', stat: 'Real-time' },
    { label: 'News & Sentiment', desc: '44 sources, AI-scored, 182+ topics', stat: '500+/hr' },
    { label: 'Security Scores', desc: 'Audits, rug-pull risk, code quality', stat: 'Per-token' },
    { label: 'Token Metadata', desc: 'Market cap, supply, listings, social', stat: '1,000+ tokens' },
    { label: 'Whitepapers', desc: 'Tokenomics, roadmaps, claim verification', stat: 'AI-parsed' },
  ];
  sources.forEach((src, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.3 + col * 4.3;
    const y = 1.9 + row * 1.3;
    s7.addShape(pptx.ShapeType.roundRect, { x, y, w: 4, h: 1.1, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.08 });
    s7.addText(src.label, { x: x + 0.2, y: y + 0.05, w: 2.5, h: 0.35, fontSize: 9, fontFace: FONT_MONO, color: GREEN, bold: true });
    s7.addText(src.stat, { x: x + 2.5, y: y + 0.05, w: 1.3, h: 0.35, fontSize: 7, fontFace: FONT_MONO, color: GREEN, align: 'right' });
    s7.addText(src.desc, { x: x + 0.2, y: y + 0.45, w: 3.6, h: 0.5, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  });
  // Arrow
  s7.addText('▼', { x: 6, y: 4.5, w: 1.33, h: 0.3, fontSize: 12, fontFace: FONT_BODY, color: GREEN, align: 'center' });
  // Processing pipeline
  s7.addText('PROCESSING ENGINE', { x: 0.3, y: 4.9, w: 4, h: 0.3, fontSize: 7, fontFace: FONT_MONO, color: '666666' });
  const layers = [
    { label: 'Compute', desc: '130+ indicators, 7 categories' },
    { label: 'Score', desc: 'DMV framework' },
    { label: 'Classify', desc: 'Regime detection & risk' },
    { label: 'Deliver', desc: 'REST API, <200ms' },
  ];
  layers.forEach((l, i) => {
    const x = 0.3 + i * 3.2;
    s7.addShape(pptx.ShapeType.roundRect, { x, y: 5.3, w: 2.9, h: 0.9, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.1 });
    s7.addText(l.label, { x, y: 5.35, w: 2.9, h: 0.4, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center' });
    s7.addText(l.desc, { x, y: 5.7, w: 2.9, h: 0.4, fontSize: 7, fontFace: FONT_BODY, color: GRAY, align: 'center' });
    if (i < layers.length - 1) {
      s7.addText('>>', { x: x + 2.9, y: 5.4, w: 0.3, h: 0.4, fontSize: 10, fontFace: FONT_MONO, color: GREEN, align: 'center' });
    }
  });
  // Stats
  ['99.9% uptime', '17 repos', '3 databases', '8.5s news', '24/7'].forEach((s, i) => {
    s7.addText(s, { x: 0.3 + i * 2.6, y: 6.6, w: 2.4, h: 0.4, fontSize: 9, fontFace: FONT_MONO, color: GREEN, align: 'center' });
  });

  // ── S8: Trade Autopsy ────────────────────────────────────────────
  const s8 = pptx.addSlide();
  s8.background = { color: BG };
  addAccentLine(s8);
  s8.addText('One crash. Two outcomes.', { x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true });
  s8.addText(autopsyTitle, { x: 1, y: 1.1, w: 5, h: 0.4, fontSize: 12, fontFace: FONT_MONO, color: GREEN });
  s8.addText(autopsyContext, { x: 1, y: 1.5, w: 11, h: 0.5, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  s8.addText('TIME', { x: 0.3, y: 2.2, w: 1.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s8.addText('TRADER', { x: 1.6, y: 2.2, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: RED });
  s8.addText('CRYPTOPRISM', { x: 7.2, y: 2.2, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GREEN });
  autopsySteps.forEach((step, i) => {
    const y = 2.7 + i * 1.05;
    s8.addText(step.time.split(', ')[1] || step.time, { x: 0.3, y, w: 1.2, h: 0.9, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
    s8.addShape(pptx.ShapeType.roundRect, { x: 1.6, y, w: 5.4, h: 0.9, fill: { color: DARK_CARD }, line: { color: step.traderOutcome === 'loss' ? RED : '333333', width: 0.5 }, rectRadius: 0.08 });
    s8.addText(step.trader, { x: 1.8, y, w: 5, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: step.traderOutcome === 'loss' ? RED : GRAY });
    s8.addShape(pptx.ShapeType.roundRect, { x: 7.2, y, w: 5.4, h: 0.9, fill: { color: DARK_CARD }, line: { color: step.systemOutcome === 'win' ? GREEN : '333333', width: 0.5 }, rectRadius: 0.08 });
    s8.addText(step.system, { x: 7.4, y, w: 5, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: step.systemOutcome === 'win' ? GREEN : GRAY });
  });
  s8.addText('RESULT', { x: 0.3, y: 6.9, w: 1.2, h: 0.4, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s8.addText(autopsySummary.traderResult, { x: 1.8, y: 6.9, w: 5, h: 0.4, fontSize: 16, fontFace: FONT_MONO, color: RED, bold: true });
  s8.addText(autopsySummary.systemResult, { x: 7.4, y: 6.9, w: 5, h: 0.4, fontSize: 16, fontFace: FONT_MONO, color: GREEN, bold: true });

  // ── S9: Five Markets, One Problem ────────────────────────────────
  const s9 = pptx.addSlide();
  s9.background = { color: BG };
  addAccentLine(s9);
  s9.addText('Five markets. One problem.', { x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true });
  s9.addText('Massive adoption, zero professional tooling.', { x: 1, y: 1.1, w: 11, h: 0.4, fontSize: 12, fontFace: FONT_BODY, color: GRAY });
  // Header
  s9.addText('MARKET', { x: 1, y: 1.8, w: 2, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s9.addText('USERS', { x: 3.2, y: 1.8, w: 1.5, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s9.addText('RANK', { x: 4.8, y: 1.8, w: 1.5, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  s9.addText('KEY PROBLEM', { x: 6.5, y: 1.8, w: 6, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GRAY });
  targetMarkets.forEach((m, i) => {
    const y = 2.3 + i * 1;
    s9.addShape(pptx.ShapeType.roundRect, { x: 0.5, y, w: 12.3, h: 0.8, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.08 });
    s9.addText(`${m.flag} ${m.country}`, { x: 0.7, y, w: 2.3, h: 0.8, fontSize: 10, fontFace: FONT_MONO, color: WHITE, bold: true });
    s9.addText(m.users, { x: 3.2, y, w: 1.5, h: 0.8, fontSize: 11, fontFace: FONT_MONO, color: GREEN, bold: true });
    s9.addText(m.rank, { x: 4.8, y, w: 1.5, h: 0.8, fontSize: 9, fontFace: FONT_MONO, color: GRAY });
    s9.addText(m.problem, { x: 6.5, y, w: 6, h: 0.8, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  });
  s9.addText('400M+ traders across five markets. Same pipeline serves all of them.', {
    x: 2, y: 7, w: 9, h: 0.4, fontSize: 12, fontFace: FONT_MONO, color: GREEN, align: 'center', bold: true,
  });

  // ── S10: Personas ────────────────────────────────────────────────
  const s10 = pptx.addSlide();
  s10.background = { color: BG };
  addAccentLine(s10);
  s10.addText('Built for three types of users', { x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true });
  personas.forEach((p, i) => {
    const x = 0.6 + i * 4.2;
    s10.addShape(pptx.ShapeType.roundRect, { x, y: 2, w: 3.8, h: 5, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15 });
    s10.addText(p.role, { x: x + 0.3, y: 2.3, w: 3.2, h: 0.6, fontSize: 16, fontFace: FONT_MONO, color: GREEN, bold: true });
    s10.addText(p.description, { x: x + 0.3, y: 3, w: 3.2, h: 0.8, fontSize: 10, fontFace: FONT_BODY, color: GRAY });
    p.tools.forEach((tool, j) => {
      s10.addText('> ' + tool, { x: x + 0.3, y: 4 + j * 0.55, w: 3.2, h: 0.45, fontSize: 9, fontFace: FONT_MONO, color: WHITE });
    });
  });

  // ── S11: Traction ────────────────────────────────────────────────
  const s11 = pptx.addSlide();
  s11.background = { color: BG };
  addAccentLine(s11);
  s11.addText("What's already running", { x: 1, y: 0.5, w: 11, h: 1, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true });
  tractionMetrics.forEach((m, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * 3.2;
    const y = 2 + row * 2.8;
    s11.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.9, h: 2.2, fill: { color: DARK_CARD }, line: { color: GREEN, width: 1 }, rectRadius: 0.15 });
    const display = Number.isInteger(m.value) ? m.value.toLocaleString() : String(m.value);
    s11.addText(display + m.suffix, { x, y: y + 0.3, w: 2.9, h: 0.9, fontSize: 28, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center' });
    s11.addText(m.label, { x, y: y + 1.3, w: 2.9, h: 0.6, fontSize: 9, fontFace: FONT_BODY, color: GRAY, align: 'center' });
  });

  // ── S12: Business Model — Dual Pricing ────────────────────────────
  const s12 = pptx.addSlide();
  s12.background = { color: BG };
  addAccentLine(s12);
  s12.addText('SaaS + DaaS. Two revenue engines.', { x: 1, y: 0.3, w: 11, h: 0.7, fontSize: 28, fontFace: FONT_BODY, color: WHITE, bold: true });
  // Dual model labels
  s12.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.1, w: 5.5, h: 0.8, fill: { color: DARK_CARD }, rectRadius: 0.1 });
  s12.addText(businessModel.saasLabel, { x: 1, y: 1.15, w: 3, h: 0.3, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true });
  s12.addText(businessModel.saasDesc, { x: 1, y: 1.45, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  s12.addShape(pptx.ShapeType.roundRect, { x: 7, y: 1.1, w: 5.5, h: 0.8, fill: { color: DARK_CARD }, rectRadius: 0.1 });
  s12.addText(businessModel.daasLabel, { x: 7.2, y: 1.15, w: 3, h: 0.3, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true });
  s12.addText(businessModel.daasDesc, { x: 7.2, y: 1.45, w: 5, h: 0.4, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  // India pricing row
  s12.addText('🇮🇳 INDIA (INR)', { x: 0.8, y: 2.2, w: 4, h: 0.3, fontSize: 9, fontFace: FONT_MONO, color: GRAY });
  const { businessTiersIndia: indiaTiers } = await import('../data/pitchDeckData');
  indiaTiers.forEach((tier, i) => {
    const x = 0.8 + i * 4.2;
    s12.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.6, w: 3.8, h: 2, fill: { color: DARK_CARD },
      line: { color: tier.highlighted ? GREEN : '333333', width: tier.highlighted ? 1.5 : 0.5 }, rectRadius: 0.12,
    });
    s12.addText(tier.tier, { x: x + 0.3, y: 2.7, w: 2, h: 0.35, fontSize: 11, fontFace: FONT_MONO, color: WHITE, bold: true });
    s12.addText(tier.price, { x: x + 0.3, y: 3.05, w: 3.2, h: 0.5, fontSize: 20, fontFace: FONT_MONO, color: GREEN, bold: true });
    s12.addText(tier.features, { x: x + 0.3, y: 3.6, w: 3.2, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  });
  // Global pricing row
  s12.addText('🌍 US / EUROPE / MIDDLE EAST (USD)', { x: 0.8, y: 4.9, w: 6, h: 0.3, fontSize: 9, fontFace: FONT_MONO, color: GRAY });
  const { businessTiersGlobal: globalTiers } = await import('../data/pitchDeckData');
  globalTiers.forEach((tier, i) => {
    const x = 0.8 + i * 4.2;
    s12.addShape(pptx.ShapeType.roundRect, {
      x, y: 5.3, w: 3.8, h: 2, fill: { color: DARK_CARD },
      line: { color: tier.highlighted ? GREEN : '333333', width: tier.highlighted ? 1.5 : 0.5 }, rectRadius: 0.12,
    });
    s12.addText(tier.tier, { x: x + 0.3, y: 5.4, w: 2, h: 0.35, fontSize: 11, fontFace: FONT_MONO, color: WHITE, bold: true });
    s12.addText(tier.price, { x: x + 0.3, y: 5.75, w: 3.2, h: 0.5, fontSize: 20, fontFace: FONT_MONO, color: GREEN, bold: true });
    s12.addText(tier.features, { x: x + 0.3, y: 6.3, w: 3.2, h: 0.9, fontSize: 8, fontFace: FONT_BODY, color: GRAY });
  });

  // ── S13: Enhanced Moat ───────────────────────────────────────────
  const s13 = pptx.addSlide();
  s13.background = { color: BG };
  addAccentLine(s13);
  s13.addText('Why this compounds', { x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true });
  s13.addText('Every day the pipeline runs, the moat deepens. First mover in the world\'s #1 crypto market.', {
    x: 1, y: 1.1, w: 11, h: 0.4, fontSize: 11, fontFace: FONT_BODY, color: GRAY,
  });
  moatItemsV2.forEach((item, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.3 + col * 3.2;
    const y = 2 + row * 2.8;
    s13.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.9, h: 2.4, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.15 });
    s13.addText(item.title, { x: x + 0.2, y: y + 0.2, w: 2.5, h: 0.5, fontSize: 10, fontFace: FONT_MONO, color: GREEN, bold: true });
    s13.addText(item.description, { x: x + 0.2, y: y + 0.8, w: 2.5, h: 1.4, fontSize: 7, fontFace: FONT_BODY, color: GRAY });
  });

  // ── S14: What We Are Not ──────────────────────────────────────────
  const s14 = pptx.addSlide();
  s14.background = { color: BG };
  addAccentLine(s14);
  s14.addText('What we are not', { x: 1, y: 0.3, w: 11, h: 0.8, fontSize: 32, fontFace: FONT_BODY, color: WHITE, bold: true });
  s14.addText('CryptoPrism is a strategy platform — we give users the tools to build, customize, backtest, and deploy strategies on their own trading platform. We are never into holding anybody\'s tokens.', {
    x: 1, y: 1.1, w: 11, h: 0.5, fontSize: 11, fontFace: FONT_BODY, color: GRAY,
  });
  // Not cards
  const notItems = [
    { title: 'NOT A CUSTODIAN', desc: 'We never hold, store, or touch user tokens. Your assets stay on your exchange, in your wallet — always.' },
    { title: 'NOT AN EXCHANGE', desc: "We don't match orders, facilitate trades, or act as a counterparty. We never sit between you and your money." },
  ];
  notItems.forEach((item, i) => {
    const x = 1.5 + i * 5.5;
    s14.addShape(pptx.ShapeType.roundRect, { x, y: 1.9, w: 4.8, h: 1.8, fill: { color: DARK_CARD }, line: { color: RED, width: 0.5 }, rectRadius: 0.15 });
    s14.addText(item.title, { x: x + 0.3, y: 2.1, w: 4.2, h: 0.4, fontSize: 10, fontFace: FONT_MONO, color: RED, bold: true });
    s14.addText(item.desc, { x: x + 0.3, y: 2.6, w: 4.2, h: 0.9, fontSize: 9, fontFace: FONT_BODY, color: GRAY });
  });
  // What users do — Build, Customize, Backtest, Deploy
  s14.addText('WHAT USERS DO ON CRYPTOPRISM', { x: 1, y: 4.1, w: 11, h: 0.3, fontSize: 8, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center' });
  const userActions = [
    { title: 'BUILD', desc: 'Create strategies from 130+ indicators, AI sentiment, and regime signals — or start from the strategy library.' },
    { title: 'CUSTOMIZE', desc: 'Tune thresholds, combine indicators, set risk parameters — make any strategy yours.' },
    { title: 'BACKTEST', desc: 'Run strategies against historical data across 1,000+ coins. See exactly how they would have performed.' },
    { title: 'DEPLOY', desc: 'Push strategies to your own trading platform — Binance, OKX, Bybit, or any exchange you already use.' },
  ];
  userActions.forEach((item, i) => {
    const x = 0.3 + i * 3.2;
    s14.addShape(pptx.ShapeType.roundRect, { x, y: 4.6, w: 2.9, h: 2.4, fill: { color: DARK_CARD }, line: { color: GREEN, width: 0.5 }, rectRadius: 0.12 });
    s14.addText(item.title, { x, y: 4.8, w: 2.9, h: 0.4, fontSize: 11, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center' });
    s14.addText(item.desc, { x: x + 0.2, y: 5.3, w: 2.5, h: 1.5, fontSize: 8, fontFace: FONT_BODY, color: GRAY, align: 'center' });
  });
  s14.addText('Your exchange. Your wallet. Your keys. We just make you smarter.', {
    x: 1, y: 7.2, w: 11, h: 0.3, fontSize: 9, fontFace: FONT_MONO, color: '666666', align: 'center',
  });

  // ── S15: CTA ─────────────────────────────────────────────────────
  const s15 = pptx.addSlide();
  s15.background = { color: BG };
  addAccentLine(s15);
  s15.addText('CryptoPrism', { x: 1, y: 1.5, w: 11, h: 0.6, fontSize: 14, fontFace: FONT_MONO, color: GREEN, align: 'center' });
  s15.addText('See the next signal first.', { x: 1, y: 2.5, w: 11, h: 1.2, fontSize: 36, fontFace: FONT_BODY, color: WHITE, bold: true, align: 'center' });
  s15.addText('The platform is live. The pipeline processes 24/7.\n1,000+ coins. 130+ indicators. 44 news sources.\nBuilt from India. Built for every trader on Earth.', {
    x: 2, y: 4, w: 9, h: 1.2, fontSize: 14, fontFace: FONT_BODY, color: GRAY, align: 'center',
  });
  const ctaStats = [
    { value: '400M+', label: 'target traders' },
    { value: '5', label: 'markets' },
    { value: '0', label: 'competitors with all 4 pillars' },
  ];
  ctaStats.forEach((s, i) => {
    const x = 2 + i * 3.5;
    s15.addText(s.value, { x, y: 5.4, w: 3, h: 0.5, fontSize: 20, fontFace: FONT_MONO, color: GREEN, bold: true, align: 'center' });
    s15.addText(s.label, { x, y: 5.9, w: 3, h: 0.4, fontSize: 8, fontFace: FONT_BODY, color: GRAY, align: 'center' });
  });
  s15.addShape(pptx.ShapeType.roundRect, { x: 4, y: 6.5, w: 5.33, h: 0.7, fill: { color: GREEN }, rectRadius: 0.15 });
  s15.addText('Apply for Early Access', { x: 4, y: 6.5, w: 5.33, h: 0.7, fontSize: 14, fontFace: FONT_BODY, color: BG, bold: true, align: 'center' });

  await pptx.writeFile({ fileName: 'CryptoPrism-StoryDeck.pptx' });
}
