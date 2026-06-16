import { MotionConfig } from "framer-motion";

import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Nav from "@/components/sections/Nav";
import Pricing from "@/components/sections/Pricing";
import Problem from "@/components/sections/Problem";
import TrustBar from "@/components/sections/TrustBar";
import WhyWazen from "@/components/sections/WhyWazen";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="top" className="flex-1">
        <Hero />
        <TrustBar />
        <Problem />
        <Features />
        <HowItWorks />
        <Pricing />
        <WhyWazen />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
