"use client";

import { useRef, type ReactNode } from "react";
import { m, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style card with a gradient border that slowly orbits.
 * Wrap any content. Server-renderable children.
 */
export function MovingBorder({
  children,
  className,
  duration = 3000,
  borderRadius = "0.75rem",
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  borderRadius?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div
      className={cn("relative", className)}
      style={{ borderRadius }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx={borderRadius}
          ry={borderRadius}
        />
      </svg>
      <m.div
        style={{ transform }}
        className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.6),transparent_70%)] opacity-60 blur-md"
      />
      <div
        className="relative border border-border bg-card"
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
}
