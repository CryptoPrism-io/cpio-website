/**
 * DeckBackground — Neumorphic / Soft-relief SVG backgrounds for pitch deck slides.
 *
 * 4 variants cycle across slides. Design language:
 *   - Neumorphism: directional highlight (top-left) + shadow (bottom-right) on shapes
 *   - Parametric curves: smooth cubic bezier splines / ellipses
 *   - Monochrome dark palette + very subtle green accent
 *   - Bas-relief illusion: shapes barely lift off the background
 *
 * Hidden in print mode (caller's responsibility).
 */

/** Topographic — nested closed spline contours, light-source top-left */
function BGTopo() {
  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="bgt-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="bgt-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="bgt-glow" cx="62%" cy="38%" r="30%">
          <stop offset="0%" stopColor="#0ecb81" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0ecb81" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient green glow at centroid */}
      <rect width="1200" height="675" fill="url(#bgt-glow)" />

      {/* Outermost contour — barely visible fill */}
      <path
        d="M 180 60 C 380 -20, 780 20, 1000 140 C 1140 220, 1190 380, 1120 510
           C 1050 630, 860 680, 650 665 C 440 650, 220 580, 130 440 C 40 300, 60 130, 180 60 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="none"
        filter="url(#bgt-soft)"
      />
      {/* Outer highlight — top-left arc */}
      <path
        d="M 180 60 C 380 -20, 780 20, 1000 140"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1.2"
      />
      {/* Outer shadow — bottom-right arc */}
      <path
        d="M 1120 510 C 1050 630, 860 680, 650 665 C 440 650, 220 580, 130 440"
        fill="none"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="3"
        filter="url(#bgt-shadow)"
      />

      {/* Middle contour */}
      <path
        d="M 270 120 C 430 55, 740 70, 930 185 C 1060 265, 1105 390, 1040 500
           C 975 600, 820 645, 640 635 C 460 625, 285 565, 215 440 C 145 315, 160 175, 270 120 Z"
        fill="rgba(255,255,255,0.022)"
        stroke="rgba(255,255,255,0.045)"
        strokeWidth="0.7"
        filter="url(#bgt-soft)"
      />
      {/* Middle highlight */}
      <path
        d="M 270 120 C 430 55, 740 70, 930 185"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Inner contour */}
      <path
        d="M 370 185 C 490 130, 710 138, 875 240 C 985 315, 1018 415, 955 505
           C 892 590, 768 625, 620 618 C 472 611, 348 558, 293 450 C 238 340, 260 232, 370 185 Z"
        fill="rgba(255,255,255,0.028)"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.6"
      />
      {/* Inner highlight — sharper, more pronounced */}
      <path
        d="M 370 185 C 490 130, 710 138, 875 240"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1.1"
      />
      {/* Inner shadow */}
      <path
        d="M 955 505 C 892 590, 768 625, 620 618"
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="2.5"
        filter="url(#bgt-shadow)"
      />

      {/* Core — slightly raised disc feel */}
      <path
        d="M 460 255 C 545 210, 690 214, 810 295 C 895 355, 920 430, 875 495
           C 830 555, 730 585, 610 580 C 490 575, 400 535, 362 460 C 324 380, 365 292, 460 255 Z"
        fill="rgba(255,255,255,0.032)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.5"
        filter="url(#bgt-soft)"
      />
      {/* Core highlight */}
      <path
        d="M 460 255 C 545 210, 690 214, 810 295"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Flowing Planes — swept bezier "folded paper" bands */
function BGPlanes() {
  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bgp-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="bgp-g2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ecb81" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0ecb81" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="bgp-g3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.03" />
        </linearGradient>
        <filter id="bgp-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="bgp-edge" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Back plane — large sweep, bottom third */}
      <path
        d="M -60 420 C 150 340, 480 310, 760 360 C 960 400, 1120 460, 1260 390
           L 1260 675 L -60 675 Z"
        fill="url(#bgp-g1)"
        filter="url(#bgp-soft)"
      />
      {/* Back plane highlight edge */}
      <path
        d="M -60 420 C 150 340, 480 310, 760 360 C 960 400, 1120 460, 1260 390"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1.2"
      />
      {/* Back plane shadow beneath edge */}
      <path
        d="M -60 426 C 150 346, 480 316, 760 366 C 960 406, 1120 466, 1260 396"
        fill="none"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="5"
        filter="url(#bgp-edge)"
      />

      {/* Mid plane — green tint, crosses through middle */}
      <path
        d="M -60 210 C 200 150, 520 180, 820 145 C 1020 120, 1160 170, 1260 130
           L 1260 675 L -60 675 Z"
        fill="url(#bgp-g2)"
        filter="url(#bgp-soft)"
      />
      {/* Mid plane highlight */}
      <path
        d="M -60 210 C 200 150, 520 180, 820 145 C 1020 120, 1160 170, 1260 130"
        fill="none"
        stroke="rgba(14,203,129,0.10)"
        strokeWidth="1"
      />

      {/* Top plane — top-right corner only */}
      <path
        d="M 680 -60 C 820 10, 1040 30, 1260 -20 L 1260 -60 Z"
        fill="url(#bgp-g3)"
        filter="url(#bgp-soft)"
      />

      {/* Fine highlight lines — "grain" of the paper */}
      <path
        d="M -60 300 C 300 240, 650 260, 950 220 C 1100 200, 1200 215, 1260 205"
        fill="none"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth="0.6"
      />
      <path
        d="M -60 510 C 250 460, 600 475, 900 440 C 1080 420, 1180 440, 1260 430"
        fill="none"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

/** Orbital Rings — concentric ellipse rings from off-screen focal point */
function BGOrbital() {
  const rings = [
    { rx: 820, ry: 580, o: 0.04 },
    { rx: 660, ry: 470, o: 0.045 },
    { rx: 510, ry: 365, o: 0.05 },
    { rx: 370, ry: 265, o: 0.055 },
    { rx: 240, ry: 175, o: 0.06 },
    { rx: 130, ry:  95, o: 0.07 },
  ];
  const secondary = [
    { rx: 420, ry: 290, o: 0.03 },
    { rx: 290, ry: 200, o: 0.035 },
    { rx: 170, ry: 120, o: 0.04 },
  ];

  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bgo-glow1" cx="88%" cy="12%" r="38%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgo-glow2" cx="12%" cy="88%" r="30%">
          <stop offset="0%" stopColor="#0ecb81" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0ecb81" stopOpacity="0" />
        </radialGradient>
        <filter id="bgo-soft" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      <rect width="1200" height="675" fill="url(#bgo-glow1)" />
      <rect width="1200" height="675" fill="url(#bgo-glow2)" />

      {/* Primary ring cluster — focal point top-right */}
      {rings.map((r, i) => (
        <ellipse
          key={`r${i}`}
          cx={1080} cy={-20}
          rx={r.rx} ry={r.ry}
          fill="none"
          stroke={`rgba(255,255,255,${r.o})`}
          strokeWidth="0.8"
          filter="url(#bgo-soft)"
        />
      ))}

      {/* Secondary green cluster — bottom-left */}
      {secondary.map((r, i) => (
        <ellipse
          key={`s${i}`}
          cx={120} cy={700}
          rx={r.rx} ry={r.ry}
          fill="none"
          stroke={`rgba(14,203,129,${r.o})`}
          strokeWidth="0.65"
          filter="url(#bgo-soft)"
        />
      ))}

      {/* Neumorphic "nucleus" disc at focal point */}
      <circle cx={1080} cy={-20} r={55}
        fill="rgba(255,255,255,0.04)"
        filter="url(#bgo-soft)"
      />
      {/* Nucleus highlight arc */}
      <path
        d="M 1040 -55 A 55 55 0 0 1 1115 15"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.4"
      />
      {/* Nucleus shadow arc */}
      <path
        d="M 1115 15 A 55 55 0 0 1 1040 35"
        fill="none"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="2.5"
        filter="url(#bgo-soft)"
      />

      {/* Connecting sweep — diagonal tension line */}
      <path
        d="M 1080 -20 Q 600 300, 120 700"
        fill="none"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="0.6"
        strokeDasharray="4 8"
      />
    </svg>
  );
}

/** Crystalline Facets — angular planes with neumorphic edge lighting */
function BGCrystalline() {
  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bgc-f1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.055" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="bgc-f2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0ecb81" stopOpacity="0.025" />
        </linearGradient>
        <linearGradient id="bgc-f3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ecb81" stopOpacity="0.035" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="bgc-f4" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
        </linearGradient>
        <filter id="bgc-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="bgc-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Facet 1 — top-left panel */}
      <polygon
        points="0,0 600,0 380,240 120,310 0,200"
        fill="url(#bgc-f1)"
        filter="url(#bgc-soft)"
      />
      {/* F1 highlight edges (lit by top-left source) */}
      <polyline points="0,0 600,0" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" />
      <polyline points="0,0 0,200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* F1 shadow edges */}
      <polyline points="380,240 120,310" fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5"
        filter="url(#bgc-shadow)" />

      {/* Facet 2 — top-right panel */}
      <polygon
        points="700,0 1200,0 1200,300 960,360 720,220"
        fill="url(#bgc-f2)"
        filter="url(#bgc-soft)"
      />
      {/* F2 highlight */}
      <polyline points="700,0 1200,0" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.1" />
      <polyline points="1200,0 1200,300" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.9" />
      {/* F2 shadow */}
      <polyline points="960,360 720,220" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2"
        filter="url(#bgc-shadow)" />

      {/* Facet 3 — bottom-left panel */}
      <polygon
        points="0,400 180,320 500,380 380,675 0,675"
        fill="url(#bgc-f3)"
        filter="url(#bgc-soft)"
      />
      {/* F3 highlight (left edge lit) */}
      <polyline points="0,400 0,675" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.9" />
      <polyline points="0,400 180,320" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* F3 shadow */}
      <polyline points="500,380 380,675" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2"
        filter="url(#bgc-shadow)" />

      {/* Facet 4 — bottom-right panel */}
      <polygon
        points="820,675 1200,675 1200,360 980,290 820,480"
        fill="url(#bgc-f4)"
        filter="url(#bgc-soft)"
      />
      {/* F4 edges */}
      <polyline points="1200,360 1200,675" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
      <polyline points="980,290 820,480" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.9" />

      {/* Central seam lines — where facets meet */}
      <line x1="600" y1="0" x2="700" y2="0" stroke="rgba(14,203,129,0.06)" strokeWidth="1" />
      <path d="M 380 240 C 520 280, 680 260, 720 220"
        fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" />
      <path d="M 120 310 C 280 350, 380 380, 500 380"
        fill="none" stroke="rgba(14,203,129,0.04)" strokeWidth="0.6" />
    </svg>
  );
}

export type DeckBgVariant = 0 | 1 | 2 | 3;

export function DeckBackground({ variant }: { variant: DeckBgVariant }) {
  if (variant === 1) return <BGPlanes />;
  if (variant === 2) return <BGOrbital />;
  if (variant === 3) return <BGCrystalline />;
  return <BGTopo />;
}
