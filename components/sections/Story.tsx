/* Server components: all of this markup renders to HTML and never hydrates.
   Motion is layered on by the small client wrappers in components/motion. */

import Link from "next/link";
import { DrawMotion, IntroMotion, RibbonMotion, WordsMotion } from "@/components/motion/Reveal";
import {
  BunBottom, BunTop, Cheese, Fries, Lettuce, MiniBurger, Patty, Pickle, Shake, Skewer, Spark, Tomato,
} from "@/components/art/Ingredients";
import { BunLine, FlameLine, SauceLine, SteakLine } from "@/components/art/LineArt";

/* ---------- Intro: split layout like a menu cover ---------- */

export function Intro() {
  return (
    <IntroMotion className="intro" aria-labelledby="intro-title">
      <div className="intro__text">
        <h2 id="intro-title" className="intro__title">
          <span className="intro__mask intro__mask--a"><span className="intro__line">Fresh beef.</span></span>
          <span className="intro__mask intro__mask--b"><span className="intro__line">Real coal.</span></span>
          <span className="intro__mask intro__mask--c"><span className="intro__line">No shortcuts.</span></span>
        </h2>
        <p className="intro__script">and plenty of napkins</p>
        <div className="intro__body">
          <p>
            <strong>Bunfire started as one grill at the Old Market in 2011.</strong> The idea hasn&apos;t changed: buy
            good beef, grind it the morning we cook it, and let real charcoal do the rest.
          </p>
          <p>
            Every burger is smashed to order, so it reaches you crisp at the edges and juicy in the middle. The grill
            side of the menu gets the same care, from chicken skewers to lamb kofta.
          </p>
          <Link className="link-arrow" href="/menu">Read the full menu</Link>
        </div>
      </div>

      <div className="intro__visual">
        <div className="intro__panel">
          <div className="intro__plate" aria-hidden="true">
            <div className="stack">
              <BunTop className="stack__l" />
              <Lettuce className="stack__l" />
              <Tomato className="stack__l" />
              <Cheese className="stack__l" />
              <Patty className="stack__l" />
              <Cheese className="stack__l" />
              <Patty className="stack__l" />
              <BunBottom className="stack__l" />
            </div>
            <Fries className="intro__fries" />
            <Pickle className="intro__pickle" />
            <Spark className="intro__spark" />
          </div>
          <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" />
            </defs>
            <circle cx="100" cy="100" r="96" />
            <text>
              <textPath href="#badge-circle" textLength="446" lengthAdjust="spacing">ground fresh daily ✶ cooked over coal ✶</textPath>
            </text>
          </svg>
        </div>
      </div>
    </IntroMotion>
  );
}

/* ---------- Tilted ribbon marquee, speeds up with scroll velocity ---------- */

const ribbon = [
  { text: ["Smash", "burgers"], Art: MiniBurger },
  { text: ["Off the", "grill"], Art: Skewer },
  { text: ["Hand-cut", "fries"], Art: Fries },
  { text: ["Thick", "shakes"], Art: Shake },
];

export function Ribbon() {
  const group = (hidden: boolean) => (
    <div className="ribbon__group" aria-hidden={hidden || undefined}>
      {ribbon.map(({ text, Art }) => (
        <span className="ribbon__item" key={text.join(" ")}>
          <span className="ribbon__text">
            <span>{text[0]}</span>
            <span>{text[1]}</span>
          </span>
          <span className="ribbon__art"><Art /></span>
        </span>
      ))}
    </div>
  );

  return (
    <RibbonMotion className="ribbon">
      <div className="ribbon__band">
        <div className="ribbon__track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </RibbonMotion>
  );
}

/* ---------- Promise grid with line illustrations that draw in ---------- */

const promises = [
  { title: "Beef ground fresh every morning", Art: SteakLine },
  { title: "Buns baked here, nothing added", Art: BunLine },
  { title: "Every sauce made by hand", Art: SauceLine },
  { title: "Cooked over real charcoal", Art: FlameLine },
];

export function Promises() {
  return (
    <DrawMotion id="how" className="promises" aria-labelledby="how-title">
      <h2 id="how-title" className="sr-only">How we cook</h2>
      <ul className="promises__grid">
        {promises.map(({ title, Art }) => (
          <li className="promise" key={title}>
            <h3 className="promise__title">{title}</h3>
            <div className="promise__art"><Art /></div>
          </li>
        ))}
      </ul>
    </DrawMotion>
  );
}

/* ---------- Statement band: words light up as you scroll ---------- */

const statement = "We cook every burger to order, on a real flame, for whoever walks through the door.";

export function Statement() {
  return (
    <WordsMotion className="statement">
      <p className="statement__text">
        {statement.split(" ").map((word, i) => (
          <span className="statement__word" key={i}>
            {word}{" "}
          </span>
        ))}
      </p>
    </WordsMotion>
  );
}
