type BrowserFrameProps = {
  url: string;
  className?: string;
  children: React.ReactNode;
};

export default function BrowserFrame({
  url,
  className,
  children,
}: BrowserFrameProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-3 border-b border-primary/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-[hsl(0,80%,63%)]" />
          <span className="size-3 rounded-full bg-[hsl(45,95%,55%)]" />
          <span className="size-3 rounded-full bg-[hsl(130,55%,55%)]" />
        </div>
        {/* Address bar stays LTR even in Arabic mode (RTL spec) */}
        <div
          dir="ltr"
          className="mx-auto w-full max-w-xs rounded-pill bg-bg px-4 py-1 text-caption text-ink/50"
        >
          {url}
        </div>
        <div className="w-12" aria-hidden />
      </div>
      {children}
    </div>
  );
}
