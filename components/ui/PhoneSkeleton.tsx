/* Branded skeleton screens for PhoneFrame — abstract client-app UI in the
   teal/sage palette, no text, so they need no translation and mirror
   correctly in RTL. Placeholders only: Pass C replaces them with real PWA
   captures. All decorative — render inside an aria-hidden container or give
   the parent an accessible label. */

export type PhoneScreen = "today" | "checkin" | "progress" | "plans" | "chat";

function Line({ className = "" }: { className?: string }) {
  return <div className={`rounded-pill bg-ink/10 ${className}`} />;
}

function Header() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-6 rounded-full bg-primary/20" />
      <Line className="h-2 w-16" />
      <div className="ms-auto size-5 rounded-full bg-ink/8" />
    </div>
  );
}

function BottomNav() {
  return (
    <div className="mt-auto flex items-center justify-around border-t border-ink/8 pt-2.5">
      <div className="size-2.5 rounded-full bg-primary" />
      <div className="size-2.5 rounded-full bg-ink/15" />
      <div className="size-2.5 rounded-full bg-ink/15" />
      <div className="size-2.5 rounded-full bg-ink/15" />
    </div>
  );
}

function TodayScreen() {
  return (
    <>
      <Header />
      {/* Dark "your program" card: title, two macro-target chips (dot +
          value bar, so they read as stats, not chat bubbles), and a
          full-width check-in CTA */}
      <div className="rounded-xl bg-primary-dark p-3">
        <Line className="h-1.5 w-12 bg-white/25" />
        <Line className="mt-2 h-2.5 w-20 bg-white/40" />
        <div className="mt-3 flex gap-1.5">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex flex-1 items-center gap-1.5 rounded-lg bg-white/10 px-2 py-1.5"
            >
              <div className="size-2 rounded-full bg-secondary/80" />
              <div className="h-1.5 flex-1 rounded-pill bg-white/30" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-6 w-full rounded-pill bg-secondary/70" />
      </div>
      {/* Today's task list: square checkbox tiles, one checked */}
      {[true, false].map((done, i) => (
        <div key={i} className="rounded-xl border border-ink/8 p-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`flex size-5 items-center justify-center rounded-md border ${
                done
                  ? "border-secondary-dark/40 bg-secondary-light"
                  : "border-ink/15 bg-bg"
              }`}
            >
              {done && <div className="size-2 rounded-sm bg-secondary-dark" />}
            </div>
            <div className="flex-1">
              <Line className="h-2 w-2/3" />
              <Line className="mt-1.5 h-1.5 w-1/3" />
            </div>
            <div className="h-5 w-9 rounded-pill bg-primary/15" />
          </div>
        </div>
      ))}
      <BottomNav />
    </>
  );
}

function CheckinScreen() {
  return (
    <>
      <Header />
      <Line className="h-2.5 w-24" />
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <Line className="h-1.5 w-14" />
          <div className="mt-1.5 h-7 rounded-lg border border-ink/10 bg-bg" />
        </div>
      ))}
      {/* Rating slider */}
      <div>
        <Line className="h-1.5 w-16" />
        <div className="relative mt-2 h-1.5 rounded-pill bg-ink/10">
          <div className="absolute inset-y-0 start-0 w-2/3 rounded-pill bg-secondary" />
          <div className="absolute -top-1 start-2/3 size-3.5 -translate-x-1/2 rounded-full border-2 border-surface bg-primary rtl:translate-x-1/2" />
        </div>
      </div>
      <div className="h-8 rounded-pill bg-primary" />
      <BottomNav />
    </>
  );
}

function ProgressScreen() {
  return (
    <>
      <Header />
      <div className="flex gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 rounded-xl border border-ink/8 p-2.5">
            <Line className="h-1.5 w-8" />
            <Line className="mt-2 h-3 w-12 bg-primary/25" />
          </div>
        ))}
      </div>
      {/* Trend chart */}
      <div className="rounded-xl border border-ink/8 p-2.5">
        <Line className="h-1.5 w-14" />
        <svg viewBox="0 0 100 44" className="mt-2 w-full" aria-hidden>
          <polyline
            points="2,12 22,16 42,15 62,26 82,30 98,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary"
          />
          {[2, 22, 42, 62, 82, 98].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[12, 16, 15, 26, 30, 36][i]}
              r="2.2"
              className="fill-secondary-dark"
            />
          ))}
        </svg>
      </div>
      {/* Adherence bars */}
      {[
        "w-4/5 bg-secondary",
        "w-2/3 bg-primary/40",
      ].map((cls) => (
        <div key={cls} className="h-1.5 rounded-pill bg-ink/8">
          <div className={`h-full rounded-pill ${cls}`} />
        </div>
      ))}
      <BottomNav />
    </>
  );
}

function PlansScreen() {
  return (
    <>
      <Header />
      <div className="flex gap-1.5">
        <div className="h-6 flex-1 rounded-pill bg-primary" />
        <div className="h-6 flex-1 rounded-pill bg-ink/8" />
        <div className="h-6 flex-1 rounded-pill bg-ink/8" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-ink/8 p-2.5">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary-light" />
            <div className="flex-1">
              <Line className="h-2 w-3/4" />
              <Line className="mt-1.5 h-1.5 w-1/2" />
            </div>
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="h-4 w-12 rounded-pill bg-secondary-light" />
            <div className="h-4 w-9 rounded-pill bg-ink/8" />
          </div>
        </div>
      ))}
      <BottomNav />
    </>
  );
}

function ChatScreen() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-2">
        <div className="h-9 w-3/4 self-start rounded-xl rounded-es-sm bg-ink/8" />
        <div className="h-7 w-2/3 self-end rounded-xl rounded-ee-sm bg-primary/80" />
        <div className="h-11 w-3/4 self-start rounded-xl rounded-es-sm bg-ink/8" />
        <div className="h-7 w-1/2 self-end rounded-xl rounded-ee-sm bg-primary/80" />
      </div>
      <div className="mt-auto flex items-center gap-2">
        <div className="h-8 flex-1 rounded-pill border border-ink/10 bg-bg" />
        <div className="size-8 rounded-full bg-primary" />
      </div>
      <BottomNav />
    </>
  );
}

const SCREENS: Record<PhoneScreen, () => React.ReactNode> = {
  today: TodayScreen,
  checkin: CheckinScreen,
  progress: ProgressScreen,
  plans: PlansScreen,
  chat: ChatScreen,
};

export default function PhoneSkeleton({ screen }: { screen: PhoneScreen }) {
  const Screen = SCREENS[screen];
  return (
    <div aria-hidden className="flex h-full flex-col gap-3 bg-surface p-3 pt-5">
      <Screen />
    </div>
  );
}
