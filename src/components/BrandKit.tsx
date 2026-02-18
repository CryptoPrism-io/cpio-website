import { useCallback } from 'react';

const colors = [
  { name: 'Primary Green', hex: '#0ECB81', text: 'text-black' },
  { name: 'Cyan Accent', hex: '#00F2FE', text: 'text-black' },
  { name: 'Cyber Black', hex: '#020405', text: 'text-white', border: true },
  { name: 'Forest', hex: '#0A1A12', text: 'text-white', border: true },
  { name: 'Alert Red', hex: '#FF4D4D', text: 'text-black' },
  { name: 'Binance Yellow', hex: '#F0B90B', text: 'text-black' },
  { name: 'Gray 100', hex: '#F3F4F6', text: 'text-black' },
  { name: 'Gray 400', hex: '#9CA3AF', text: 'text-black' },
  { name: 'Gray 600', hex: '#4B5563', text: 'text-white' },
  { name: 'Gray 800', hex: '#1F2937', text: 'text-white' },
  { name: 'Gray 900', hex: '#111827', text: 'text-white' },
];

const fonts: { name: string; role: string; weights: string[]; sample: string; style: React.CSSProperties }[] = [
  {
    name: 'Plus Jakarta Sans',
    role: 'Display & Headings',
    weights: ['500 Medium', '600 SemiBold', '700 Bold', '800 ExtraBold'],
    sample: 'The quick brown fox jumps over the lazy dog',
    style: { fontFamily: '"Plus Jakarta Sans", sans-serif' },
  },
  {
    name: 'Inter',
    role: 'Body Text & UI',
    weights: ['400 Regular', '500 Medium', '600 SemiBold'],
    sample: 'The quick brown fox jumps over the lazy dog',
    style: { fontFamily: 'Inter, sans-serif' },
  },
  {
    name: 'JetBrains Mono',
    role: 'Terminal / Code / Data',
    weights: ['400 Regular', '500 Medium', '700 Bold'],
    sample: 'const signal = await fetch("/api/v1/alpha");',
    style: { fontFamily: '"JetBrains Mono", monospace' },
  },
];

export default function BrandKit() {
  const goHome = useCallback(() => {
    window.location.hash = '';
  }, []);

  return (
    <div className="min-h-screen bg-[#020405] text-gray-100">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,254,0.08) 2px, rgba(0,242,254,0.08) 4px)' }} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#020405]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="CryptoPrism" className="h-8 w-8" />
            <h1 className="font-mono text-sm font-bold tracking-widest text-[#0ECB81] uppercase">
              Brand Kit
            </h1>
          </div>
          <button
            onClick={goHome}
            className="rounded border border-white/10 px-4 py-1.5 font-mono text-xs text-gray-400 transition hover:border-[#0ECB81]/40 hover:text-[#0ECB81]"
          >
            &larr; Back to Home
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-24">
        {/* — Logo — */}
        <section>
          <SectionTitle label="01" title="Logo" />
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Dark bg */}
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-white/5 bg-[#020405] p-10">
              <img src="/logo.svg" alt="CryptoPrism logo" className="h-20 w-20" />
              <span className="font-mono text-xs text-gray-500">On dark background</span>
            </div>
            {/* Light bg */}
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-10">
              <img src="/logo.svg" alt="CryptoPrism logo" className="h-20 w-20" />
              <span className="font-mono text-xs text-gray-400">On light background</span>
            </div>
          </div>
          {/* Size variants */}
          <div className="mt-8 flex flex-wrap items-end gap-8 rounded-lg border border-white/5 bg-[#0A1A12]/30 p-8">
            {[16, 24, 32, 48, 64, 96].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <img src="/logo.svg" alt="" style={{ width: size, height: size }} />
                <span className="font-mono text-[10px] text-gray-500">{size}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* — Colors — */}
        <section>
          <SectionTitle label="02" title="Color Palette" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div
                key={c.hex}
                className={`group relative flex h-28 flex-col justify-end rounded-lg p-4 transition-transform hover:scale-[1.02] ${c.border ? 'border border-white/10' : ''}`}
                style={{ backgroundColor: c.hex }}
              >
                <span className={`font-mono text-xs font-bold ${c.text}`}>{c.name}</span>
                <span className={`font-mono text-[11px] opacity-70 ${c.text}`}>{c.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* — Typography — */}
        <section>
          <SectionTitle label="03" title="Typography" />
          <div className="space-y-8">
            {fonts.map((f) => (
              <div key={f.name} className="rounded-lg border border-white/5 bg-[#0A1A12]/20 p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-white" style={f.style}>{f.name}</h3>
                  <span className="rounded bg-[#0ECB81]/10 px-2 py-0.5 font-mono text-[11px] text-[#0ECB81]">
                    {f.role}
                  </span>
                </div>
                <p className="mb-4 text-2xl leading-relaxed text-gray-300" style={f.style}>
                  {f.sample}
                </p>
                <div className="flex flex-wrap gap-3">
                  {f.weights.map((w) => (
                    <span key={w} className="rounded border border-white/5 px-2 py-1 font-mono text-[10px] text-gray-500">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* — Logo Usage — */}
        <section>
          <SectionTitle label="04" title="Logo Usage Guidelines" />
          <div className="grid gap-6 md:grid-cols-2">
            {/* Do's */}
            <div className="rounded-lg border border-[#0ECB81]/20 bg-[#0ECB81]/5 p-6">
              <h3 className="mb-4 font-mono text-sm font-bold text-[#0ECB81]">Do</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#0ECB81]">&#10003;</span>
                  Use the logo on solid dark or light backgrounds
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#0ECB81]">&#10003;</span>
                  Maintain minimum clear space of 1x the logo height on all sides
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#0ECB81]">&#10003;</span>
                  Use the SVG version whenever possible for crisp rendering
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#0ECB81]">&#10003;</span>
                  Minimum display size: 24px &times; 24px
                </li>
              </ul>
            </div>
            {/* Don'ts */}
            <div className="rounded-lg border border-[#FF4D4D]/20 bg-[#FF4D4D]/5 p-6">
              <h3 className="mb-4 font-mono text-sm font-bold text-[#FF4D4D]">Don't</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#FF4D4D]">&#10007;</span>
                  Stretch, skew, or rotate the logo
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#FF4D4D]">&#10007;</span>
                  Recolor the logo or apply gradients not in the brand palette
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#FF4D4D]">&#10007;</span>
                  Place on busy or low-contrast backgrounds
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#FF4D4D]">&#10007;</span>
                  Add drop shadows, outlines, or effects to the logo
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* — Brand Voice — */}
        <section>
          <SectionTitle label="05" title="Brand Voice" />
          <div className="rounded-lg border border-white/5 bg-[#0A1A12]/20 p-6 md:p-8">
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              CryptoPrism communicates with the precision of a trading terminal and the confidence of institutional-grade tooling.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { word: 'Precise', desc: 'Data-first, no fluff. Every word carries signal.' },
                { word: 'Technical', desc: 'We speak the language of quants, not marketers.' },
                { word: 'Confident', desc: 'Clear assertions backed by real capability.' },
                { word: 'Clean', desc: 'Minimal design, maximum information density.' },
              ].map((v) => (
                <div key={v.word} className="rounded border border-white/5 bg-[#020405] p-4">
                  <h4 className="mb-1 font-mono text-sm font-bold text-[#00F2FE]">{v.word}</h4>
                  <p className="text-xs leading-relaxed text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-gray-600">
        CryptoPrism &copy; {new Date().getFullYear()} &mdash; Brand assets for authorized use only.
      </footer>
    </div>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <span className="font-mono text-xs text-[#0ECB81]/60">{label}</span>
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      <div className="flex-1 border-b border-white/5" />
    </div>
  );
}
