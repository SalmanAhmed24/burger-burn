"use client";

import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { menu } from "@/lib/content";
import { Fries, MiniBurger, Shake, Skewer, Spark } from "@/components/art/Ingredients";
import { useBooking } from "@/components/Booking";

const artFor = { burger: MiniBurger, skewer: Skewer, fries: Fries, shake: Shake };

/* ---------- Menu with animated tabs ---------- */

export function MenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const reduce = useReducedMotion();
  const cat = menu.find((m) => m.id === active)!;
  const Art = artFor[cat.art];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + menu.length) % menu.length;
    setActive(menu[n].id);
    tabRefs.current[n]?.focus();
  };

  return (
    <section id="menu" className="menu" aria-labelledby="menu-title">
      <div className="menu__head">
        <h2 id="menu-title" className="menu__title">The menu</h2>
        <div className="menu__tabs" role="tablist" aria-label="Menu categories">
          {menu.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={c.id === active}
              aria-controls="menu-panel"
              tabIndex={c.id === active ? 0 : -1}
              className="menu__tab"
              onClick={() => setActive(c.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {c.id === active && (
                <m.span layoutId="tab-pill" className="menu__tab-pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
              )}
              <span className="menu__tab-text">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="menu__body" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <div className="menu__art" aria-hidden="true">
          <AnimatePresence mode="wait">
            <m.div
              key={cat.id}
              className="menu__art-inner"
              initial={reduce ? { opacity: 0 } : { y: 80, rotate: -12, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: -60, rotate: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <Art />
            </m.div>
          </AnimatePresence>
          <Spark className="menu__spark menu__spark--a" />
          <Spark className="menu__spark menu__spark--b" />
        </div>

        <AnimatePresence mode="wait">
          <m.ul
            key={cat.id}
            className="menu__list"
            initial="hide"
            animate="show"
            exit="hide"
            variants={{ show: { transition: { staggerChildren: 0.05 } }, hide: {} }}
          >
            {cat.items.map((item) => (
              <m.li
                key={item.name}
                className="dish"
                variants={{
                  hide: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="dish__top">
                  <h3 className="dish__name">{item.name}</h3>
                  <span className="dish__leader" aria-hidden="true" />
                  <span className="dish__price">
                    <span className="sr-only">Price </span>${item.price}
                  </span>
                </div>
                <p className="dish__desc">
                  {item.description}
                  {item.tag && <span className="dish__tag">{item.tag}</span>}
                </p>
              </m.li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Floating quick-action dock ---------- */

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { open } = useBooking();

  useMotionValueEvent(scrollY, "change", (y) => {
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    setShow(y > vh * 4.2 && y < docH - vh * 1.4);
  });

  return (
    <AnimatePresence>
      {show && (
        <m.nav
          className="dock"
          aria-label="Quick actions"
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <button className="dock__btn" onClick={open}>Book</button>
          <a className="dock__btn" href="#locations">Locations</a>
          <a className="dock__btn dock__btn--lime" href="#menu">Order now</a>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
