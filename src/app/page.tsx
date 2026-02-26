"use client";

import Navbar from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ShowreelSection } from "../components/ShowreelSection";
import { SocialProofSection } from "../components/SocialProofSection";
import { ProcessStorySection } from "../components/ProcessStorySection";
import { ProductsHeader } from "../components/ProductsHeader";
import { BarberoXScene } from "../components/BarberoXScene";
import { FinalCTASection } from "../components/FinalCTASection";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ShowreelSection />
      <SocialProofSection />
      <ProcessStorySection />
      <ProductsHeader />
      <BarberoXScene />
      <FinalCTASection />
      <Footer />
    </main>
  );
}