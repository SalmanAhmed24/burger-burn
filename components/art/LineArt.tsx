/* Single-weight line drawings. Every stroke uses pathLength="1" so GSAP can
   draw them in by animating stroke-dashoffset from 1 to 0. */

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
  className: "draw",
};

export function SteakLine() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <path {...common} d="M40 98 C30 56 70 26 118 30 C170 34 214 60 206 104 C198 146 150 158 104 152 C64 146 46 128 40 98Z" />
      <path {...common} d="M58 98 C54 66 84 46 118 48 C158 52 188 70 184 102 C180 132 146 140 108 136 C78 132 62 120 58 98Z" />
      <path {...common} d="M92 72 C108 66 130 70 140 84 C150 98 138 114 118 116 C98 118 84 104 86 90" />
      <path {...common} d="M118 30 L112 48 M150 38 L144 56 M176 52 L166 66" />
      <path {...common} d="M140 120 C150 112 164 112 170 120" />
      <path {...common} d="M40 98 C42 112 46 124 54 132" />
    </svg>
  );
}

export function BunLine() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <path {...common} d="M30 112 C30 62 72 34 120 34 C168 34 210 62 210 112 Z" />
      <path {...common} d="M24 112 L216 112 C216 124 200 132 180 132 L60 132 C40 132 24 124 24 112Z" />
      <path {...common} d="M34 148 L206 148 C206 160 190 166 170 166 L70 166 C50 166 34 160 34 148Z" />
      <path {...common} d="M80 60 l8 -3 M112 50 l8 -1 M146 54 l8 3 M96 80 l8 -2 M132 78 l8 1 M170 76 l7 4 M66 88 l7 -4" />
      <path {...common} d="M54 96 C70 70 92 58 112 56" />
    </svg>
  );
}

export function SauceLine() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <ellipse {...common} cx="120" cy="80" rx="92" ry="26" />
      <path {...common} d="M28 80 C32 136 72 162 120 162 C168 162 208 136 212 80" />
      <path {...common} d="M64 82 C80 66 160 64 176 80 C164 92 84 94 72 80 C86 72 152 72 160 80 C148 86 100 88 92 80 C104 76 132 76 136 80" />
      <path {...common} d="M120 66 C118 54 126 48 132 52" />
      <path {...common} d="M182 112 C176 132 160 146 140 152" />
    </svg>
  );
}

export function FlameLine() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <path {...common} d="M120 22 C140 52 168 62 160 98 C156 116 140 126 120 126 C96 126 80 112 80 92 C80 72 96 64 100 46 C110 60 112 70 110 80 C124 70 126 46 120 22Z" />
      <path {...common} d="M120 82 C130 94 132 104 124 112 C116 116 108 110 110 100 C112 94 118 92 120 82Z" />
      <path {...common} d="M30 140 L210 140 M30 156 L210 156" />
      <path {...common} d="M54 132 L54 164 M90 132 L90 164 M126 132 L126 164 M162 132 L162 164 M196 132 L196 164" />
      <path {...common} d="M56 108 l-12 -10 M184 108 l12 -10 M64 80 l-16 -4 M176 80 l16 -4" />
    </svg>
  );
}
