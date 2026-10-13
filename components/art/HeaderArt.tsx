/* Compositions for the inner page headers, built from the same ingredient set. */

import { Fries, MiniBurger, Pickle, Shake, Skewer, Spark, TomatoSlice } from "./Ingredients";

const INK = "#1C332D";

export function MenuHeaderArt() {
  return (
    <div className="hart hart--menu">
      <MiniBurger className="hart__a" />
      <Fries className="hart__b" />
      <Shake className="hart__c" />
      <Spark className="hart__s1" />
      <Pickle className="hart__s2" />
    </div>
  );
}

export function GrillHeaderArt() {
  return (
    <div className="hart hart--grill">
      <svg className="hart__grill" viewBox="0 0 400 240">
        {/* coals */}
        <path d="M30 150 L370 150 L340 226 L60 226 Z" fill="#2B4A42" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[70, 120, 170, 220, 270, 320].map((x, i) => (
          <ellipse key={x} cx={x} cy={150 - (i % 2) * 4} rx="26" ry="14" fill={i % 2 ? "#FF8A3D" : "#E2412F"} stroke={INK} strokeWidth="4" />
        ))}
        {/* grate */}
        <path d="M20 128 L380 128" stroke={INK} strokeWidth="10" strokeLinecap="round" />
        {[60, 110, 160, 210, 260, 310, 350].map((x) => (
          <path key={x} d={`M${x} 118 L${x} 138`} stroke={INK} strokeWidth="5" strokeLinecap="round" />
        ))}
        {/* flames */}
        {[100, 200, 300].map((x, i) => (
          <path
            key={x}
            className="hart__flame"
            style={{ animationDelay: `${i * -0.4}s` }}
            d={`M${x} 40 C${x + 22} 66 ${x + 30} 82 ${x + 20} 104 C${x + 12} 120 ${x - 12} 120 ${x - 20} 104 C${x - 30} 84 ${x - 12} 70 ${x - 6} 56 C${x} 70 ${x + 4} 74 ${x + 2} 84 C${x + 12} 74 ${x + 8} 58 ${x} 40Z`}
            fill="#FFBE2E"
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <Skewer className="hart__skewer" />
      <Spark className="hart__s1" />
    </div>
  );
}

export function MapHeaderArt() {
  return (
    <div className="hart hart--map">
      <svg className="hart__map" viewBox="0 0 400 320">
        <path d="M20 40 L140 10 L260 40 L380 10 L380 280 L260 310 L140 280 L20 310 Z" fill="#FBE6D6" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M140 10 L140 280 M260 40 L260 310" stroke={INK} strokeWidth="3" strokeDasharray="8 8" />
        <path d="M40 210 C120 170 180 240 250 190 C300 154 340 170 370 140" fill="none" stroke="#9FD6A4" strokeWidth="18" strokeLinecap="round" />
        <path d="M60 80 L200 120 L340 70 M200 120 L210 290" fill="none" stroke="#F4D6C0" strokeWidth="10" strokeLinecap="round" />
        {[
          [90, 92],
          [210, 150],
          [320, 220],
        ].map(([x, y], i) => (
          <g key={i} className="hart__pin" style={{ animationDelay: `${i * 0.15}s` }}>
            <path d={`M${x} ${y} C${x - 24} ${y - 26} ${x - 24} ${y - 62} ${x} ${y - 62} C${x + 24} ${y - 62} ${x + 24} ${y - 26} ${x} ${y}Z`} fill="#B82E1B" stroke={INK} strokeWidth="4" />
            <circle cx={x} cy={y - 40} r="9" fill="#FBE6D6" stroke={INK} strokeWidth="3" />
          </g>
        ))}
      </svg>
      <TomatoSlice className="hart__s2" />
      <Spark className="hart__s1" />
    </div>
  );
}
