// Reusable dark "aurora" backdrop (2026-07-22) — the same particle + wave stack
// used by the Hero, so other dark sections (e.g. the Final CTA / FAQ) can share
// the identical look: 3 drifting aurora blobs, a dual dot-grid starfield, a
// twinkle layer, a slow drifting wave, and a full-bleed canvas of parallax
// stars + sine "data streams". Absolutely fills its (position:relative) parent.
// Reduced motion: the canvas paints a single static frame; CSS animations are
// already killed by the prism-home reduced-motion rule.
//
// TWO VARIANTS (Hallmark redesign 2026-07-22):
//   'hero' (default) — unchanged: the full stack exactly as this component has
//     always rendered it, matching the Hero's own inline copy of the same
//     effect (Hero.tsx keeps its own, so it is unaffected by this file).
//   'calm' — for secondary dark sections. Drops the violet bloom (the only
//     purple on the site, and purple-to-cyan mesh is the named 2022 generated
//     -design default), freezes every blob/twinkle/wave loop, and paints the
//     star canvas as a single static frame instead of an endless rAF loop.
//     Two full-page animated canvases on one page is a real cost, and the
//     closing section should be quiet — the questions are the content.

import { useEffect, useRef } from 'react';

type Variant = 'hero' | 'calm';

type Star = { x: number; y: number; z: number; ph: number; ink: boolean };
type Stream = { y0: number; amp: number; ph: number; sp: number };

function BgCanvas({ animated }: { animated: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const stars: Star[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({ x: Math.random(), y: Math.random(), z: 0.25 + Math.random() * 0.75, ph: Math.random() * Math.PI * 2, ink: Math.random() < 0.22 });
    }
    const streams: Stream[] = [];
    for (let i = 0; i < 6; i++) {
      streams.push({ y0: 0.12 + i * 0.15, amp: 18 + Math.random() * 30, ph: Math.random() * Math.PI * 2, sp: 0.05 + Math.random() * 0.06 });
    }
    const t0 = performance.now();

    const draw = () => {
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      const c = cv.getContext('2d');
      if (!c) return;
      const t = (performance.now() - t0) / 1000;
      c.clearRect(0, 0, w, h);
      for (const s of streams) {
        c.beginPath();
        for (let x = 0; x <= w; x += 16) {
          const y = s.y0 * h + Math.sin(x / 210 + t * s.sp * 8 + s.ph) * s.amp + Math.sin(x / 90 - t * s.sp * 5) * s.amp * 0.3;
          if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.strokeStyle = 'rgba(15,174,114,0.07)';
        c.lineWidth = 1;
        c.stroke();
      }
      for (const s of stars) {
        const y = ((s.y - t * 0.008 * s.z) % 1 + 1) % 1;
        const tw = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.5 + s.ph));
        const cxp = ((s.x + Math.sin(t * 0.05 + s.ph) * 0.006 * s.z) % 1) * w;
        c.fillStyle = s.ink ? `rgba(11,18,32,${tw * 0.35})` : `rgba(15,174,114,${tw * s.z})`;
        const sz = s.z * 2.1;
        c.fillRect(cxp, y * h, sz, sz);
      }
    };

    // 'calm' and reduced-motion both paint one frame and stop.
    // ResizeObserver, not a window resize listener: fitPages re-zooms and
    // re-widths the host section after mount without firing a window resize,
    // so a once-only paint would be left stretched against a canvas that
    // changed size underneath it.
    if (!animated || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw();
      const ro = new ResizeObserver(() => draw());
      ro.observe(cv);
      return () => ro.disconnect();
    }
    let raf = 0;
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

export function AuroraBackdrop({ variant = 'hero' }: { variant?: Variant } = {}) {
  const hero = variant === 'hero';
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '55%', top: '4%', width: 720, height: 560, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(15,174,114,0.20), transparent 70%)', filter: 'blur(60px)', animation: hero ? 'prism-auroraA 16s ease-in-out infinite' : undefined }} />
      <div style={{ position: 'absolute', left: '62%', top: '26%', width: 560, height: 480, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(34,211,238,0.13), transparent 70%)', filter: 'blur(70px)', animation: hero ? 'prism-auroraB 21s ease-in-out infinite' : undefined }} />
      {/* violet bloom: hero only — see the header note */}
      {hero && (
        <div style={{ position: 'absolute', left: '-10%', top: '40%', width: 640, height: 520, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(124,58,237,0.10), transparent 70%)', filter: 'blur(80px)', animation: 'prism-auroraC 24s ease-in-out infinite' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1.7px), radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1.7px)', backgroundSize: '210px 190px, 130px 120px', backgroundPosition: '14px 8px, 70px 84px' }} />
      {hero && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(52,211,153,0.6) 1.2px, transparent 2px)', backgroundSize: '290px 260px', backgroundPosition: '150px 40px', animation: 'prism-twinkle 5s ease-in-out infinite' }} />
      )}
      <svg width="2400" height="100%" viewBox="0 0 2400 800" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: 0, height: '100%', opacity: hero ? 0.5 : 0.34, animation: hero ? 'prism-waveDrift 26s linear infinite alternate' : undefined }}>
        <path d="M0 560 C300 500 500 640 800 590 S1400 480 1700 560 S2200 660 2400 590" fill="none" stroke="rgba(15,174,114,0.16)" strokeWidth="1.4" />
        <path d="M0 640 C350 590 550 700 900 655 S1500 560 1800 640 S2250 720 2400 660" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="1.2" />
        <path d="M0 470 C320 430 560 540 880 500 S1450 400 1750 470 S2200 560 2400 500" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>
      <BgCanvas animated={hero} />
    </div>
  );
}
