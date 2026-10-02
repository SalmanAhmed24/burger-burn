/* Server components. Only the booking buttons are interactive. */

import { locations } from "@/lib/content";
import { Fries, MiniBurger, Shake } from "@/components/art/Ingredients";
import { BookButton } from "@/components/BookButton";
import { Wordmark } from "@/components/Wordmark";

/* ---------- Locations ---------- */

export function Locations() {
  return (
    <section id="locations" className="locations" aria-labelledby="loc-title">
      <h2 id="loc-title" className="locations__title">Find a grill</h2>
      <ul className="locations__grid">
        {locations.map((l) => (
          <li key={l.name} className="loc">
            <h3 className="loc__name">{l.name}</h3>
            <p className="loc__addr">{l.address}</p>
            <p className="loc__hours">{l.hours}</p>
            <p className="loc__note">{l.note}</p>
            <div className="loc__actions">
              <a
                className="btn btn--outline"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions<span className="sr-only"> to {l.name} (opens in a new tab)</span>
              </a>
              <BookButton className="btn btn--dark">Book a table<span className="sr-only"> at {l.name}</span></BookButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Booking call to action ---------- */

export function BookCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <h2 id="cta-title" className="cta__title">
        <span>Pull up</span>
        <span>a chair.</span>
      </h2>
      <p className="cta__text">Groups of up to 12 can book. Walk-ins are always welcome at the counter.</p>
      <BookButton className="btn btn--lime btn--lg">Book a table</BookButton>
      <MiniBurger className="cta__float cta__float--a" />
      <Shake className="cta__float cta__float--b" />
      <Fries className="cta__float cta__float--c" />
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Wordmark className="wordmark--xl" />
        </div>
        <nav className="footer__col" aria-label="Explore">
          <h2>Explore</h2>
          <a href="#menu">Menu</a>
          <a href="#how">How we cook</a>
          <a href="#locations">Locations</a>
        </nav>
        <div className="footer__col">
          <h2>Visit</h2>
          <p>Kitchens open daily from noon.</p>
          <a href="mailto:hello@bunfire.example">hello@bunfire.example</a>
        </div>
        <nav className="footer__col" aria-label="Social">
          <h2>Follow</h2>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
        </nav>
      </div>
      <div className="footer__bar">
        <p>© {new Date().getFullYear()} Bunfire Burger &amp; Grill</p>
        <p>Allergen info available at every counter.</p>
      </div>
    </footer>
  );
}

