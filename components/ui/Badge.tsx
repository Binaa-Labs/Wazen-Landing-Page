export type BadgeTone = "primary" | "sage" | "error" | "success" | "glass";

type BadgeProps = {
  variant?: "eyebrow" | "pill";
  tone?: BadgeTone;
  /** Pulsing status dot, e.g. the hero "Free for your first 5 clients" pill */
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  eyebrow: "rounded-badge px-3 py-1 text-eyebrow uppercase",
  pill: "rounded-pill px-4 py-1.5 text-caption font-medium",
};

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary-light text-primary",
  sage: "bg-secondary-light text-secondary-dark",
  error: "border border-error-border bg-error-bg text-error",
  success: "border border-success-border bg-success-bg text-success",
  /* Over photography / dark hero (Phase 2) */
  glass: "border border-white/20 bg-white/10 text-white backdrop-blur-md",
};

export default function Badge({
  variant = "eyebrow",
  tone = "primary",
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        variantClasses[variant],
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dot && (
        <span
          aria-hidden
          className="size-2 animate-pulse rounded-full bg-success"
        />
      )}
      {children}
    </span>
  );
}
