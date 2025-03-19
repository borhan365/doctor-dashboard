"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Info } from "lucide-react";
import Link from "next/link";

interface PricingTierProps {
  name: string;
  price: {
    monthly: number;
  };
  description: string;
  features: Array<{
    text: string;
    tooltip?: string;
  }>;
  isPopular?: boolean;
}

const pricingTiers: PricingTierProps[] = [
  {
    name: "Basic",
    price: {
      monthly: 999,
    },
    description:
      "Perfect for new doctors looking to establish an online presence",
    features: [
      {
        text: "Professional profile creation",
        tooltip: "Create a comprehensive digital presence",
      },
      {
        text: "24/7 appointment booking",
        tooltip: "Let patients book appointments anytime",
      },
      {
        text: "Patient reviews management",
        tooltip: "Collect and display verified patient reviews",
      },
      {
        text: "Basic analytics dashboard",
        tooltip: "Track your profile performance",
      },
      {
        text: "Map integration",
        tooltip: "Help patients find your location easily",
      },
      {
        text: "Standard support",
        tooltip: "Email support during business hours",
      },
    ],
  },
  {
    name: "Professional",
    price: {
      monthly: 1999,
    },
    description:
      "Designed for growing practices aiming to attract more patients",
    features: [
      { text: "Everything in Basic, plus:" },
      {
        text: "Digital prescriptions",
        tooltip: "Write and manage digital prescriptions",
      },
      {
        text: "Secure patient communication",
        tooltip: "HIPAA-compliant messaging system",
      },
      {
        text: "Advanced analytics",
        tooltip: "Detailed insights and patient demographics",
      },
      {
        text: "Priority listing",
        tooltip: "Higher visibility in search results",
      },
      {
        text: "Custom availability settings",
        tooltip: "Set complex scheduling rules",
      },
      {
        text: "Priority support",
        tooltip: "Fast response times for issues",
      },
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: {
      monthly: 4999,
    },
    description:
      "For established practices ready to dominate the digital space",
    features: [
      { text: "Everything in Professional, plus:" },
      {
        text: "Global reach optimization",
        tooltip: "Enhanced visibility across regions",
      },
      {
        text: "Advanced marketing tools",
        tooltip: "Email campaigns and patient outreach",
      },
      {
        text: "Custom branding",
        tooltip: "Personalized profile appearance",
      },
      {
        text: "Multi-language support",
        tooltip: "Reach patients in different languages",
      },
      {
        text: "Integration APIs",
        tooltip: "Connect with your existing systems",
      },
      {
        text: "24/7 premium support",
        tooltip: "Round-the-clock dedicated assistance",
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
            ৳{price.monthly.toLocaleString()}
          </span>
          <span className="ml-2 flex items-center text-sm text-slate-500 dark:text-slate-400">
            Monthly payment
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
                    For the first year, installations, domain hosting, SSL and
                    all mentioned features are free. After one year, you'll need
                    to renew services like domain, hosting, SSL etc.
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
    <section className="bg-slate-50 py-16 dark:bg-slate-900 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            Affordable and Transparent Pricing
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            At Healtha, we offer flexible pricing plans to cater to the unique
            needs of every doctor. Whether you're starting your digital journey
            or looking to scale your practice, we have a plan for you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>

        <div className="mt-12 space-y-4 text-center">
          <div className="inline-block rounded-lg bg-blue-50 px-6 py-3 dark:bg-blue-900/30">
            <p className="font-medium text-blue-700 dark:text-blue-300">
              🎉 Special Offer: Sign up today and get 1 month free trial!
            </p>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include secure data protection, interactive profile
            management, and verified reviews. Need a custom solution?{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Contact us
            </Link>{" "}
            to discuss your requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
