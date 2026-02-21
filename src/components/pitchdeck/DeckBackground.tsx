/**
 * DeckBackground — Neumorphic / Soft-relief SVG backgrounds for pitch deck slides.
 * Supports dark (default) and light mode via the `light` prop.
 *
 * Design language:
 *   - Neumorphism: directional highlight (top-left) + shadow (bottom-right)
 *   - Parametric curves: smooth cubic bezier splines / ellipses
 *   - Bas-relief illusion: shapes barely lift off the background surface
 *
 * 4 variants cycle across slides. Hidden in print (caller's responsibility).
 */

interface Tokens {
  fill1: string;   // lightest raise fill
  fill2: string;   // mid raise fill
  fill3: string;   // inner raise fill
  fill4: string;   // core fill
  hi1: string;     // top-left highlight stroke (lightest)
  hi2: string;     // highlight stroke medium
  hi3: string;     // highlight stroke strong
  sh1: string;     // bottom-right shadow stroke
  sh2: string;     // shadow blur layer
  gr1: string;     // green accent
  gr2: string;     // green accent medium
  glow1: [string, string, string]; // radial gradient stops [center, mid, edge]
  glow2: [string, string, string]; // secondary glow stops
  stroke: string;  // general outline
}

function makeTokens(light: boolean): Tokens {
  if (light) {
    // Light bg ~#f5f7fa — highlight = bright white, shadow = soft gray, fills = faint dark
    return {
      fill1:  'rgba(0,0,0,0.016)',
      fill2:  'rgba(0,0,0,0.020)',
      fill3:  'rgba(0,0,0,0.024)',
      fill4:  'rgba(0,0,0,0.028)',
      hi1:    'rgba(255,255,255,0.92)',
      hi2:    'rgba(255,255,255,0.82)',
      hi3:    'rgba(255,255,255,0.70)',
      sh1:    'rgba(0,0,0,0.09)',
      sh2:    'rgba(0,0,0,0.06)',
      gr1:    'rgba(4,120,87,0.10)',
      gr2:    'rgba(4,120,87,0.07)',
      glow1:  ['rgba(4,120,87,0.08)', 'rgba(4,120,87,0.03)', 'rgba(4,120,87,0)'],
      glow2:  ['rgba(4,120,87,0.06)', 'rgba(4,120,87,0.02)', 'rgba(4,120,87,0)'],
      stroke: 'rgba(0,0,0,0.055)',
    };
  }
  // Dark bg ~#060d18
  return {
    fill1:  'rgba(255,255,255,0.018)',
    fill2:  'rgba(255,255,255,0.022)',
    fill3:  'rgba(255,255,255,0.028)',
    fill4:  'rgba(255,255,255,0.032)',
    hi1:    'rgba(255,255,255,0.07)',
    hi2:    'rgba(255,255,255,0.08)',
    hi3:    'rgba(255,255,255,0.12)',
    sh1:    'rgba(0,0,0,0.10)',
    sh2:    'rgba(0,0,0,0.08)',
    gr1:    'rgba(4,120,87,0.05)',
    gr2:    'rgba(4,120,87,0.04)',
    glow1:  ['rgba(4,120,87,0.06)', 'rgba(4,120,87,0.02)', 'rgba(4,120,87,0)'],
    glow2:  ['rgba(4,120,87,0.05)', 'rgba(4,120,87,0.015)', 'rgba(4,120,87,0)'],
    stroke: 'rgba(255,255,255,0.04)',
  };
}

const SVG_STYLE: React.CSSProperties = {
  position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
};

/** Topographic — nested closed spline contours */
function BGTopo({ t, id }: { t: Tokens; id: string }) {
  return (
    <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
      <defs>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id={`${id}-glow`} cx="62%" cy="38%" r="30%">
          <stop offset="0%"   stopColor={t.glow1[0]} />
          <stop offset="100%" stopColor={t.glow1[2]} />
        </radialGradient>
      </defs>

      <rect width="1200" height="675" fill={`url(#${id}-glow)`} />

      {/* Outermost contour */}
      <path
        d="M 180 60 C 380 -20, 780 20, 1000 140 C 1140 220, 1190 380, 1120 510
           C 1050 630, 860 680, 650 665 C 440 650, 220 580, 130 440 C 40 300, 60 130, 180 60 Z"
        fill={t.fill1} filter={`url(#${id}-soft)`}
      />
      <path d="M 180 60 C 380 -20, 780 20, 1000 140"
        fill="none" stroke={t.hi1} strokeWidth="1.2" />
      <path d="M 1120 510 C 1050 630, 860 680, 650 665 C 440 650, 220 580, 130 440"
        fill="none" stroke={t.sh1} strokeWidth="3" filter={`url(#${id}-shadow)`} />

      {/* Middle contour */}
      <path
        d="M 270 120 C 430 55, 740 70, 930 185 C 1060 265, 1105 390, 1040 500
           C 975 600, 820 645, 640 635 C 460 625, 285 565, 215 440 C 145 315, 160 175, 270 120 Z"
        fill={t.fill2} stroke={t.stroke} strokeWidth="0.7" filter={`url(#${id}-soft)`}
      />
      <path d="M 270 120 C 430 55, 740 70, 930 185"
        fill="none" stroke={t.hi2} strokeWidth="1" />

      {/* Inner contour */}
      <path
        d="M 370 185 C 490 130, 710 138, 875 240 C 985 315, 1018 415, 955 505
           C 892 590, 768 625, 620 618 C 472 611, 348 558, 293 450 C 238 340, 260 232, 370 185 Z"
        fill={t.fill3} stroke={t.stroke} strokeWidth="0.6"
      />
      <path d="M 370 185 C 490 130, 710 138, 875 240"
        fill="none" stroke={t.hi2} strokeWidth="1.1" />
      <path d="M 955 505 C 892 590, 768 625, 620 618"
        fill="none" stroke={t.sh2} strokeWidth="2.5" filter={`url(#${id}-shadow)`} />

      {/* Core */}
      <path
        d="M 460 255 C 545 210, 690 214, 810 295 C 895 355, 920 430, 875 495
           C 830 555, 730 585, 610 580 C 490 575, 400 535, 362 460 C 324 380, 365 292, 460 255 Z"
        fill={t.fill4} stroke={t.stroke} strokeWidth="0.5" filter={`url(#${id}-soft)`}
      />
      <path d="M 460 255 C 545 210, 690 214, 810 295"
        fill="none" stroke={t.hi3} strokeWidth="1.2" />
    </svg>
  );
}

/** Flowing Planes — swept bezier "folded paper" bands */
function BGPlanes({ t, id }: { t: Tokens; id: string }) {
  return (
    <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={t.fill3} />
          <stop offset="100%" stopColor={t.sh2} />
        </linearGradient>
        <linearGradient id={`${id}-g2`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={t.gr1} />
          <stop offset="100%" stopColor={t.gr2} />
        </linearGradient>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`${id}-edge`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Back plane */}
      <path
        d="M -60 420 C 150 340, 480 310, 760 360 C 960 400, 1120 460, 1260 390
           L 1260 675 L -60 675 Z"
        fill={`url(#${id}-g1)`} filter={`url(#${id}-soft)`}
      />
      <path d="M -60 420 C 150 340, 480 310, 760 360 C 960 400, 1120 460, 1260 390"
        fill="none" stroke={t.hi2} strokeWidth="1.2" />
      <path d="M -60 426 C 150 346, 480 316, 760 366 C 960 406, 1120 466, 1260 396"
        fill="none" stroke={t.sh1} strokeWidth="5" filter={`url(#${id}-edge)`} />

      {/* Mid plane — green tint */}
      <path
        d="M -60 210 C 200 150, 520 180, 820 145 C 1020 120, 1160 170, 1260 130
           L 1260 675 L -60 675 Z"
        fill={`url(#${id}-g2)`} filter={`url(#${id}-soft)`}
      />
      <path d="M -60 210 C 200 150, 520 180, 820 145 C 1020 120, 1160 170, 1260 130"
        fill="none" stroke={t.gr1} strokeWidth="1" />

      {/* Top-right corner plane */}
      <path d="M 680 -60 C 820 10, 1040 30, 1260 -20 L 1260 -60 Z"
        fill={t.fill2} filter={`url(#${id}-soft)`} />

      {/* Grain lines */}
      <path d="M -60 300 C 300 240, 650 260, 950 220 C 1100 200, 1200 215, 1260 205"
        fill="none" stroke={t.stroke} strokeWidth="0.6" />
      <path d="M -60 510 C 250 460, 600 475, 900 440 C 1080 420, 1180 440, 1260 430"
        fill="none" stroke={t.stroke} strokeWidth="0.5" />
    </svg>
  );
}

/** Orbital Rings — concentric ellipses from off-screen focal point */
function BGOrbital({ t, id }: { t: Tokens; id: string }) {
  const rings = [
    { rx: 820, ry: 580, o: 1.00 },
    { rx: 660, ry: 470, o: 1.12 },
    { rx: 510, ry: 365, o: 1.25 },
    { rx: 370, ry: 265, o: 1.38 },
    { rx: 240, ry: 175, o: 1.50 },
    { rx: 130, ry:  95, o: 1.75 },
  ];
  const secondary = [
    { rx: 420, ry: 290, o: 0.75 },
    { rx: 290, ry: 200, o: 0.88 },
    { rx: 170, ry: 120, o: 1.00 },
  ];

  // Parse base opacities from token strings
  const baseWhite = parseFloat(t.hi1.replace(/[^0-9.]/g, '') || '0.07');
  const baseGreen = parseFloat(t.gr2.replace(/[^0-9.]/g, '') || '0.04');

  return (
    <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-g1`} cx="88%" cy="12%" r="38%">
          <stop offset="0%"   stopColor={t.glow1[0]} />
          <stop offset="100%" stopColor={t.glow1[2]} />
        </radialGradient>
        <radialGradient id={`${id}-g2`} cx="12%" cy="88%" r="30%">
          <stop offset="0%"   stopColor={t.glow2[0]} />
          <stop offset="100%" stopColor={t.glow2[2]} />
        </radialGradient>
        <filter id={`${id}-soft`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      <rect width="1200" height="675" fill={`url(#${id}-g1)`} />
      <rect width="1200" height="675" fill={`url(#${id}-g2)`} />

      {rings.map((r, i) => (
        <ellipse key={`r${i}`} cx={1080} cy={-20} rx={r.rx} ry={r.ry}
          fill="none"
          stroke={t.hi1.replace(/[\d.]+\)$/, `${(baseWhite * r.o).toFixed(3)})`)}
          strokeWidth="0.8" filter={`url(#${id}-soft)`}
        />
      ))}

      {secondary.map((r, i) => (
        <ellipse key={`s${i}`} cx={120} cy={700} rx={r.rx} ry={r.ry}
          fill="none"
          stroke={t.gr2.replace(/[\d.]+\)$/, `${(baseGreen * r.o).toFixed(3)})`)}
          strokeWidth="0.65" filter={`url(#${id}-soft)`}
        />
      ))}

      <circle cx={1080} cy={-20} r={55} fill={t.fill3} filter={`url(#${id}-soft)`} />
      <path d="M 1040 -55 A 55 55 0 0 1 1115 15"
        fill="none" stroke={t.hi3} strokeWidth="1.4" />
      <path d="M 1115 15 A 55 55 0 0 1 1040 35"
        fill="none" stroke={t.sh1} strokeWidth="2.5" filter={`url(#${id}-soft)`} />
      <path d="M 1080 -20 Q 600 300, 120 700"
        fill="none" stroke={t.stroke} strokeWidth="0.6" strokeDasharray="4 8" />
    </svg>
  );
}

/** Crystalline Facets — angular planes with neumorphic edge lighting */
function BGCrystalline({ t, id }: { t: Tokens; id: string }) {
  return (
    <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-f1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={t.fill3} />
          <stop offset="100%" stopColor={t.sh2} />
        </linearGradient>
        <linearGradient id={`${id}-f2`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={t.fill2} />
          <stop offset="100%" stopColor={t.gr2} />
        </linearGradient>
        <linearGradient id={`${id}-f3`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={t.gr1} />
          <stop offset="100%" stopColor={t.sh2} />
        </linearGradient>
        <linearGradient id={`${id}-f4`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor={t.fill2} />
          <stop offset="100%" stopColor={t.sh2} />
        </linearGradient>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Facet 1 — top-left */}
      <polygon points="0,0 600,0 380,240 120,310 0,200"
        fill={`url(#${id}-f1)`} filter={`url(#${id}-soft)`} />
      <polyline points="0,0 600,0" fill="none" stroke={t.hi2} strokeWidth="1.2" />
      <polyline points="0,0 0,200"  fill="none" stroke={t.hi1} strokeWidth="1" />
      <polyline points="380,240 120,310" fill="none" stroke={t.sh1} strokeWidth="2.5"
        filter={`url(#${id}-shadow)`} />

      {/* Facet 2 — top-right */}
      <polygon points="700,0 1200,0 1200,300 960,360 720,220"
        fill={`url(#${id}-f2)`} filter={`url(#${id}-soft)`} />
      <polyline points="700,0 1200,0"  fill="none" stroke={t.hi2} strokeWidth="1.1" />
      <polyline points="1200,0 1200,300" fill="none" stroke={t.hi1} strokeWidth="0.9" />
      <polyline points="960,360 720,220" fill="none" stroke={t.sh1} strokeWidth="2"
        filter={`url(#${id}-shadow)`} />

      {/* Facet 3 — bottom-left */}
      <polygon points="0,400 180,320 500,380 380,675 0,675"
        fill={`url(#${id}-f3)`} filter={`url(#${id}-soft)`} />
      <polyline points="0,400 0,675"  fill="none" stroke={t.hi1} strokeWidth="0.9" />
      <polyline points="0,400 180,320" fill="none" stroke={t.hi2} strokeWidth="1" />
      <polyline points="500,380 380,675" fill="none" stroke={t.sh1} strokeWidth="2"
        filter={`url(#${id}-shadow)`} />

      {/* Facet 4 — bottom-right */}
      <polygon points="820,675 1200,675 1200,360 980,290 820,480"
        fill={`url(#${id}-f4)`} filter={`url(#${id}-soft)`} />
      <polyline points="1200,360 1200,675" fill="none" stroke={t.hi1} strokeWidth="0.8" />
      <polyline points="980,290 820,480"   fill="none" stroke={t.hi2} strokeWidth="0.9" />

      {/* Seam lines */}
      <line x1="600" y1="0" x2="700" y2="0" stroke={t.gr1} strokeWidth="1" />
      <path d="M 380 240 C 520 280, 680 260, 720 220"
        fill="none" stroke={t.stroke} strokeWidth="0.7" />
      <path d="M 120 310 C 280 350, 380 380, 500 380"
        fill="none" stroke={t.gr2} strokeWidth="0.6" />
    </svg>
  );
}

export type DeckBgVariant = 0 | 1 | 2 | 3;

/**
 * BGPrint — print-safe decorative background.
 * No blur/filter (unreliable in browser print engines).
 * Fills top-left and bottom-right corners with crisp parametric curves.
 * Cycles through 4 corner-decoration styles matching the screen variants.
 */
function BGPrint({ variant }: { variant: DeckBgVariant }) {
  // Darker green for white paper
  const G  = 'rgba(4,120,87,0.22)';   // fill
  const GS = 'rgba(4,120,87,0.42)';   // stroke accent
  const GL = 'rgba(4,120,87,0.14)';   // light fill
  const SH = 'rgba(0,0,0,0.10)';      // shadow stroke

  if (variant === 0) {
    // Topographic corner rings
    return (
      <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
        {/* Top-left nested arcs */}
        {[280,220,160,100].map((r,i) => (
          <ellipse key={i} cx={0} cy={0} rx={r} ry={r*0.7}
            fill="none" stroke={i===2 ? GS : G} strokeWidth={i===2 ? 1 : 0.7} />
        ))}
        {/* Bottom-right nested arcs */}
        {[300,235,170,108].map((r,i) => (
          <ellipse key={i} cx={1200} cy={675} rx={r} ry={r*0.7}
            fill="none" stroke={i===2 ? GS : G} strokeWidth={i===2 ? 1 : 0.7} />
        ))}
        {/* Corner fills */}
        <path d="M 0 0 C 80 0, 180 40, 200 110 C 160 80, 60 50, 0 0 Z" fill={GL} />
        <path d="M 1200 675 C 1120 675, 1020 635, 1000 565 C 1040 595, 1140 625, 1200 675 Z" fill={GL} />
      </svg>
    );
  }

  if (variant === 1) {
    // Flowing plane edge bands — top and bottom sweeps
    return (
      <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
        {/* Top band */}
        <path d="M 0 0 C 200 0, 500 55, 800 35 C 1000 20, 1120 50, 1200 30 L 1200 0 Z"
          fill={G} />
        <path d="M 0 0 C 200 0, 500 55, 800 35 C 1000 20, 1120 50, 1200 30"
          fill="none" stroke={GS} strokeWidth="1" />
        <path d="M 0 0 C 200 18, 500 72, 800 52 C 1000 37, 1120 67, 1200 47"
          fill="none" stroke={SH} strokeWidth="0.5" />
        {/* Bottom band */}
        <path d="M 0 675 C 200 675, 500 620, 780 640 C 980 655, 1100 625, 1200 645 L 1200 675 Z"
          fill={G} />
        <path d="M 0 675 C 200 675, 500 620, 780 640 C 980 655, 1100 625, 1200 645"
          fill="none" stroke={GS} strokeWidth="1" />
        <path d="M 0 675 C 200 657, 500 602, 780 622 C 980 637, 1100 607, 1200 627"
          fill="none" stroke={SH} strokeWidth="0.5" />
      </svg>
    );
  }

  if (variant === 2) {
    // Orbital — partial ellipse rings from top-right + bottom-left
    return (
      <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
        {[520,400,290,185,95].map((r,i) => (
          <ellipse key={i} cx={1200} cy={0} rx={r} ry={r*0.72}
            fill="none" stroke={i===2||i===3 ? GS : G} strokeWidth={i===2 ? 1.1 : 0.65} />
        ))}
        {[380,285,195,115].map((r,i) => (
          <ellipse key={i} cx={0} cy={675} rx={r} ry={r*0.72}
            fill="none" stroke={i===1||i===2 ? GS : G} strokeWidth={i===1 ? 1 : 0.6} />
        ))}
        {/* Small filled disc at focal points */}
        <circle cx={1200} cy={0} r={18} fill={G} />
        <circle cx={0} cy={675} r={14} fill={GL} />
      </svg>
    );
  }

  // variant === 3: Crystalline corner wedges
  return (
    <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={SVG_STYLE} aria-hidden="true">
      {/* Top-left wedge */}
      <polygon points="0,0 320,0 0,200" fill={GL} />
      <line x1="0" y1="0" x2="320" y2="0" stroke={GS} strokeWidth="1.2" />
      <line x1="0" y1="0" x2="0" y2="200" stroke={GS} strokeWidth="1" />
      <line x1="320" y1="0" x2="0" y2="200" stroke={G} strokeWidth="0.7" />

      {/* Top-right accent */}
      <polygon points="1200,0 880,0 1200,160" fill={GL} />
      <line x1="880" y1="0" x2="1200" y2="0" stroke={GS} strokeWidth="1.2" />
      <line x1="1200" y1="0" x2="1200" y2="160" stroke={GS} strokeWidth="1" />
      <line x1="880" y1="0" x2="1200" y2="160" stroke={G} strokeWidth="0.7" />

      {/* Bottom-right wedge */}
      <polygon points="1200,675 880,675 1200,475" fill={GL} />
      <line x1="880" y1="675" x2="1200" y2="675" stroke={GS} strokeWidth="1.2" />
      <line x1="1200" y1="475" x2="1200" y2="675" stroke={GS} strokeWidth="1" />
      <line x1="880" y1="675" x2="1200" y2="475" stroke={G} strokeWidth="0.7" />

      {/* Bottom-left accent */}
      <polygon points="0,675 320,675 0,475" fill={GL} />
      <line x1="0" y1="475" x2="0" y2="675" stroke={GS} strokeWidth="1" />
      <line x1="0" y1="675" x2="320" y2="675" stroke={GS} strokeWidth="1.2" />
      <line x1="0" y1="475" x2="320" y2="675" stroke={G} strokeWidth="0.7" />

      {/* Center cross-hair seam */}
      <line x1="320" y1="0" x2="880" y2="0" stroke={G} strokeWidth="0.5" />
    </svg>
  );
}

export function DeckBackground({ variant, light = false, print = false }: { variant: DeckBgVariant; light?: boolean; print?: boolean }) {
  if (print) return <BGPrint variant={variant} />;
  const t = makeTokens(light);
  const id = `bg${variant}${light ? 'l' : 'd'}`;
  if (variant === 1) return <BGPlanes t={t} id={id} />;
  if (variant === 2) return <BGOrbital t={t} id={id} />;
  if (variant === 3) return <BGCrystalline t={t} id={id} />;
  return <BGTopo t={t} id={id} />;
}
