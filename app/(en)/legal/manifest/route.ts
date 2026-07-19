import manifest from "@/legal/manifest.json";

export function GET() {
  return Response.json(manifest, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
  });
}
