"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useRef, useState } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapIdle } from "@/lib/useGsapIdle";
import {
  BunBottom, BunTop, Cheese, Fries, Lettuce, Onion, Patty, Pickle, Sesame, Skewer, Spark,
  TakeoutBase, TakeoutLid, Tomato, TomatoSlice,
} from "@/components/art/Ingredients";

/* Each layer: assembled top (in burger widths), exploded offset, tilt. */
const layers = [
  { key: "bunTop", vbH: 200, Art: BunTop, top: 0, ex: -0.42, r: -7, x: 0.04 },
  { key: "lettuce", vbH: 90, Art: Lettuce, top: 0.43, ex: -0.25, r: 5, x: -0.05 },
  { key: "tomato", vbH: 70, Art: Tomato, top: 0.5, ex: -0.12, r: -4, x: 0.06 },
  { key: "onion", vbH: 54, Art: Onion, top: 0.6, ex: -0.02, r: 6, x: -0.03 },
  { key: "cheese", vbH: 110, Art: Cheese, top: 0.62, ex: 0.08, r: -5, x: 0.05 },
  { key: "patty", vbH: 110, Art: Patty, top: 0.7, ex: 0.2, r: 4, x: -0.04 },
  { key: "bunBottom", vbH: 90, Art: BunBottom, top: 0.87, ex: 0.33, r: -3, x: 0.02 },
];

const deco = [
  { Art: Spark, left: "8%", top: "22%", size: 34, depth: 0.6 },
  { Art: Sesame, left: "18%", top: "70%", size: 30, depth: 1.2 },
  { Art: Pickle, left: "88%", top: "26%", size: 52, depth: 0.9 },
  { Art: TomatoSlice, left: "80%", top: "78%", size: 62, depth: 1.4 },
  { Art: Spark, left: "62%", top: "14%", size: 24, depth: 0.4 },
  { Art: Sesame, left: "46%", top: "86%", size: 26, depth: 1 },
  { Art: Spark, left: "94%", top: "60%", size: 28, depth: 0.7 },
  { Art: Pickle, left: "4%", top: "48%", size: 40, depth: 1.1 },
];

const steps = ["Stack the burger", "Add hot fries", "Off the grill", "Box it up"];
const stepAt = [0, 1.3, 2.4, 3.5]; // timeline times where each step begins
const TOTAL = 4.8;

export default function Hero() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [step, setStep] = useState(-1);
  const stepRef = useRef(-1);

  const root = useGsapIdle<HTMLElement>(({ gsap }, el) => {
      const q = gsap.utils.selector(el);
      // Prime GSAP's transform cache for every element up front: one style
      // recalc for all reads, instead of a forced recalc between each write.
      q(".layer, .deco__item, .meal, .meal__fries, .meal__skewer, .meal__base, .meal__lid, .meal__stamp, .hero__copy, .hero__steps, .hero__end, .hero__cue").forEach(
        (t) => gsap.getProperty(t, "x")
      );

      const syncStep = (t: number) => {
        let s = -1;
        if (t > 0.35) s = 0;
        for (let i = 1; i < stepAt.length; i++) if (t >= stepAt[i]) s = i;
        if (s !== stepRef.current) {
          stepRef.current = s;
          setStep(s);
        }
      };

      const vw = (n: number) => () => window.innerWidth * n;
      const vh = (n: number) => () => window.innerHeight * n;
      const wide = () => window.matchMedia("(min-width: 900px)").matches;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.4}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          // Step follows scroll position directly (not the smoothed timeline),
          // and is synced on refresh so it's right even if setup starts mid-scroll.
          onRefresh: (self) => syncStep(self.progress * TOTAL),
          onUpdate: (self) => {
            syncStep(self.progress * TOTAL);
            const playing = self.progress > 0.01;
            if (playing !== el.classList.contains("is-playing")) el.classList.toggle("is-playing", playing);
          },
        },
      });
      tlRef.current = tl;

      // Step 1: copy leaves, plate slides to centre, layers drop into a stack.
      tl.to(q(".hero__copy"), { yPercent: -18, opacity: 0, duration: 0.6, ease: "power1.in" }, 0)
        .to(q(".hero__cue"), { opacity: 0, duration: 0.2 }, 0)
        .fromTo(
          el,
          { "--mx": () => `${wide() ? window.innerWidth * 0.22 : 0}px`, "--my": () => `${window.innerHeight * (wide() ? 0.01 : 0.17)}px` },
          { "--mx": () => `${wide() ? window.innerWidth * 0.02 : 0}px`, "--my": () => `${window.innerHeight * (wide() ? 0.02 : -0.07)}px`, duration: 1 },
          0
        )
        .fromTo(
          q(".layer"),
          {
            // Offsets as a % of each layer's own box, so nothing is measured.
            y: 0, x: 0,
            yPercent: (i: number) => (layers[i].ex * 400 * 100) / layers[i].vbH,
            xPercent: (i: number) => layers[i].x * 100,
            rotation: (i: number) => layers[i].r,
          },
          { yPercent: 0, xPercent: 0, rotation: 0, duration: 0.9, ease: "back.out(1.6)", stagger: { each: 0.06, from: "end" } },
          0.15
        )
        .fromTo(q(".hero__steps"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.35)
        .to(q(".meal__burger"), { scaleY: 0.94, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: "50% 100%" }, 1.08);

      // Step 2: fries.
      tl.fromTo(q(".meal__fries"), { x: vw(0.6), y: vh(-0.2), rotation: 40, opacity: 1 }, { x: 0, y: 0, rotation: 8, duration: 0.9, ease: "back.out(1.3)" }, stepAt[1]);

      // Step 3: skewer swings in from the left.
      tl.fromTo(q(".meal__skewer"), { x: vw(-0.7), y: vh(-0.3), rotation: -70, opacity: 1 }, { x: 0, y: 0, rotation: -16, duration: 0.9, ease: "back.out(1.2)" }, stepAt[2]);

      // Step 4: the box closes around everything.
      tl.to(q(".meal"), { scale: 0.84, duration: 0.6, ease: "power2.inOut" }, stepAt[3])
        .to(el, { "--mx": () => `${wide() ? window.innerWidth * -0.03 : 0}px`, duration: 0.6 }, stepAt[3])
        .fromTo(q(".meal__base"), { y: vh(1) }, { y: 0, duration: 0.6, ease: "power3.out" }, stepAt[3])
        .fromTo(q(".meal__lid"), { y: vh(-1.1), rotation: -10 }, { y: 0, rotation: 0, duration: 0.6, ease: "bounce.out" }, stepAt[3] + 0.4)
        .fromTo(q(".meal__stamp"), { scale: 0, rotation: -30, x: 0, y: 0, xPercent: -50, yPercent: -50 }, { scale: 1, xPercent: -50, yPercent: -50, rotation: -8, duration: 0.3, ease: "back.out(3)" }, stepAt[3] + 0.95)
        .fromTo(q(".hero__end"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, stepAt[3] + 1)
        .to({}, { duration: TOTAL - (stepAt[3] + 1.3) });

      // Floating garnish drifts at its own depth through the whole story (one tween, eight targets).
      tl.to(
        q(".deco__item"),
        {
          y: (_i: number, t: HTMLElement) => -Number(t.dataset.depth) * 260,
          rotation: (_i: number, t: HTMLElement) => Number(t.dataset.depth) * 90,
          ease: "none",
          duration: TOTAL,
        },
        0
      );
  });

  const goToStep = (i: number) => {
    const st = tlRef.current?.scrollTrigger as ScrollTrigger | undefined;
    if (!st) return;
    const t = (stepAt[i] + (i === 0 ? 1.0 : 0.9)) / TOTAL;
    window.scrollTo({ top: st.start + (st.end - st.start) * t, behavior: "smooth" });
  };

  return (
    // GSAP's pin wraps the section in a spacer element. This React-owned wrapper
    // keeps that spacer inside a node React manages, so leaving the page can't
    // trip over DOM that React didn't create.
    <div className="hero-wrap">
    <section id="top" className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__deco" aria-hidden="true">
        {deco.map(({ Art, left, top, size, depth }, i) => (
          <span key={i} className="deco__item" data-depth={depth} style={{ left, top, width: size }}>
            <span className="deco__float" style={{ animationDelay: `${i * -0.7}s` }}>
              <Art />
            </span>
          </span>
        ))}
      </div>

      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          <span>Burgers</span>
          <span>built over</span>
          <span>fire.</span>
        </h1>
        <p className="hero__lede">
          Beef ground every morning, smashed when you order, finished on a charcoal grill.
        </p>
        <div className="hero__ctas">
          <Link className="btn btn--lime btn--lg" href="/menu">Order now</Link>
          <Link className="btn btn--cream-outline btn--lg" href="/menu">See the menu</Link>
        </div>
      </div>

      <div className="hero__meal" aria-hidden="true">
        <div className="meal">
          <div className="meal__skewer"><Skewer /></div>
          <div className="meal__burger">
            {layers.map(({ key, Art, top, ex, r, x }, i) => (
              <div
                key={key}
                className={`layer layer--${key}`}
                style={{ "--top": top, "--ex": ex, "--r": `${r}deg`, "--lx": x, zIndex: 20 - i } as React.CSSProperties}
              >
                <span className="layer__art" style={{ animationDelay: `${i * -0.35}s` }}>
                  <Art />
                </span>
              </div>
            ))}
          </div>
          <div className="meal__fries"><Fries /></div>
          <div className="meal__base"><TakeoutBase /></div>
          <div className="meal__lid">
            <TakeoutLid />
            <span className="meal__stamp">bunfire</span>
          </div>
        </div>
      </div>

      <div className="hero__steps">
        <h2 className="hero__steps-title">How your meal comes together</h2>
        <ol className="steps">
          {steps.map((label, i) => {
            const active = i === step;
            return (
              <li key={label}>
                <m.button
                  layout
                  className={`steps__pill${active ? " is-active" : ""}`}
                  onClick={() => goToStep(i)}
                  aria-current={active ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${label}`}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                >
                  <m.span layout="position" className="steps__num">{i + 1}</m.span>
                  <AnimatePresence initial={false}>
                    {active && (
                      <m.span
                        className="steps__label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {label}
                      </m.span>
                    )}
                  </AnimatePresence>
                </m.button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="hero__end">
        <p>Hot, boxed and out the door.</p>
        <Link className="btn btn--lime btn--lg" href="/menu">Order now</Link>
      </div>

      <div className="hero__cue" aria-hidden="true">
        <span>Scroll to build</span>
        <svg viewBox="0 0 24 36"><rect x="2" y="2" width="20" height="32" rx="10" /><circle cx="12" cy="11" r="3" /></svg>
      </div>
    </section>
    </div>
  );
}
