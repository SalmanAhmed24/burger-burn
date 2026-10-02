"use client";

import { useBooking } from "./Booking";

export function BookButton({ className, children }: { className: string; children: React.ReactNode }) {
  const { open } = useBooking();
  return (
    <button className={className} onClick={open}>
      {children}
    </button>
  );
}
