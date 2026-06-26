import JsonLd from "@/components/JsonLd";
import LandingPage from "@/components/LandingPage";
import { buildJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={buildJsonLd("en")} />
      <LandingPage />
    </>
  );
}
