/* Server component: emits a JSON-LD <script> into the static HTML. Kept out
   of any "use client" tree so the structured data is present for crawlers
   without hydration. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
