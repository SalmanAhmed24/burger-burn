"use client";

import { LazyMotion } from "framer-motion";

// Framer Motion's animation engine loads in a separate chunk after first paint.
const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
