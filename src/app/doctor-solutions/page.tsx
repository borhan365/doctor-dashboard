"use client";

import { FeaturesSection } from "./ui/Features.Section";

import { CTASection } from "./ui/CTA.Section";
import { HeroSection } from "./ui/Hero.Section";
import { ServicesSection } from "./ui/Services.Section";

export default function DoctorDigitalSolutions() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <CTASection />
    </main>
  );
}
