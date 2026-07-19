import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeader } from "@/components/LegalPageLayout";
import { getLegalVersions } from "@/legal/registry";

export const metadata: Metadata = {
  title: "Legal document archive | Wazen",
  robots: { index: false, follow: true },
};

export default function LegalArchivePage() {
  const groups = [
    { title: "Terms of Service", type: "terms" as const },
    { title: "Privacy Notices", type: "privacy" as const },
  ];

  return (
    <div dir="ltr" className="flex min-h-screen flex-col bg-bg text-ink">
      <LegalHeader />
      <main className="flex-1 px-6 py-14">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-h2">Legal document archive</h1>
          <p className="mt-3 text-ink/65">
            Published versions are retained so the exact document applicable at a
            given time remains available.
          </p>
          {groups.map((group) => (
            <section key={group.type} className="mt-10">
              <h2 className="font-display text-xl font-semibold">{group.title}</h2>
              <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10">
                {getLegalVersions(group.type).map((document) => (
                  <li key={document.version} className="p-5">
                    <Link
                      href={`/legal/${group.type}/${document.version}`}
                      className="font-medium text-primary underline"
                    >
                      Version {document.version}
                    </Link>
                    <p className="mt-1 text-sm text-ink/60">
                      Effective{" "}
                      {new Date(document.effectiveAt).toLocaleDateString("en", {
                        dateStyle: "long",
                        timeZone: "UTC",
                      })}
                    </p>
                    <p className="mt-2 text-sm text-ink/70">
                      {document.changeSummary}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
