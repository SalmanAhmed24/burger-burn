"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { guestOptions, locations, timeOptions } from "@/lib/content";

type BookingCtx = { open: () => void };
const Ctx = createContext<BookingCtx>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{isOpen && <ReservationDialog onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

type Errors = Partial<Record<"name" | "phone" | "location" | "guests" | "date" | "time", string>>;

function ReservationDialog({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const today = new Date().toISOString().slice(0, 10);

  // Lock scroll, close on Escape, keep Tab inside the dialog.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const first = dialogRef.current?.querySelector<HTMLElement>("input, select, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(nodes).filter((n) => !n.hasAttribute("disabled"));
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter the name for the booking.";
    if (!/^[+\d][\d\s()-]{6,}$/.test(data.phone ?? "")) next.phone = "Enter a phone number we can text, digits only.";
    if (!data.location) next.location = "Choose a location.";
    if (!data.guests) next.guests = "Choose how many guests.";
    if (!data.date) next.date = "Choose a date.";
    if (!data.time) next.time = "Choose a time.";
    setErrors(next);
    if (Object.keys(next).length) {
      const firstBad = dialogRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      firstBad?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  const field = (name: keyof Errors) => ({
    name,
    id: `bk-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `bk-${name}-err` : undefined,
  });

  const Err = ({ name }: { name: keyof Errors }) =>
    errors[name] ? (
      <span className="bk__err" id={`bk-${name}-err`}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <m.div
      className="bk"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        ref={dialogRef}
        className="bk__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reduce ? { opacity: 0 } : { y: 60, rotate: -2, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <button className="bk__close" onClick={onClose} aria-label="Close booking form">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>

        <div className="bk__art" aria-hidden="true">
          <BookingArt />
        </div>

        <div className="bk__body">
          {status === "done" ? (
            <div className="bk__done" role="status">
              <h2 id={titleId} className="bk__title">Table requested.</h2>
              <p>We&apos;ll text you within the hour to confirm. If plans change, reply to that text and we&apos;ll move it.</p>
              <button className="btn btn--dark" onClick={onClose}>Back to the site</button>
            </div>
          ) : (
            <>
              <h2 id={titleId} className="bk__title">Book a table</h2>
              <p className="bk__lede">Tell us when you&apos;re coming. We&apos;ll keep the grill hot.</p>
              <form className="bk__form" onSubmit={onSubmit} noValidate>
                <label className="bk__field">
                  <span>Name</span>
                  <input {...field("name")} autoComplete="name" />
                  <Err name="name" />
                </label>
                <label className="bk__field">
                  <span>Phone number</span>
                  <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" />
                  <Err name="phone" />
                </label>
                <label className="bk__field">
                  <span>Location</span>
                  <select {...field("location")} defaultValue="">
                    <option value="" disabled>Choose one</option>
                    {locations.map((l) => <option key={l.name}>{l.name}</option>)}
                  </select>
                  <Err name="location" />
                </label>
                <label className="bk__field">
                  <span>Guests</span>
                  <select {...field("guests")} defaultValue="">
                    <option value="" disabled>How many?</option>
                    {guestOptions.map((g) => <option key={g}>{g}</option>)}
                  </select>
                  <Err name="guests" />
                </label>
                <div className="bk__row">
                  <label className="bk__field">
                    <span>Date</span>
                    <input {...field("date")} type="date" min={today} />
                    <Err name="date" />
                  </label>
                  <label className="bk__field">
                    <span>Time</span>
                    <select {...field("time")} defaultValue="">
                      <option value="" disabled>Pick</option>
                      {timeOptions.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <Err name="time" />
                  </label>
                </div>
                <label className="bk__check">
                  <input type="checkbox" name="consent" />
                  <span>Send me news about new burgers and offers. You can unsubscribe any time.</span>
                </label>
                {status === "failed" && (
                  <p className="bk__err" role="alert">The booking didn&apos;t go through. Check your connection and press Reserve again.</p>
                )}
                <button className="btn btn--dark bk__submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Reserving…" : "Reserve"}
                </button>
              </form>
            </>
          )}
        </div>
      </m.div>
    </m.div>
  );
}

function BookingArt() {
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="520" fill="#B82E1B" />
      <circle cx="200" cy="250" r="150" fill="#A8261A" />
      <g transform="translate(70 150) scale(0.65)">
        <path d="M18 158 C18 58 100 10 200 10 C300 10 382 58 382 158 Z" fill="#E39A35" stroke="#1C332D" strokeWidth="6" />
        <rect x="10" y="160" width="380" height="34" rx="14" fill="#5DB437" stroke="#1C332D" strokeWidth="6" />
        <path d="M6 200 L394 200 L370 228 L200 244 L30 228Z" fill="#FFBE2E" stroke="#1C332D" strokeWidth="6" strokeLinejoin="round" />
        <rect x="14" y="226" width="372" height="58" rx="26" fill="#7E3D1F" stroke="#1C332D" strokeWidth="6" />
        <path d="M24 292 L376 292 L366 330 C340 346 60 346 34 330Z" fill="#E39A35" stroke="#1C332D" strokeWidth="6" strokeLinejoin="round" />
      </g>
      <g fill="#FBE6D6" stroke="#1C332D" strokeWidth="3">
        <path d="M60 80 C62 92 66 96 78 98 C66 100 62 104 60 116 C58 104 54 100 42 98 C54 96 58 92 60 80Z" />
        <path d="M330 420 C332 432 336 436 348 438 C336 440 332 444 330 456 C328 444 324 440 312 438 C324 436 328 432 330 420Z" />
      </g>
    </svg>
  );
}
