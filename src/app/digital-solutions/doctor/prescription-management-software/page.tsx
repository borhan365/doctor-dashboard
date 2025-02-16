import { Metadata } from "next";
import { HeroSection } from "./ui/Hero.Section";
import { FeaturesSection } from "../ui/Features.Section";
import { PricingSection } from "./ui/Pricing.Section";
import { CTASection } from "../ui/CTA.Section";
import { FAQSection } from "./ui/FAQ.Section";
import { TestimonialSection } from "./ui/Testimonial.Section";

export const metadata: Metadata = {
  title: "Prescription Management System | Doctor Digital Solutions",
  description: "Automate prescriptions and streamline your practice with our intelligent digital prescription system.",
};

export default function PrescriptionManagementSystem() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
