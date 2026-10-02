"use client";

import { useEffect, useRef } from "react";
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

export type GsapKit = { gsap: typeof GSAP; ScrollTrigger: typeof ST };
type Setup = (kit: GsapKit, root: HTMLElement) => void | (() => void);

/* GSAP is code-split and every section's setup runs in its own idle slice,
   one after another in mount order (hero first, so later triggers account for
   its pin). Nothing animation-related competes with first paint or hydration,
   and no single task gets long enough to block input. */

let queue: Promise<unknown> = Promise.resolve();

// Scroll animations activate on the visitor's first interaction (pointer move,
// touch, wheel, key or scroll), which always precedes reaching them. Until then
// the page shows its finished static layout, so first paint, hydration and
// input stay free of animation setup. Visitors who never interact pay nothing.
const activated =
  typeof window === "undefined"
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        const events = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
        const go = () => {
          events.forEach((e) => window.removeEventListener(e, go));
          resolve();
        };
        const arm = () => events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
        if (document.readyState === "complete") arm();
        else window.addEventListener("load", arm, { once: true });
        // Already scrolled (e.g. reload mid-page or an anchor link): start right away.
        if (window.scrollY > 0) resolve();
      });

const idle = () =>
  new Promise<void>((resolve) => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => resolve(), { timeout: 120 });
    else setTimeout(resolve, 16);
  });

// Fetch the GSAP chunk once the page has loaded so it's ready when needed.
let kitPromise: Promise<typeof import("./gsap")> | undefined;
const getKit = () => (kitPromise ??= import("./gsap"));
if (typeof window !== "undefined") {
  window.addEventListener("load", () => setTimeout(getKit, 0), { once: true });
}

export function useGsapIdle<T extends HTMLElement>(setup: Setup) {
  const ref = useRef<T>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    queue = queue.then(async () => {
      await activated;
      const kit = await getKit();
      await idle();
      if (cancelled || !ref.current) return;
      const mm = kit.gsap.matchMedia();
      let inner: void | (() => void);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        inner = setupRef.current(kit, ref.current!);
        return () => inner && inner();
      });
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return ref;
}
