"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Info } from "lucide-react";
import Link from "next/link";

interface PricingTierProps {
  name: string;
  price: {
    oneTime: number;
    setup?: number;
  };
  description: string;
  features: Array<{
    text: string;
    tooltip?: string;
  }>;
  isPopular?: boolean;
  isEnterprise?: boolean;
}

const pricingTiers: PricingTierProps[] = [
  {
    name: "Starter",
    price: {
      oneTime: 15000,
    },
    description: "Perfect for solo practitioners starting their online journey",
    features: [
      {
        text: "Professional medical website",
        tooltip: "Mobile-friendly, customizable design",
      },
      {
        text: "Basic appointment form",
        tooltip: "Simple contact form for patient inquiries",
      },
      {
        text: "Local SEO optimization",
        tooltip: "Basic SEO setup for local visibility",
      },
      {
        text: "SSL security",
        tooltip: "Secure website with HTTPS encryption",
      },
      {
        text: "5 email accounts",
        tooltip: "Professional email addresses for your practice",
      },
      {
        text: "Basic analytics",
        tooltip: "Track website visitors and performance",
      },
    ],
  },
  {
    name: "Professional",
    price: {
      oneTime: 20000,
    },
    description: "Ideal for growing medical practices and clinics",
    features: [
      { text: "Everything in Starter, plus:" },
      {
        text: "Online appointment booking",
        tooltip: "Integrated scheduling system",
      },
      {
        text: "Patient portal access",
        tooltip: "Secure patient login and management",
      },
      {
        text: "Advanced SEO tools",
        tooltip: "Comprehensive SEO optimization for better rankings",
      },
      {
        text: "Review management",
        tooltip: "Collect and display patient testimonials",
      },
      {
        text: "Social media integration",
        tooltip: "Connect your social profiles",
      },
      {
        text: "Priority support",
        tooltip: "Fast response times for issues",
      },
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: {
      oneTime: 30000,
    },
    description: "For large medical organizations and hospitals",
    features: [
      { text: "Everything in Professional, plus:" },
      {
        text: "HIPAA-compliant hosting",
        tooltip: "Secure, compliant infrastructure",
      },
      {
        text: "Custom integrations",
        tooltip: "Connect with your existing systems",
      },
      {
        text: "Advanced analytics",
        tooltip: "Detailed insights and reporting",
      },
      {
        text: "Multi-location support",
        tooltip: "Manage multiple practice locations",
      },
      {
        text: "Marketing automation",
        tooltip: "Email campaigns and patient outreach",
      },
      {
        text: "24/7 premium support",
        tooltip: "Round-the-clock assistance",
      },
    ],
  },
];

function PricingTier({
  name,
  price,
  description,
  features,
  isPopular,
  isEnterprise,
}: PricingTierProps) {
  return (
    <div
      className={`relative rounded-2xl ${
        isPopular
          ? "scale-[1.02] border-2 border-blue-600 bg-white shadow-lg dark:border-blue-400 dark:bg-slate-800"
          : "border border-slate-200 bg-white/60 shadow-sm dark:border-slate-700 dark:bg-slate-800/50"
      } p-6 transition-all duration-200 hover:shadow-lg lg:p-8`}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white dark:bg-blue-500">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
          {name}
        </h3>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
        <div className="mb-2 flex items-baseline">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            ৳{price.oneTime.toLocaleString()}
          </span>
          <span className="ml-2 text-slate-500 dark:text-slate-400 text-sm flex items-center">
            One time payment
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Info className="ml-1 h-4 w-4 shrink-0 cursor-help text-slate-400 dark:text-slate-500" />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-slate-800"
                    sideOffset={5}
                  >
                    For the first year, installations, domain hosting, SSL and all mentioned features are free. After one year, you'll need to renew services like domain, hosting, SSL etc.
                    <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </span>
        </div>
      </div>

      <button
        className={`mb-6 w-full rounded-lg ${
          isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        } px-4 py-3 text-sm font-semibold transition-colors`}
      >
        {isPopular ? "Get Started Now" : "Get Started"}
      </button>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
          >
            <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <span className="text-sm">{feature.text}</span>
            {feature.tooltip && (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Info className="mt-1 h-4 w-4 shrink-0 cursor-help text-slate-400 dark:text-slate-500" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-slate-800"
                      sideOffset={5}
                    >
                      {feature.tooltip}
                      <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-800" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="bg-slate-50 py-16 dark:bg-slate-900 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            Affordable Plans Tailored to Your Practice
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            Choose the perfect plan for your practice. Whether you're a solo
            practitioner or running a large clinic, we've got you covered.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include secure hosting, SSL certificates, and regular
            updates. Need a custom solution?{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Contact us
            </Link>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
