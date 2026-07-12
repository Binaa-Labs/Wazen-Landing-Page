/* Pass C.1 placeholder for sourced photography. Renders a branded panel at
   the EXACT aspect ratio and position the final photo will use, labeled with
   its F-number from §7 of LANDING-AUDIT-PLAN.md so the owner can map sourced
   alternatives to slots from the preview. Pass C.2b replaced every placed
   instance with a real <Image>; currently unused, kept for the optional
   F-4/F-8 slots if they're ever sourced. */

type PhotoPlaceholderProps = {
  /** §7 slot id shown on the panel, e.g. "F-3" */
  label: string;
  /** Short owner-facing hint of the shot, e.g. "Coach + client training" */
  hint?: string;
  /** Aspect utility, e.g. "aspect-[3/2]" — omit for absolute-fill backdrop */
  aspect?: string;
  /** "light" = light sections · "dark" = dark teal sections */
  tone?: "light" | "dark";
  className?: string;
};

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.4-2h6.2L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export default function PhotoPlaceholder({
  label,
  hint,
  aspect,
  tone = "light",
  className,
}: PhotoPlaceholderProps) {
  const isDark = tone === "dark";
  return (
    <div
      aria-hidden
      className={[
        "relative overflow-hidden rounded-xl",
        aspect,
        isDark
          ? "border border-white/10 bg-gradient-to-br from-white/8 via-secondary/15 to-white/4"
          : "border border-primary/15 bg-gradient-to-br from-primary/15 via-secondary/25 to-primary/8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Subtle diagonal texture so the panel reads as "image goes here" */}
      <div
        className={`absolute inset-0 opacity-40 ${isDark ? "text-white/10" : "text-primary/10"}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <CameraIcon
          className={`size-7 ${isDark ? "text-white/50" : "text-primary/50"}`}
        />
        <span
          className={`rounded-pill px-3 py-1 text-caption font-semibold tracking-wide ${
            isDark ? "bg-white/15 text-white/90" : "bg-surface/90 text-primary"
          }`}
        >
          {label}
        </span>
        {hint && (
          <span
            className={`text-caption ${isDark ? "text-white/55" : "text-ink/50"}`}
          >
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}
