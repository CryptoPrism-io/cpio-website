import { useEffect, useRef, type RefObject } from 'react';

type Anchor = { left: number; top: number; w: number; h: number };
type Particle = { off: number; a0: number; av: number; vy: number; rf: number; s: number; em: boolean; tw: number };
type Face = { v: [number, number, number][]; a: number; p: [number, number, number][]; z: number; cross: number; shade: number; low?: boolean };

function makeParticles(n: number): Particle[] {
  const pts: Particle[] = [];
  for (let i = 0; i < n; i++) {
    pts.push({
      off: Math.random() * 1.95,
      a0: Math.random() * Math.PI * 2,
      av: 0.15 + Math.random() * 0.5,
      vy: 0.5 + Math.random() * 1.1,
      rf: Math.pow(Math.random(), 1.6),
      s: 0.8 + Math.random() * 1.2,
      em: Math.random() < 0.14,
      tw: Math.random() * Math.PI * 2,
    });
  }
  return pts;
}

function renderPrism(ctx: CanvasRenderingContext2D, t: number, speed: number, CX0: number, CY0: number, S: number, pts: Particle[], shatter: number) {
  const k = S / 112;
  const rot = t * 0.12 * speed;
  const bob = Math.sin(t * 0.45) * 4 * k;
  const tilt = -0.16, CX = CX0, CY = CY0 + bob, F = 4.2;
  const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
  const proj = (x: number, y: number, z: number): [number, number, number] => {
    const X = x * cr + z * sr, Z0 = -x * sr + z * cr;
    const Y = y * ct - Z0 * st, Z = y * st + Z0 * ct;
    const kk = F / (F + Z);
    return [CX + X * kk * S, CY + Y * kk * S, Z];
  };

  const apex: [number, number, number] = [0, -1.52, 0];
  const bot: [number, number, number] = [0, 0.92, 0];
  const ring: [number, number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    ring.push([Math.cos(a), 0.52, Math.sin(a)]);
  }
  const faces: Face[] = [];
  for (let i = 0; i < 6; i++) {
    const r1 = ring[i], r2 = ring[(i + 1) % 6];
    faces.push({ v: [apex, r1, r2], a: i * Math.PI / 3 } as Face);
    faces.push({ v: [bot, r2, r1], a: i * Math.PI / 3, low: true } as Face);
  }
  for (const f of faces) {
    f.p = f.v.map((v) => proj(v[0], v[1], v[2]));
    f.z = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3;
    const [p0, p1, p2] = f.p;
    f.cross = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
    f.shade = 0.5 + 0.5 * Math.sin(f.a + rot + 1.2);
    if (shatter > 0.001) {
      const cxF = (f.p[0][0] + f.p[1][0] + f.p[2][0]) / 3, cyF = (f.p[0][1] + f.p[1][1] + f.p[2][1]) / 3;
      let dx = cxF - CX, dy = cyF - CY;
      const dist = Math.hypot(dx, dy) || 1;
      dx /= dist; dy /= dist;
      const disp = shatter * 58 * k;
      const jitter = Math.sin(f.a * 3.1 + (f.low ? 7 : 0)) * shatter * 16 * k;
      const tx = dx * disp - dy * jitter * 0.3, ty = dy * disp + dx * jitter * 0.3;
      f.p = f.p.map((pt) => [pt[0] + tx, pt[1] + ty, pt[2]]) as typeof f.p;
    }
  }
  faces.sort((a, b) => b.z - a.z);
  const backF = faces.filter((f) => f.cross >= 0), frontF = faces.filter((f) => f.cross < 0);

  const groundY = CY0 + 0.92 * ct * S + 24 * k;
  ctx.save();
  ctx.translate(CX, groundY);
  ctx.scale(1, 0.16);
  let g = ctx.createRadialGradient(0, 0, 8 * k, 0, 0, 130 * k);
  g.addColorStop(0, 'rgba(11,18,32,0.13)');
  g.addColorStop(1, 'rgba(11,18,32,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, 130 * k, 0, Math.PI * 2); ctx.fill();
  g = ctx.createRadialGradient(0, 0, 4 * k, 0, 0, 75 * k);
  g.addColorStop(0, 'rgba(15,174,114,0.22)');
  g.addColorStop(1, 'rgba(15,174,114,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, 75 * k, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  const drawFace = (f: Face, front: boolean) => {
    ctx.beginPath();
    ctx.moveTo(f.p[0][0], f.p[0][1]);
    ctx.lineTo(f.p[1][0], f.p[1][1]);
    ctx.lineTo(f.p[2][0], f.p[2][1]);
    ctx.closePath();
    const mx = (f.p[1][0] + f.p[2][0]) / 2, my = (f.p[1][1] + f.p[2][1]) / 2;
    const gr = ctx.createLinearGradient(f.p[0][0], f.p[0][1], mx, my);
    gr.addColorStop(0, `rgba(255,255,255,${front ? 0.30 : 0.10})`);
    gr.addColorStop(1, `rgba(15,174,114,${(front ? 0.15 : 0.05) * f.shade + 0.03})`);
    ctx.fillStyle = gr;
    ctx.fill();
    ctx.strokeStyle = front ? `rgba(158,214,196,${0.55 + 0.35 * f.shade})` : 'rgba(160,205,195,0.30)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  backF.forEach((f) => drawFace(f, false));

  g = ctx.createRadialGradient(CX, CY + 12 * k, 4 * k, CX, CY + 12 * k, 95 * k);
  g.addColorStop(0, 'rgba(70,220,165,0.32)');
  g.addColorStop(0.5, 'rgba(15,174,114,0.13)');
  g.addColorStop(1, 'rgba(15,174,114,0)');
  ctx.fillStyle = g;
  ctx.fillRect(CX - 100 * k, CY - 90 * k, 200 * k, 210 * k);

  for (const p of pts) {
    const y = 0.5 - ((p.off + t * 0.045 * p.vy) % 1.95);
    const maxR = Math.max(0, (y + 1.52) / 2.04) * 0.92;
    const ang = p.a0 + t * p.av * 0.35 * (speed * 0.6 + 0.4);
    const r = p.rf * maxR;
    const [sx, sy, zz] = proj(Math.cos(ang) * r, y, Math.sin(ang) * r);
    const al = (0.22 + 0.5 * Math.abs(Math.sin(t * 0.4 + p.tw))) * (zz > 0 ? 0.5 : 1);
    ctx.fillStyle = p.em ? `rgba(80,225,170,${al})` : `rgba(255,255,255,${al})`;
    const ps = Math.max(0.7, p.s * k);
    ctx.fillRect(sx, sy, ps, ps);
  }

  frontF.forEach((f) => drawFace(f, true));

  const ap = proj(0, -1.52, 0);
  g = ctx.createRadialGradient(ap[0], ap[1], 0, ap[0], ap[1], 16 * k);
  g.addColorStop(0, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(ap[0] - 16 * k, ap[1] - 16 * k, 32 * k, 32 * k);
}

export function PrismCanvas({
  heroAnchor, problemAnchor, biasTaxAnchor, rotationSpeed = 1, particleDensity = 700,
}: {
  heroAnchor: RefObject<HTMLDivElement | null>;
  problemAnchor: RefObject<HTMLDivElement | null>;
  biasTaxAnchor: RefObject<HTMLDivElement | null>;
  rotationSpeed?: number;
  particleDensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 360, H = 440, bs = dpr * 1.3;
    cv.width = W * bs; cv.height = H * bs;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let pts = makeParticles(particleDensity);
    const t0 = performance.now();
    let frame = 0;
    let raf = 0;

    const rectOf = (el: HTMLElement): Anchor => {
      const r = el.getBoundingClientRect();
      return { left: r.left + window.scrollX, top: r.top + window.scrollY, w: r.width, h: r.height };
    };

    let rA: Anchor | null = null, rB: Anchor | null = null, rC: Anchor | null = null;
    const measure = () => {
      if (heroAnchor.current) rA = rectOf(heroAnchor.current);
      if (problemAnchor.current) rB = rectOf(problemAnchor.current);
      if (biasTaxAnchor.current) rC = rectOf(biasTaxAnchor.current);
    };
    measure();
    window.addEventListener('resize', measure);

    const draw = () => {
      if (pts.length !== Math.round(particleDensity)) pts = makeParticles(Math.round(particleDensity));
      const t = (performance.now() - t0) / 1000;

      if (frame++ % 45 === 0) measure();
      let shatter = 0;
      if (rA && rB) {
        const vh = window.innerHeight, sy = window.scrollY;
        const legs: [Anchor, Anchor][] = rC ? [[rA, rB], [rB, rC]] : [[rA, rB]];
        const bounds = legs.map(([p, q]) => ({
          start: p.top + p.h / 2 - vh * 0.55,
          end: q.top + q.h / 2 - vh * 0.52,
        }));
        let legIdx = bounds.length - 1;
        for (let i = 0; i < bounds.length; i++) { if (sy < bounds[i].end) { legIdx = i; break; } }
        const [pA, pB] = legs[legIdx], b = bounds[legIdx];
        const p = Math.max(0, Math.min(1, (sy - b.start) / Math.max(1, b.end - b.start)));
        const e2 = p * p * (3 - 2 * p);
        shatter = Math.pow(Math.sin(e2 * Math.PI), 1.4);
        const scA = pA.w / W, scB = pB.w / W;
        const sc = scA + (scB - scA) * e2;
        const cxA = pA.left + pA.w / 2, cyA = pA.top + pA.h / 2;
        const cxB = pB.left + pB.w / 2, cyB = pB.top + pB.h / 2;
        const cx = cxA + (cxB - cxA) * e2, cy = cyA + (cyB - cyA) * e2;
        cv.style.left = (cx - W * sc / 2) + 'px';
        cv.style.top = (cy - H * sc / 2) + 'px';
        cv.style.width = (W * sc) + 'px';
        cv.style.height = (H * sc) + 'px';
      }

      ctx.setTransform(bs, 0, 0, bs, 0, 0);
      ctx.clearRect(0, 0, W, H);
      renderPrism(ctx, t, rotationSpeed, 180, 242, 112, pts, shatter);
    };

    if (reduce) {
      draw();
    } else {
      const loop = () => { draw(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [heroAnchor, problemAnchor, biasTaxAnchor, rotationSpeed, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      width={720}
      height={880}
      style={{ position: 'absolute', left: 0, top: 0, width: 360, height: 440, zIndex: 3, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
