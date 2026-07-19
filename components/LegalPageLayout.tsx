import Link from "next/link";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-body leading-relaxed text-ink/75">
        {children}
      </div>
    </section>
  );
}

const footerLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact Support", href: "mailto:admin@binaalabs.com" },
];

export function LegalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="font-display text-lg font-bold leading-none text-ink">
            Wazen
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="font-arabic text-[0.7rem] font-bold leading-none text-primary">
              وازن
            </span>
            <span className="text-[10px] leading-none text-ink/50">
              Powered by Binaa Lab
            </span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-ink/60 transition-colors hover:text-ink"
        >
          ← Back to home
        </Link>
      </div>
    </header>
  );
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  version,
  children,
}: {
  title: string;
  lastUpdated: string;
  version: string;
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" className="flex min-h-screen flex-col bg-bg text-ink">
      <LegalHeader />

      <main className="flex-1 px-6 py-14">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-h2 text-ink">{title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-caption text-ink/55">
              Effective: {lastUpdated} · Version {version}
            </p>
            <Link
              href="/legal/archive"
              className="inline-flex items-center rounded-pill border border-ink/15 px-3 py-1 text-caption font-medium text-ink/65 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              Previous versions
            </Link>
          </div>
          {children}
        </article>
      </main>

      <footer className="border-t border-ink/8 px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-caption text-ink/45">
            © 2026 Wazen by Binaa Lab. All rights reserved.
          </span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink/60 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
