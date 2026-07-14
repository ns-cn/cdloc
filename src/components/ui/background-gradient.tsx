import { cn } from "@/lib/utils";

/**
 * Aceternity-style ambient background gradient.
 * Server component, zero JS. Drop behind hero / section content.
 */
export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(180, 83, 9, 0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(28, 25, 23, 0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30 dark:opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 20% 80%, rgba(254, 243, 199, 0.5), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(28,25,23,0.1), transparent)",
        }}
      />
    </div>
  );
}
