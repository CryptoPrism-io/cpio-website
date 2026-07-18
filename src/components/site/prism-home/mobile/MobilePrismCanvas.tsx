// Mobile Home — hero data-flow + prism canvas.
//
// Ported verbatim (every coefficient/alpha/gradient stop) from the reference
// class-component canvas at docs/superpowers/specs/reference/2026-07-18-mobile-design-v1.html:
//   - componentDidMount canvas setup: lines 452-460
//   - makeParticles: lines 468-474
//   - draw: lines 475-487
//   - drawFlows: lines 488-531
//   - hexToRgb / mixWhite: lines 532-533
//   - renderPrism: lines 534-616
//
// Per the plan's Global Constraints, the theming props (accentColor,
// accentColor2, animate, rotationSpeed, particleDensity) are not ported —
// hardcoded instead: accent '#0FAE72', speed 1, animate always true (the
// reference's frozenT freeze branch for animate=false is dropped entirely),
// density 500. This is a standalone component — NOT a modification of the
// desktop scroll-driven PrismCanvas.tsx (different geometry/lifecycle).

import { useEffect, useRef } from 'react';

type Particle = { off: number; a0: number; av: number; vy: number; rf: number; s: number; em: boolean; tw: number };
type Face = { v: [number, number, number][]; a: number; p: [number, number, number][]; z: number; cross: number; shade: number };
type InLane = { y0: number; amp: number; ph: number; sp: number };
type OutLane = { y0: number; sp: number; ph: number };
type Lanes = { inLanes: InLane[]; outLanes: OutLane[] };

const W = 390;
const H = 380;
const CX = 195;
const CY = 182;
const S = 92;
const SPEED = 1;
const DENSITY = 500;

// hexToRgb/mixWhite (reference lines 532-533), kept as the same pure
// functions the reference uses, but since the accent is hardcoded (not a
// reactive prop) they only need to run once — precomputed as module
// constants below rather than every frame.
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mixWhite(rgb: [number, number, number], t: number): [number, number, number] {
  return rgb.map((c) => Math.round(c + (255 - c) * t)) as [number, number, number];
}

const [AR, AG, AB] = hexToRgb('#0FAE72');
const [GR1, GG1, GB1] = mixWhite([AR, AG, AB], 0.35);
const [PR1, PG1, PB1] = mixWhite([AR, AG, AB], 0.42);
const [SR1, SG1, SB1] = mixWhite([AR, AG, AB], 0.65);
const [SR2, SG2, SB2] = mixWhite([AR, AG, AB], 0.68);

// makeParticles — reference lines 468-474.
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

function bez(p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number], u: number): [number, number] {
  const v = 1 - u;
  return [
    v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0],
    v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1],
  ];
}

// drawFlows — reference lines 488-531. `lanesRef` persists the 6 inflow /
// 3 outflow lane arrays across frames (the reference lazily inits
// `this.inLanes`/`this.outLanes` once on the instance; here that's a ref
// mutated on first call). `h` is unused — the reference itself never reads
// its H parameter inside drawFlows, ported as-is.
function drawFlows(ctx: CanvasRenderingContext2D, t: number, w: number, _h: number, lanesRef: { current: Lanes | null }) {
  const cx = CX, cy = CY;
  if (!lanesRef.current) {
    const inLanes: InLane[] = [];
    for (let i = 0; i < 6; i++) {
      inLanes.push({ y0: 60 + i * 48, amp: 10 + Math.random() * 18, ph: Math.random() * Math.PI * 2, sp: 0.10 + Math.random() * 0.08 });
    }
    const outLanes: OutLane[] = [];
    for (let i = 0; i < 3; i++) {
      outLanes.push({ y0: cy - 26 + i * 26, sp: 0.14 + i * 0.03, ph: Math.random() });
    }
    lanesRef.current = { inLanes, outLanes };
  }
  const { inLanes, outLanes } = lanesRef.current;

  // inflow: chaotic gray streams from the left edge converging on the prism core
  for (const L of inLanes) {
    const p0: [number, number] = [-6, L.y0 + Math.sin(t * 0.5 + L.ph) * L.amp];
    const p1: [number, number] = [70, L.y0 + Math.cos(t * 0.4 + L.ph) * L.amp * 1.4];
    const p2: [number, number] = [130, cy + (L.y0 - cy) * 0.3];
    const p3: [number, number] = [cx - 62, cy + (L.y0 - cy) * 0.08];
    ctx.beginPath();
    let first = true;
    for (let u = 0; u <= 1.001; u += 0.05) {
      const [x, y] = bez(p0, p1, p2, p3, u);
      if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(11,18,32,0.07)';
    ctx.lineWidth = 1;
    ctx.stroke();
    for (let d = 0; d < 3; d++) {
      const u = (t * L.sp + L.ph + d / 3) % 1;
      const [x, y] = bez(p0, p1, p2, p3, u);
      const fade = u < 0.1 ? u / 0.1 : u > 0.85 ? (1 - u) / 0.15 : 1;
      ctx.fillStyle = `rgba(71,84,103,${0.55 * fade})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // outflow: ordered accent beams, straight and parallel — intelligence
  for (const L of outLanes) {
    const x0 = cx + 58, x1 = w + 6;
    const g = ctx.createLinearGradient(x0, 0, x1, 0);
    g.addColorStop(0, `rgba(${AR},${AG},${AB},0.28)`);
    g.addColorStop(1, `rgba(${AR},${AG},${AB},0.03)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, L.y0);
    ctx.lineTo(x1, L.y0);
    ctx.stroke();
    for (let d = 0; d < 2; d++) {
      const u = (t * L.sp + L.ph + d / 2) % 1;
      const x = x0 + u * (x1 - x0);
      const fade = u > 0.8 ? (1 - u) / 0.2 : 1;
      ctx.fillStyle = `rgba(${AR},${AG},${AB},${0.85 * fade})`;
      ctx.fillRect(x - 3.5, L.y0 - 0.8, 7, 1.6);
    }
  }
}

// renderPrism — reference lines 534-616. `nMax` in the reference is always
// called with `this.pts.length` (the same array passed in), so the
// `Math.min(nMax, this.pts.length)` there is a no-op; ported here simply as
// `pts.length`.
function renderPrism(ctx: CanvasRenderingContext2D, t: number, speed: number, CX0: number, CY0: number, s: number, pts: Particle[]) {
  const k = s / 112;
  const rot = t * 0.12 * speed;
  const bob = Math.sin(t * 0.45) * 4 * k;
  const tilt = -0.16, cx = CX0, cy = CY0 + bob, F = 4.2;
  const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
  const proj = (x: number, y: number, z: number): [number, number, number] => {
    const X = x * cr + z * sr, Z0 = -x * sr + z * cr;
    const Y = y * ct - Z0 * st, Z = y * st + Z0 * ct;
    const kk = F / (F + Z);
    return [cx + X * kk * s, cy + Y * kk * s, Z];
  };

  const apex: [number, number, number] = [0, -1.52, 0];
  const bot: [number, number, number] = [0, 0.92, 0];
  const ring: [number, number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    ring.push([Math.cos(a), 0.52, Math.sin(a)]);
  }
  const faces: Face[] = [];
  for (let i = 0; i < 6; i++) {
    const r1 = ring[i], r2 = ring[(i + 1) % 6];
    faces.push({ v: [apex, r1, r2], a: (i * Math.PI) / 3 } as Face);
    faces.push({ v: [bot, r2, r1], a: (i * Math.PI) / 3 } as Face);
  }
  for (const f of faces) {
    f.p = f.v.map((v) => proj(v[0], v[1], v[2]));
    f.z = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3;
    const [p0, p1, p2] = f.p;
    f.cross = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
    f.shade = 0.5 + 0.5 * Math.sin(f.a + rot + 1.2);
  }
  faces.sort((a, b) => b.z - a.z);
  const backF = faces.filter((f) => f.cross >= 0);
  const frontF = faces.filter((f) => f.cross < 0);

  const groundY = CY0 + 0.92 * ct * s + 24 * k;
  ctx.save();
  ctx.translate(cx, groundY);
  ctx.scale(1, 0.16);
  let g = ctx.createRadialGradient(0, 0, 8 * k, 0, 0, 130 * k);
  g.addColorStop(0, 'rgba(11,18,32,0.13)');
  g.addColorStop(1, 'rgba(11,18,32,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, 130 * k, 0, Math.PI * 2);
  ctx.fill();
  g = ctx.createRadialGradient(0, 0, 4 * k, 0, 0, 75 * k);
  g.addColorStop(0, `rgba(${AR},${AG},${AB},0.22)`);
  g.addColorStop(1, `rgba(${AR},${AG},${AB},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, 75 * k, 0, Math.PI * 2);
  ctx.fill();
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
    gr.addColorStop(1, `rgba(${AR},${AG},${AB},${(front ? 0.15 : 0.05) * f.shade + 0.03})`);
    ctx.fillStyle = gr;
    ctx.fill();
    ctx.strokeStyle = front ? `rgba(${SR1},${SG1},${SB1},${0.55 + 0.35 * f.shade})` : `rgba(${SR2},${SG2},${SB2},0.30)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  backF.forEach((f) => drawFace(f, false));

  g = ctx.createRadialGradient(cx, cy + 12 * k, 4 * k, cx, cy + 12 * k, 95 * k);
  g.addColorStop(0, `rgba(${GR1},${GG1},${GB1},0.32)`);
  g.addColorStop(0.5, `rgba(${AR},${AG},${AB},0.13)`);
  g.addColorStop(1, `rgba(${AR},${AG},${AB},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(cx - 100 * k, cy - 90 * k, 200 * k, 210 * k);

  for (let pi = 0; pi < pts.length; pi++) {
    const p = pts[pi];
    const y = 0.5 - ((p.off + t * 0.045 * p.vy) % 1.95);
    const maxR = Math.max(0, (y + 1.52) / 2.04) * 0.92;
    const ang = p.a0 + t * p.av * 0.35 * (speed * 0.6 + 0.4);
    const r = p.rf * maxR;
    const [sx, sy, zz] = proj(Math.cos(ang) * r, y, Math.sin(ang) * r);
    const al = (0.22 + 0.5 * Math.abs(Math.sin(t * 0.4 + p.tw))) * (zz > 0 ? 0.5 : 1);
    ctx.fillStyle = p.em ? `rgba(${PR1},${PG1},${PB1},${al})` : `rgba(255,255,255,${al})`;
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

export function MobilePrismCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ptsRef = useRef<Particle[]>([]);
  const lanesRef = useRef<Lanes | null>(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    // reference lines 452-456: backing scale min(dpr,2)*1.3 against a fixed
    // 390x380 CSS size.
    const bs = Math.min(window.devicePixelRatio || 1, 2) * 1.3;
    cv.width = W * bs;
    cv.height = H * bs;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    ptsRef.current = makeParticles(DENSITY);
    t0Ref.current = performance.now();

    const draw = () => {
      if (ptsRef.current.length !== DENSITY) ptsRef.current = makeParticles(DENSITY);
      const t = (performance.now() - t0Ref.current) / 1000;
      ctx.setTransform(bs, 0, 0, bs, 0, 0);
      ctx.clearRect(0, 0, W, H);
      drawFlows(ctx, t, W, H, lanesRef);
      renderPrism(ctx, t, SPEED, CX, CY, S, ptsRef.current);
    };

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ width: W, height: H }}
      aria-hidden="true"
    />
  );
}

export default MobilePrismCanvas;
