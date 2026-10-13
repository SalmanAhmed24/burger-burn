"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, ORDER_URL } from "@/lib/nav";
import { useBooking } from "./Booking";
import { Wordmark } from "./Wordmark";

const tickerItems = ["Smashed to order", "Grilled over real coal", "Sauces made here", "Open till late"];

export function Ticker() {
  const row = (
    <div className="ticker__row">
      {tickerItems.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}

const links = navLinks;

export function Header() {
  const [open, setOpen] = useState(false);
  const { open: openBooking } = useBooking();
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // Close the overlay whenever the route changes (link click, back button).
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <Ticker />
      <div className="nav">
        <button
          className="nav__menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__burger" aria-hidden="true">
            <m.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <m.span animate={open ? { opacity: 0 } : { opacity: 1 }} />
            <m.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </span>
          <span className="nav__label">{open ? "Close" : "Menu"}</span>
        </button>

        <Link href="/" className="nav__logo" aria-current={pathname === "/" ? "page" : undefined}>
          <Wordmark />
        </Link>

        <div className="nav__actions">
          <button className="btn btn--outline nav__book" onClick={openBooking}>Book a table</button>
          <Link className="btn btn--lime" href={ORDER_URL}>Order now</Link>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="site-menu"
            className="overlay"
            aria-label="Site"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              <m.li
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href="/" onClick={() => setOpen(false)} aria-current={pathname === "/" ? "page" : undefined}>
                  Home
                </Link>
              </m.li>
              {links.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === l.href ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </m.li>
              ))}
              <m.li
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + links.length * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <button onClick={() => { setOpen(false); openBooking(); }}>Book a table</button>
              </m.li>
            </ul>
            <p className="overlay__foot">Kitchen open daily from noon. Walk-ins always welcome.</p>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
