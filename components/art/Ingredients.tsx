/* Hand-built SVG ingredients. Flat cel-shading with a deep green outline so
   they sit in the same world as the line illustrations further down the page. */

const INK = "#1C332D";
const SW = 5; // outline stroke width (viewBox units)

type ArtProps = { className?: string };

function wavyEllipse(cx: number, cy: number, rx: number, ry: number, waves: number, amp: number) {
  const steps = waves * 10;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const k = 1 + amp * Math.sin(waves * t);
    const x = cx + Math.cos(t) * rx * k;
    const y = cy + Math.sin(t) * ry * (1 + amp * 1.6 * Math.sin(waves * t));
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d + "Z";
}

const seeds: [number, number, number][] = [
  [120, 70, -30], [165, 48, -10], [215, 44, 8], [262, 58, 25], [300, 86, 35],
  [95, 108, -40], [148, 92, -18], [200, 80, 0], [250, 94, 18], [312, 124, 40],
  [130, 132, -25], [180, 120, -6], [228, 124, 10], [278, 132, 28],
];

export function BunTop({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 200" aria-hidden="true">
      <path
        d="M18 158 C18 58 100 10 200 10 C300 10 382 58 382 158 C382 184 300 196 200 196 C100 196 18 184 18 158Z"
        fill="#E39A35" stroke={INK} strokeWidth={SW} strokeLinejoin="round"
      />
      <path d="M30 150 C70 176 330 176 370 150 C376 172 300 188 200 188 C100 188 24 172 30 150Z" fill="#B96E1F" />
      <path d="M70 92 C92 50 150 28 206 28 C170 40 118 64 96 112 Z" fill="#F6C46E" />
      {seeds.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="9" ry="4.6" transform={`rotate(${r} ${x} ${y})`} fill="#FFF3DA" stroke={INK} strokeWidth="2.4" />
      ))}
    </svg>
  );
}

export function Lettuce({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 90" aria-hidden="true">
      <path d={wavyEllipse(200, 45, 186, 28, 14, 0.06)} fill="#5DB437" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d={wavyEllipse(200, 40, 150, 18, 11, 0.07)} fill="#8AD456" />
      <path d="M90 42 Q200 30 310 42" fill="none" stroke="#3F8C26" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Tomato({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 70" aria-hidden="true">
      <path d="M32 28 L32 40 C32 56 108 64 200 64 C292 64 368 56 368 40 L368 28Z" fill="#A92416" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="200" cy="28" rx="168" ry="22" fill="#E2412F" stroke={INK} strokeWidth={SW} />
      <ellipse cx="200" cy="28" rx="128" ry="14" fill="#F2705A" />
      {[-90, -30, 30, 90].map((dx) => (
        <ellipse key={dx} cx={200 + dx} cy="28" rx="16" ry="6" fill="#FFD3B8" />
      ))}
    </svg>
  );
}

export function Onion({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 54" aria-hidden="true">
      <ellipse cx="150" cy="26" rx="112" ry="18" fill="none" stroke={INK} strokeWidth="14" />
      <ellipse cx="150" cy="26" rx="112" ry="18" fill="none" stroke="#C88BC9" strokeWidth="7" />
      <ellipse cx="262" cy="28" rx="104" ry="17" fill="none" stroke={INK} strokeWidth="14" />
      <ellipse cx="262" cy="28" rx="104" ry="17" fill="none" stroke="#F5E4F2" strokeWidth="7" />
    </svg>
  );
}

export function Cheese({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 110" aria-hidden="true">
      <path
        d="M8 42 L200 8 L392 42 L380 52 C376 70 366 78 362 62 L330 62 L222 82 C220 104 202 108 198 86 L160 82 L60 62 C52 80 40 78 36 58 Z"
        fill="#FFBE2E" stroke={INK} strokeWidth={SW} strokeLinejoin="round"
      />
      <path d="M40 44 L200 16 L360 44 L200 70 Z" fill="#FFD460" />
    </svg>
  );
}

export function Patty({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 110" aria-hidden="true">
      <path d="M16 36 L16 70 C16 92 100 104 200 104 C300 104 384 92 384 70 L384 36Z" fill="#5A2814" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="200" cy="36" rx="184" ry="28" fill="#7E3D1F" stroke={INK} strokeWidth={SW} />
      {[60, 110, 165, 225, 280, 330].map((x, i) => (
        <circle key={x} cx={x} cy={70 + (i % 2) * 10} r="4" fill="#3B180A" />
      ))}
      {[-110, -40, 30, 100].map((dx) => (
        <path key={dx} d={`M${170 + dx} 22 l52 26`} stroke="#3B180A" strokeWidth="7" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function BunBottom({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 90" aria-hidden="true">
      <path d="M26 30 L30 60 C34 80 110 86 200 86 C290 86 366 80 370 60 L374 30Z" fill="#E39A35" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="200" cy="30" rx="174" ry="22" fill="#F7DDAA" stroke={INK} strokeWidth={SW} />
      <path d="M40 70 C100 84 300 84 360 70" fill="none" stroke="#B96E1F" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function Fries({ className }: ArtProps) {
  const sticks: [number, number, number][] = [
    [48, 40, -12], [70, 18, -5], [92, 30, 2], [114, 10, 6], [136, 34, 12], [80, 52, -2], [124, 50, 8], [58, 64, -14], [146, 62, 16],
  ];
  return (
    <svg className={className} viewBox="0 0 200 250" aria-hidden="true">
      {sticks.map(([x, y, r], i) => (
        <rect key={i} x={x} y={y} width="18" height="130" rx="4" transform={`rotate(${r} ${x + 9} ${y + 130})`} fill={i % 3 ? "#FFC94A" : "#F2AE2E"} stroke={INK} strokeWidth="4" />
      ))}
      <path d="M22 112 L178 112 L160 242 L40 242 Z" fill="#2B4A42" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M22 112 Q100 140 178 112" fill="#3C6157" stroke={INK} strokeWidth="4" />
      <circle cx="100" cy="186" r="26" fill="#FBE6D6" stroke={INK} strokeWidth="4" />
      <path d="M100 168 C112 180 110 192 100 202 C90 192 88 180 100 168Z" fill="#B82E1B" />
    </svg>
  );
}

export function Skewer({ className }: ArtProps) {
  const chunks = [
    { x: 70, fill: "#7E3D1F", side: "#5A2814", w: 44 },
    { x: 122, fill: "#5DB437", side: "#3F8C26", w: 26 },
    { x: 156, fill: "#7E3D1F", side: "#5A2814", w: 44 },
    { x: 208, fill: "#E2412F", side: "#A92416", w: 28 },
    { x: 244, fill: "#7E3D1F", side: "#5A2814", w: 44 },
    { x: 296, fill: "#F5E4F2", side: "#C88BC9", w: 22 },
  ];
  return (
    <svg className={className} viewBox="0 0 380 120" aria-hidden="true">
      <path d="M8 60 L372 60" stroke={INK} strokeWidth="12" strokeLinecap="round" />
      <path d="M8 60 L372 60" stroke="#C99A62" strokeWidth="6" strokeLinecap="round" />
      {chunks.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="26" width={c.w} height="70" rx="10" fill={c.side} stroke={INK} strokeWidth="4" />
          <rect x={c.x} y="22" width={c.w - 8} height="64" rx="9" fill={c.fill} stroke={INK} strokeWidth="4" />
          {c.fill === "#7E3D1F" && (
            <>
              <path d={`M${c.x + 8} 40 l${c.w - 22} 12`} stroke="#3B180A" strokeWidth="5" strokeLinecap="round" />
              <path d={`M${c.x + 8} 60 l${c.w - 22} 12`} stroke="#3B180A" strokeWidth="5" strokeLinecap="round" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

export function Shake({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 160 260" aria-hidden="true">
      <path d="M96 8 L82 110" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M96 8 L82 110" stroke="#B82E1B" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 8" />
      <path d="M34 92 C30 66 56 52 80 60 C96 40 132 54 126 82 C140 88 140 108 126 112 L36 112 C20 108 22 94 34 92Z" fill="#FFF3DA" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="84" cy="50" r="11" fill="#B82E1B" stroke={INK} strokeWidth="4" />
      <path d="M28 112 L132 112 L116 250 L44 250 Z" fill="#9FD6A4" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M34 140 L126 140" stroke={INK} strokeWidth="4" />
      <path d="M40 180 L120 180" stroke="#6FB37B" strokeWidth="10" />
    </svg>
  );
}

export function MiniBurger({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 110" aria-hidden="true">
      <path d="M10 50 C10 20 34 8 60 8 C86 8 110 20 110 50Z" fill="#E39A35" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      {[[40, 26], [60, 20], [80, 26], [50, 38], [72, 38]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2.2" fill="#FFF3DA" />
      ))}
      <path d={wavyEllipse(60, 56, 54, 7, 9, 0.06)} fill="#5DB437" stroke={INK} strokeWidth="3.5" />
      <path d="M8 62 L112 62 L104 74 L60 80 L16 74Z" fill="#FFBE2E" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="8" y="70" width="104" height="16" rx="8" fill="#7E3D1F" stroke={INK} strokeWidth="4" />
      <path d="M10 90 L110 90 L106 100 C100 104 20 104 14 100Z" fill="#E39A35" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function TakeoutBase({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 600 260" aria-hidden="true">
      <path d="M20 20 L580 20 L548 250 L52 250 Z" fill="#F3E4C8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <path d="M20 20 L580 20 L572 70 L28 70 Z" fill="#E7D2AC" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M90 250 L80 90 M510 250 L520 90" stroke="#D8C096" strokeWidth="4" />
    </svg>
  );
}

export function TakeoutLid({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 640 230" aria-hidden="true">
      <path d="M40 210 L74 30 C78 16 90 10 104 10 L536 10 C550 10 562 16 566 30 L600 210 Z" fill="#FBF0DB" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <path d="M10 210 L630 210 L622 226 L18 226 Z" fill="#E7D2AC" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M150 52 L490 52" stroke="#E7D2AC" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Sesame({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 40 24" aria-hidden="true">
      <ellipse cx="20" cy="12" rx="16" ry="8" fill="#FFF3DA" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Spark({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2Z" fill="#FBE6D6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function Pickle({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden="true">
      <circle cx="30" cy="30" r="26" fill="#7DAA3A" stroke={INK} strokeWidth="4" />
      <circle cx="30" cy="30" r="17" fill="#B6D46A" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={30 + Math.cos((a * Math.PI) / 180) * 9} cy={30 + Math.sin((a * Math.PI) / 180) * 9} r="2.6" fill="#E6F0B8" />
      ))}
    </svg>
  );
}

export function TomatoSlice({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 70 70" aria-hidden="true">
      <circle cx="35" cy="35" r="31" fill="#E2412F" stroke={INK} strokeWidth="4" />
      <circle cx="35" cy="35" r="22" fill="#F2705A" />
      {[0, 90, 180, 270].map((a) => (
        <ellipse key={a} cx={35 + Math.cos((a * Math.PI) / 180) * 12} cy={35 + Math.sin((a * Math.PI) / 180) * 12} rx="5" ry="3" transform={`rotate(${a} ${35 + Math.cos((a * Math.PI) / 180) * 12} ${35 + Math.sin((a * Math.PI) / 180) * 12})`} fill="#FFD3B8" />
      ))}
      <circle cx="35" cy="35" r="4" fill="#FFD3B8" />
    </svg>
  );
}
