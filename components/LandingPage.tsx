import { MotionConfig } from "framer-motion";

import ClientApp from "@/components/sections/ClientApp";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Nav from "@/components/sections/Nav";
import PhotoDivider from "@/components/sections/PhotoDivider";
import Pricing from "@/components/sections/Pricing";
import Problem from "@/components/sections/Problem";
import ProductProof from "@/components/sections/ProductProof";
import Segments from "@/components/sections/Segments";
import TrustBar from "@/components/sections/TrustBar";
import VideoTour from "@/components/sections/VideoTour";
import WhyWazen from "@/components/sections/WhyWazen";
import { SHOW_VIDEO_SECTION } from "@/lib/flags";

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Only surface that ever gets the transparent-over-photo nav (D24) */}
      <Nav variant="overHero" />
      <main id="top" className="flex-1">
        <Hero />
        {SHOW_VIDEO_SECTION && <VideoTour />}
        <ProductProof />
        <TrustBar />
        <Problem />
        <Features />
        {/* Photo divider ① (D30) — pure figure, not a section */}
        <PhotoDivider />
        <HowItWorks />
        <Segments />
        <ClientApp />
        <Pricing />
        <WhyWazen />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
