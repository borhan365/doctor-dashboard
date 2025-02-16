import { Metadata } from "next";
import Link from "next/link";
import BenefitSection from "./sections/Benefit.Section";
import CreateProfileSteps from "./sections/CreateProfileSteps";
import FeatureSection from "./sections/Feature.Section";
import FeatureSteps from "./sections/FeatureSteps";
import HeroSection from "./sections/Hero.Section";
import { PricingSection } from "./sections/Pricing.Section";
import TestimonialSection from "./sections/Testimonial.Section";
import WhyChooseUs from "./sections/WhyChooseUs";

// Add metadata for SEO
export const metadata: Metadata = {
  title: "For Doctors | Transform Your Medical Practice - Healtha",
  description:
    "Join thousands of doctors revolutionizing healthcare delivery through our comprehensive digital platform. Expand your reach, streamline your practice, and enhance patient care.",
  keywords:
    "doctors platform, medical practice management, healthcare digitalization, doctor registration",
  openGraph: {
    title: "For Doctors | Transform Your Medical Practice - Healtha",
    description:
      "Join thousands of doctors revolutionizing healthcare delivery through our comprehensive digital platform.",
    images: [
      {
        url: "/assets/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Healtha For Doctors",
      },
    ],
  },
};

export default function DoctorLanding() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Global decorative elements */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Benefits Section */}
      <BenefitSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Features Grid */}
      <FeatureSteps />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Steps Section */}
      <CreateProfileSteps />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-blue-600 px-4 py-20 dark:bg-blue-500 sm:py-32">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="absolute aspect-square w-full max-w-xl rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to grow your practice?
                <br />
                Join Healtha today.
              </h2>
              <p className="text-lg text-white/90">
                Join hundreds of healthcare professionals who are already
                experiencing the benefits of our platform.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Link
                href="/for-doctors/register"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gradient-to-r from-[#fff8] to-transparent opacity-30 transition-transform duration-300 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Get Started Today
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
