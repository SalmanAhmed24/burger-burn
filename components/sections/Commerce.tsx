"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ORDER_URL } from "@/lib/nav";
import { useBooking } from "@/components/Booking";


/* ---------- Floating quick-action dock ---------- */

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { open } = useBooking();
  const pathname = usePathname();

  // Home has the pinned hero story, so the dock waits until it's finished.
  const update = (y: number) => {
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const start = pathname === "/" ? vh * 4.2 : vh * 0.6;
    setShow(y > start && y < docH - vh * 1.4);
  };
  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => update(window.scrollY), [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <Link className="dock__btn" href="/locations" aria-current={pathname === "/locations" ? "page" : undefined}>Locations</Link>
          <Link className="dock__btn dock__btn--lime" href={ORDER_URL}>Order now</Link>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
