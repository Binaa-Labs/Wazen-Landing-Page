/* Single source of truth for the brand mark in the page chrome (nav +
   footer).

   TODO(logo): the final Wazen logo (icon + wordmark SVG, multiple colorways)
   is in production. When it arrives, replace the interim "W" tile and text
   wordmark below with the SVG — this file is the only place to edit.
   TODO(logo): also swap the favicon/app icons (app/icon.tsx,
   app/apple-icon.tsx) to the final mark in the same change. */

type LogoProps = {
  /** "ink" for light surfaces (nav), "white" for dark surfaces (footer) */
  tone?: "ink" | "white";
};

export default function Logo({ tone = "ink" }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-base font-extrabold text-white"
      >
        W
      </span>
      <span className="flex flex-col gap-0.5">
        <span
          className={`font-display text-lg font-bold leading-none ${
            tone === "white" ? "text-white" : "text-ink"
          }`}
        >
          Wazen
        </span>
        <span
          className={`font-arabic text-[0.7rem] font-bold leading-none ${
            tone === "white" ? "text-secondary" : "text-primary"
          }`}
        >
          وازن
        </span>
      </span>
    </span>
  );
}
