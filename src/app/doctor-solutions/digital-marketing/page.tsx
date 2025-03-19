import { Metadata } from "next";
import { CTASection } from "../ui/CTA.Section";
import ContactSection from "./ui/Contact.Section";
import { FAQSection } from "./ui/FAQ.Section";
import { FeaturesSection } from "./ui/Features.Section";
import { HeroSection } from "./ui/Hero.Section";
import { PricingSection } from "./ui/Pricing.Section";
import { ServiceSection } from "./ui/Service.Section";
import { TechnologySection } from "./ui/Technology.Section";
import { TestimonialSection } from "./ui/Testimonial.Section";

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

export default function DoctorWebsites() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeroSection />
      <FeaturesSection />
      <ServiceSection />
      <PricingSection />
      <TechnologySection />
      <FAQSection />
      <TestimonialSection />
      <ContactSection />
      <CTASection />
    </main>
  );
}
