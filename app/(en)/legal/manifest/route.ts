import manifest from "@/legal/manifest.json";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(manifest, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
