import { useCallback } from 'react';

/* ── Color palette ──────────────────────────────────────────────── */
const COLORS_PRIMARY = [
  { name: 'Prism Green', hex: '#0ECB81', desc: 'Primary accent — signals, CTAs, active states', text: 'text-black' },
  { name: 'Prism Blue', hex: '#3B82F6', desc: 'Secondary accent — links, charts, info states', text: 'text-white' },
  { name: 'Prism Violet', hex: '#8B5CF6', desc: 'AI / intelligence — query UI, AI signals', text: 'text-white' },
  { name: 'Prism Cyan', hex: '#00D4FF', desc: 'Data / live indicators — real-time markers', text: 'text-black' },
];

const COLORS_SEMANTIC = [
  { name: 'Positive PnL', hex: '#10B981', desc: 'Gains, bullish signals', text: 'text-black' },
  { name: 'Negative PnL', hex: '#EF4444', desc: 'Losses, bearish signals', text: 'text-white' },
  { name: 'Warning', hex: '#F59E0B', desc: 'Caution, pending states', text: 'text-black' },
  { name: 'Neutral Signal', hex: '#6B7280', desc: 'Inactive, neutral data', text: 'text-white' },
];

const COLORS_BASE = [
  { name: 'Base', hex: '#060810', desc: 'Page background', text: 'text-white', border: true },
  { name: 'Surface', hex: '#0B0F1A', desc: 'Card / panel background', text: 'text-white', border: true },
  { name: 'Surface 2', hex: '#131D2E', desc: 'Elevated surfaces', text: 'text-white', border: true },
  { name: 'Surface 3', hex: '#1A253D', desc: 'Hover / active surfaces', text: 'text-white', border: true },
  { name: 'Text Primary', hex: '#E8EEFF', desc: 'Headlines, key data', text: 'text-black' },
  { name: 'Text Secondary', hex: '#94A3B8', desc: 'Body copy, labels', text: 'text-black' },
  { name: 'Text Muted', hex: '#374151', desc: 'Disabled, placeholder', text: 'text-white', border: true },
  { name: 'Border', hex: 'rgba(255,255,255,0.06)', desc: 'Subtle dividers', text: 'text-white', border: true, displayHex: '255/255/255 6%' },
];

/* ── Typography ─────────────────────────────────────────────────── */
const FONTS = [
  {
    name: 'Plus Jakarta Sans',
    role: 'Display & Headlines',
    weights: ['700 Bold', '800 ExtraBold'],
    samples: ['Think Like You.', 'Trade Like a Machine.'],
    style: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 },
    desc: 'Clean, modern geometric sans. Used for all hero headlines and section titles. Confident and professional.',
  },
  {
    name: 'Inter',
    role: 'Body Text & UI',
    weights: ['300 Light', '400 Regular', '500 Medium', '600 SemiBold', '700 Bold'],
    samples: ['Ask in plain English. Get quant-grade analysis on Crypto—instantly.'],
    style: { fontFamily: 'Inter, sans-serif' },
    desc: 'The industry standard for UI text. Highly legible at all sizes, used for body copy, labels, and data.',
  },
  {
    name: 'JetBrains Mono',
    role: 'Terminal / Code / Data',
    weights: ['400 Regular', '700 Bold'],
    samples: ['const signal = await prism.fetch("/api/v1/alpha");', 'BTC  $64,281  +2.4%  BULLISH'],
    style: { fontFamily: '"JetBrains Mono", monospace' },
    desc: 'Used exclusively for code, data tables, hex values, terminal output, and numeric data.',
  },
];

/* ── Component tokens ───────────────────────────────────────────── */
const BADGE_TYPES = [
  { label: 'ON-CHAIN', color: 'text-[#0ECB81] bg-[#0ECB81]/10 border-[#0ECB81]/20' },
  { label: 'FUNDAMENTAL', color: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20' },
  { label: 'MOMENTUM', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
  { label: 'TECHNICAL', color: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20' },
  { label: 'LIVE', color: 'text-[#00D4FF] bg-[#00D4FF]/10 border-[#00D4FF]/20' },
  { label: 'LOCKED', color: 'text-[#6B7280] bg-white/[0.04] border-white/[0.06]' },
];

export default function BrandKit() {
  const goHome = useCallback(() => {
    window.location.hash = '';
  }, []);

  return (
    <div className="min-h-screen text-gray-100" style={{ background: '#060810' }}>
      {/* Subtle prism grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Prism bloom — top left violet */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(700px circle at 10% 15%, rgba(139,92,246,0.07) 0%, transparent 60%), radial-gradient(600px circle at 90% 80%, rgba(14,203,129,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <header className="relative z-40 sticky top-0 border-b border-white/[0.05]"
        style={{ background: 'rgba(6,8,16,0.9)', backdropFilter: 'blur(16px)' }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="CryptoPrism" className="h-8 w-8" />
            <span className="font-mono text-sm font-bold tracking-widest text-[#0ECB81] uppercase">Brand Kit</span>
            <span className="hidden sm:inline font-mono text-[10px] text-white/20 border border-white/[0.06] px-2 py-0.5 rounded-full">v2.0 — Prism</span>
          </div>
          <button
            onClick={goHome}
            className="rounded-lg border border-white/[0.08] px-4 py-1.5 font-mono text-xs text-gray-400 transition hover:border-[#8B5CF6]/40 hover:text-[#8B5CF6]"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 space-y-24">

        {/* ── 01 Logo ── */}
        <section>
          <SectionTitle label="01" title="Logo" accent="#0ECB81" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.06] p-10"
              style={{ background: '#060810' }}>
              <img src="/logo.svg" alt="CryptoPrism logo" className="h-20 w-20" />
              <span className="font-mono text-xs text-white/30">On dark background</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-10">
              <img src="/logo.svg" alt="CryptoPrism logo" className="h-20 w-20" />
              <span className="font-mono text-xs text-gray-400">On light background</span>
            </div>
          </div>
          {/* Size variants */}
          <div className="mt-6 flex flex-wrap items-end gap-8 rounded-xl border border-white/[0.05] p-8"
            style={{ background: '#0B0F1A' }}>
            {[16, 24, 32, 48, 64, 96].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <img src="/logo.svg" alt="" style={{ width: size, height: size }} />
                <span className="font-mono text-[10px] text-white/25">{size}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 02 Color Palette ── */}
        <section>
          <SectionTitle label="02" title="Color Palette" accent="#3B82F6" />

          {/* Prism spectrum strip */}
          <div className="mb-10 rounded-xl overflow-hidden border border-white/[0.06]">
            <div className="h-3 w-full" style={{
              background: 'linear-gradient(90deg, #8B5CF6 0%, #00D4FF 33%, #0ECB81 66%, #3B82F6 100%)'
            }} />
            <div className="px-5 py-4 flex items-center justify-between" style={{ background: '#0B0F1A' }}>
              <div>
                <p className="text-sm font-semibold text-white/80" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Prism Spectrum</p>
                <p className="font-mono text-[11px] text-white/30 mt-0.5">Violet → Cyan → Green → Blue — the refraction signature</p>
              </div>
              <div className="hidden sm:flex gap-2 items-center">
                {['#8B5CF6', '#00D4FF', '#0ECB81', '#3B82F6'].map((c) => (
                  <div key={c} className="w-5 h-5 rounded-full border border-white/10" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-4">Primary Accents</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {COLORS_PRIMARY.map((c) => (
                  <ColorSwatch key={c.hex} {...c} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-4">Semantic Colors</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {COLORS_SEMANTIC.map((c) => (
                  <ColorSwatch key={c.hex} {...c} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-4">Base / Surfaces</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {COLORS_BASE.map((c) => (
                  <ColorSwatch key={c.name} {...c} hex={c.hex} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 Typography ── */}
        <section>
          <SectionTitle label="03" title="Typography" accent="#8B5CF6" />
          <div className="space-y-6">
            {FONTS.map((f) => (
              <div key={f.name} className="rounded-xl border border-white/[0.05] overflow-hidden"
                style={{ background: '#0B0F1A' }}>
                <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white" style={f.style}>{f.name}</h3>
                    <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-0.5 font-mono text-[11px] text-[#8B5CF6]">
                      {f.role}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-white/30">{f.desc}</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                  {f.samples.map((s, i) => (
                    <p key={i} className={`leading-snug text-white/80 ${i === 0 ? 'text-3xl' : 'text-base'}`} style={f.style}>
                      {s}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 px-6 pb-5">
                  {f.weights.map((w) => (
                    <span key={w} className="rounded border border-white/[0.06] px-2 py-1 font-mono text-[10px] text-white/30">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 Component Gallery ── */}
        <section>
          <SectionTitle label="04" title="Component Gallery" accent="#00D4FF" />
          <div className="space-y-8">

            {/* Buttons */}
            <div className="rounded-xl border border-white/[0.05] p-6" style={{ background: '#0B0F1A' }}>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-5">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="cta-animated-btn cta-animated-btn-solid py-3 px-6 rounded-lg font-bold text-sm">
                  Apply for Early Access →
                </button>
                <button className="cta-animated-btn py-3 px-6 rounded-lg font-bold text-sm">
                  View Strategies
                </button>
                <button className="rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] font-semibold text-sm px-5 py-3 transition hover:border-[#3B82F6]/60">
                  Learn More
                </button>
                <button className="rounded-lg border border-white/[0.08] text-white/50 font-mono text-xs px-4 py-2 transition hover:border-white/20 hover:text-white/70">
                  Ghost Button
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="rounded-xl border border-white/[0.05] p-6" style={{ background: '#0B0F1A' }}>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-5">Strategy Badges</h3>
              <div className="flex flex-wrap gap-3 items-center">
                {BADGE_TYPES.map((b) => (
                  <span key={b.label}
                    className={`font-mono text-[11px] tracking-widest px-3 py-1.5 rounded border font-bold ${b.color}`}>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Signal card */}
            <div className="rounded-xl border border-white/[0.05] p-6" style={{ background: '#0B0F1A' }}>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-5">Signal Card</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'BTC Signal', value: 'BULLISH', sub: '92% confidence', color: '#0ECB81', bg: 'rgba(14,203,129,0.06)', border: 'rgba(14,203,129,0.15)' },
                  { label: 'ETH Signal', value: 'NEUTRAL', sub: '67% confidence', color: '#00D4FF', bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.15)' },
                  { label: 'SOL Signal', value: 'WATCH', sub: '74% confidence', color: '#8B5CF6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.15)' },
                  { label: 'DOGE Signal', value: 'BEARISH', sub: '81% confidence', color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-4"
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                    <p className="font-mono text-[10px] text-white/30 tracking-wider mb-2">{s.label}</p>
                    <p className="text-xl font-black" style={{ color: s.color, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{s.value}</p>
                    <p className="font-mono text-[10px] text-white/30 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="rounded-xl border border-white/[0.05] p-6" style={{ background: '#0B0F1A' }}>
              <h3 className="font-mono text-[11px] text-white/30 tracking-widest uppercase mb-5">Stat Cards</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total Assets', value: '1,000+', icon: 'currency_bitcoin', color: '#0ECB81' },
                  { label: 'Indicators', value: '130+', icon: 'analytics', color: '#3B82F6' },
                  { label: 'News Sources', value: '44', icon: 'feed', color: '#8B5CF6' },
                  { label: 'Latency', value: '<200ms', icon: 'bolt', color: '#00D4FF' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.06] p-4 flex items-start gap-3"
                    style={{ background: '#131D2E' }}>
                    <span className="material-symbols-outlined text-[20px] mt-0.5 shrink-0" style={{ color: s.color }}>{s.icon}</span>
                    <div>
                      <p className="text-2xl font-black text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{s.value}</p>
                      <p className="font-mono text-[10px] text-white/30 mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 Logo Usage ── */}
        <section>
          <SectionTitle label="05" title="Logo Usage Guidelines" accent="#0ECB81" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#0ECB81]/15 p-6" style={{ background: 'rgba(14,203,129,0.03)' }}>
              <h3 className="mb-4 font-mono text-sm font-bold text-[#0ECB81]">Do</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Use the logo on solid dark or light backgrounds',
                  'Maintain minimum clear space of 1× the logo height on all sides',
                  'Use the SVG version whenever possible for crisp rendering',
                  'Minimum display size: 24px × 24px',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#0ECB81] shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#EF4444]/15 p-6" style={{ background: 'rgba(239,68,68,0.03)' }}>
              <h3 className="mb-4 font-mono text-sm font-bold text-[#EF4444]">Don't</h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {[
                  'Stretch, skew, or rotate the logo',
                  'Recolor the logo or apply gradients not in the brand palette',
                  'Place on busy or low-contrast backgrounds',
                  'Add drop shadows, outlines, or effects to the logo mark',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#EF4444] shrink-0">✗</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 06 Brand Voice ── */}
        <section>
          <SectionTitle label="06" title="Brand Voice" accent="#8B5CF6" />
          <div className="rounded-xl border border-white/[0.05] p-6 md:p-8" style={{ background: '#0B0F1A' }}>
            <p className="mb-6 text-sm leading-relaxed text-gray-400 max-w-2xl">
              CryptoPrism communicates with the precision of a trading terminal and the confidence of institutional-grade tooling. Every word carries signal — no fluff, no noise.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { word: 'Precise', desc: 'Data-first, no fluff. Every word carries signal.', color: '#0ECB81' },
                { word: 'Technical', desc: 'We speak the language of quants, not marketers.', color: '#3B82F6' },
                { word: 'Confident', desc: 'Clear assertions backed by real capability.', color: '#8B5CF6' },
                { word: 'Focused', desc: 'Minimal design, maximum information density.', color: '#00D4FF' },
              ].map((v) => (
                <div key={v.word} className="rounded-xl border border-white/[0.05] p-4"
                  style={{ background: '#131D2E' }}>
                  <h4 className="mb-1 font-bold text-base" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: v.color }}>{v.word}</h4>
                  <p className="text-xs leading-relaxed text-white/40">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-white/[0.05] py-8 text-center font-mono text-xs text-white/20">
        CryptoPrism &copy; {new Date().getFullYear()} &mdash; Brand assets for authorized use only.
      </footer>
    </div>
  );
}

/* ── Helper components ──────────────────────────────────────────── */
function SectionTitle({ label, title, accent }: { label: string; title: string; accent: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <span className="font-mono text-xs" style={{ color: accent + '80' }}>{label}</span>
      <h2 className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{title}</h2>
      <div className="flex-1 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

function ColorSwatch({ name, hex, desc, text, border }: {
  name: string; hex: string; desc?: string; text: string; border?: boolean; displayHex?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col justify-end rounded-xl h-28 p-3 transition-transform hover:scale-[1.02] cursor-default ${border ? 'border border-white/[0.06]' : ''}`}
      style={{ backgroundColor: hex.startsWith('rgba') ? hex : hex }}
    >
      <span className={`font-mono text-[11px] font-bold ${text}`}>{name}</span>
      <span className={`font-mono text-[10px] opacity-60 ${text} truncate`}>{hex}</span>
      {desc && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(6,8,16,0.85)', backdropFilter: 'blur(8px)' }}>
          <p className="font-mono text-[10px] text-white/70 px-3 text-center leading-relaxed">{desc}</p>
        </div>
      )}
    </div>
  );
}
