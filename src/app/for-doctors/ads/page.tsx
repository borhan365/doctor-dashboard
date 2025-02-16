import { Metadata } from "next";
import ContactSection from "./ui/Contact.Section";
import { FAQSection } from "./ui/FAQ.Section";
import { FeaturesSection } from "./ui/Features.Section";
import { HeroSection } from "./ui/Hero.Section";
import { PricingSection } from "./ui/Pricing.Section";
import { TestimonialSection } from "./ui/Testimonial.Section";
import WhyChooseUsSection from "./ui/WhyChooseUs.Section";
import BenefitsSection from "./ui/Benefits.Section";
import StepSection from "./ui/Step.Section";

export const metadata: Metadata = {
  title: "Best Digital Marketing Agency for Doctors in Bangladesh",
  description:
    "Reach more patients and grow your online presence with our comprehensive digital marketing strategies. Dominate the competition with tailor-made solutions designed specifically for doctors. Transform your practice's digital footprint with data-driven strategies and proven results.",
  openGraph: {
    title: "Best Digital Marketing Agency for Doctors in Bangladesh",
    description:
      "Reach more patients and grow your online presence with our comprehensive digital marketing strategies. Dominate the competition with tailor-made solutions designed specifically for doctors. Transform your practice's digital footprint with data-driven strategies and proven results.",
    images: [
      {
        url: "https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/672ca702e1349ca045eb752f_PNG%20image-p-800.png",
        width: 800,
        height: 600,
        alt: "Doctor Website Preview",
      },
    ],
  },
};

export default function AdsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeroSection />
      <WhyChooseUsSection />
      <BenefitsSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <StepSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}
