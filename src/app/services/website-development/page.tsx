import { Metadata } from "next";
import { CTASection } from "../ui/CTA.Section";
import { FeaturesSection } from "../ui/Features.Section";
import ContactSection from "./ui/Contact.Section";
import { DemoSection } from "./ui/Demo.Section";
import { FAQSection } from "./ui/FAQ.Section";
import { HeroSection } from "./ui/Hero.Section";
import { PricingSection } from "./ui/Pricing.Section";
import { TestimonialSection } from "./ui/Testimonial.Section";

export const metadata: Metadata = {
  title: "Custom Doctor Websites | Build Your Online Presence Today",
  description:
    "Discover mobile-friendly, SEO-optimized doctor websites tailored to your practice. Simplify appointments, grow your online presence, and attract more patients!",
  openGraph: {
    title: "Custom Doctor Websites | Build Your Online Presence Today",
    description:
      "Discover mobile-friendly, SEO-optimized doctor websites tailored to your practice. Simplify appointments, grow your online presence, and attract more patients!",
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
      <DemoSection />
      <PricingSection />
      <FAQSection />
      <TestimonialSection />
      <ContactSection />
      <CTASection />
    </main>
  );
}
