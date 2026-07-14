"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * LazyMotion + MotionConfig wrapper. Cuts initial JS by only loading
 * features we actually use, and respects reduced-motion automatically.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
