"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";

type Cat = { id: string; label: string };

/* Sticky category bar for the menu page. Plain anchor links (work without JS);
   an IntersectionObserver marks whichever section is in view, and the pill
   slides between them with a Framer Motion shared layout animation. */
export function MenuNav({ cats }: { cats: Cat[] }) {
  const [active, setActive] = useState(cats[0].id);

  useEffect(() => {
    const els = cats.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      // A thin band just below the sticky header decides which section is "current".
      { rootMargin: "-30% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cats]);

  return (
    <nav className="mnav" aria-label="Menu sections">
      <ul className="mnav__list">
        {cats.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="mnav__link"
              aria-current={active === c.id ? "true" : undefined}
              onClick={() => setActive(c.id)}
            >
              {active === c.id && (
                <m.span layoutId="mnav-pill" className="mnav__pill" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
              )}
              <span className="mnav__text">{c.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
