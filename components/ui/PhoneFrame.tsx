/* Phone chrome for client-app visuals — since Pass C.2a the content is real
   PWA captures (see PhoneShot); the frame itself stays purely presentational. */

type PhoneFrameProps = {
  className?: string;
  children: React.ReactNode;
};

export default function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[2rem] border-[5px] border-accent bg-surface shadow-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Punch-hole camera bar */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1.5 z-[1] h-[5px] w-12 -translate-x-1/2 rounded-pill bg-accent/80"
      />
      <div className="relative aspect-[9/19] w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
