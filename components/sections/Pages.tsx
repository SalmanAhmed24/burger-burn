/* Server-rendered sections for the inner pages and the home-page teasers.
   Everything here is static HTML; only MenuNav and BookButton hydrate. */

import Link from "next/link";
import { menu, locations } from "@/lib/content";
import { Fries, MiniBurger, Shake, Skewer, Spark } from "@/components/art/Ingredients";
import { BunLine, FlameLine, SauceLine, SteakLine } from "@/components/art/LineArt";
import { MenuNav } from "@/components/MenuNav";
import { BookButton } from "@/components/BookButton";

const artFor = { burger: MiniBurger, skewer: Skewer, fries: Fries, shake: Shake };

/* ---------- Full menu (menu page) ---------- */

export function FullMenu() {
  return (
    <div className="fmenu">
      <MenuNav cats={menu.map(({ id, label }) => ({ id, label }))} />
      {menu.map((cat, ci) => {
        const Art = artFor[cat.art];
        return (
          <section key={cat.id} id={cat.id} className="fmenu__cat" aria-labelledby={`${cat.id}-title`}>
            <div className="fmenu__side">
              <p className="fmenu__num" aria-hidden="true">0{ci + 1}</p>
              <h2 id={`${cat.id}-title`} className="fmenu__title">{cat.label}</h2>
              <div className={`fmenu__art fmenu__art--${ci % 2 ? "green" : "red"}`} aria-hidden="true">
                <Art />
                <Spark className="fmenu__spark" />
              </div>
            </div>
            <ul className="fmenu__list">
              {cat.items.map((item) => (
                <li key={item.name} className="dish">
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
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p className="fmenu__note">
        Tell us about any allergies when you order. Our full allergen chart is available at every counter, and most burgers
        can be made with a lettuce wrap or the mushroom patty.
      </p>
    </div>
  );
}

/* ---------- Menu teaser (home) ---------- */

export function MenuTeaser() {
  const picks = menu.map((cat) => ({ cat, item: cat.items.find((i) => i.tag) ?? cat.items[0] }));
  return (
    <section className="teaser" aria-labelledby="teaser-title">
      <div className="teaser__head">
        <h2 id="teaser-title" className="teaser__title">
          <span>Order</span>
          <span>these first</span>
        </h2>
        <Link className="btn btn--dark btn--lg" href="/menu">See the full menu</Link>
      </div>
      <ul className="teaser__grid">
        {picks.map(({ cat, item }, i) => {
          const Art = artFor[cat.art];
          return (
            <li key={cat.id} className="pick">
              <Link href={`/menu#${cat.id}`} className="pick__link">
                <div className={`pick__art pick__art--${i % 2 ? "green" : "red"}`} aria-hidden="true">
                  <Art />
                </div>
                <p className="pick__cat">{cat.label}</p>
                <h3 className="pick__name">{item.name}</h3>
                <p className="pick__desc">{item.description}</p>
                <p className="pick__price">${item.price}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Locations teaser (home) ---------- */

export function LocationsTeaser() {
  return (
    <section className="lteaser" aria-labelledby="lteaser-title">
      <h2 id="lteaser-title" className="lteaser__title">Three grills, one fire</h2>
      <ul className="lteaser__list">
        {locations.map((l) => (
          <li key={l.name}>
            <Link href="/locations" className="lteaser__row">
              <span className="lteaser__name">{l.name}</span>
              <span className="lteaser__addr">{l.address}</span>
              <span className="lteaser__hours">{l.hours}</span>
              <span className="lteaser__arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Process timeline (how we cook) ---------- */

const day = [
  { time: "06:00", title: "Grind", Art: SteakLine, text: "Chuck and brisket come in whole. We trim and grind them each morning, and anything left at close goes to staff meals, never tomorrow's burgers." },
  { time: "09:00", title: "Bake", Art: BunLine, text: "Milk buns are mixed, proved and baked in our kitchen. Nothing added to stretch their shelf life, because they don't need one." },
  { time: "11:00", title: "Stir", Art: SauceLine, text: "Fire sauce, burnt-end jam, lime crema and the rest are made in small pots by hand, tasted, and labelled with the hour they were made." },
  { time: "12:00", title: "Light", Art: FlameLine, text: "The charcoal goes in an hour before we open. Skewers and chicken go over the coals; burgers are smashed on the plancha right beside them." },
];

export function Process() {
  return (
    <section className="process" aria-labelledby="process-title">
      <h2 id="process-title" className="process__title">
        <span>A day at</span>
        <span>the grill</span>
      </h2>
      <ol className="process__grid">
        {day.map(({ time, title, Art, text }) => (
          <li key={time} className="pstep">
            <p className="pstep__time">{time}</p>
            <div className="pstep__art" aria-hidden="true"><Art /></div>
            <h3 className="pstep__title">{title}</h3>
            <p className="pstep__text">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Good to know (locations) ---------- */

const faqs = [
  { q: "Do I need to book?", a: "No. Walk-ins are always welcome at the counter. Booking is worth it for groups or Friday and Saturday evenings." },
  { q: "How big a group can you seat?", a: "Up to 12 through the booking form. For bigger groups or a private room at Old Market, email us and we'll sort it out." },
  { q: "Can I order for collection?", a: "Yes, every location takes collection orders. Station Square is set up for it, with a fast counter and short waits." },
  { q: "Do you cater for allergies?", a: "Tell us when you order. Our allergen chart is at every counter, and most burgers can come in a lettuce wrap or with the mushroom patty." },
];

export function GoodToKnow() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq__title">Good to know</h2>
      <div className="faq__list">
        {faqs.map(({ q, a }) => (
          <details key={q} className="faq__item">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <div className="faq__cta">
        <p>Still got a question?</p>
        <a className="btn btn--outline" href="mailto:hello@bunfire.example">Email us</a>
        <BookButton className="btn btn--dark">Book a table</BookButton>
      </div>
    </section>
  );
}
