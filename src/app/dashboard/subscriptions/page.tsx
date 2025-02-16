"use client";

import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface PricingTierProps {
  name: string;
  price: {
    monthly: number;
    yearly: number;
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

function PricingTier({
  name,
  price,
  description,
  features,
  isPopular,
  isEnterprise,
  isYearly,
}: PricingTierProps & { isYearly: boolean }) {
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
          {isEnterprise ? (
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              Custom Pricing
            </span>
          ) : (
            <>
              <span className="text-4xl font-bold text-slate-900 dark:text-white">
                ৳{isYearly ? price.yearly.toLocaleString() : price.monthly.toLocaleString()}
              </span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">
                /{isYearly ? "year" : "month"}
              </span>
            </>
          )}
        </div>
        {isYearly && !isEnterprise && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Save ৳{(price.monthly * 12 - price.yearly).toLocaleString()} yearly
          </p>
        )}
      </div>

      <button
        className={`mb-6 w-full rounded-lg ${
          isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            : isEnterprise
              ? "border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        } px-4 py-3 text-sm font-semibold transition-colors`}
      >
        {isEnterprise ? "Contact Sales" : isPopular ? "Start Free Trial" : "Get Started"}
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

export default function Subscriptions() {
  const [isYearly, setIsYearly] = useState(false);

  const pricingTiers: PricingTierProps[] = [
    {
      name: "Basic",
      price: {
        monthly: 1000,
        yearly: 10000,
      },
      description: "Essential features for small medical practices",
      features: [
        {
          text: "Professional doctor website",
          tooltip: "Fully customizable medical practice website",
        },
        { text: "Basic Prescription Management System" },
        {
          text: "Patient record storage (up to 500 records)",
          tooltip: "Secure, HIPAA-compliant storage",
        },
        { text: "Email support (9am-5pm)" },
        { text: "Basic reporting & analytics" },
        { text: "Single user access" },
      ],
    },
    {
      name: "Pro",
      price: {
        monthly: 1500,
        yearly: 15000,
      },
      description: "Perfect for growing medical practices",
      features: [
        { text: "Everything in Basic plan" },
        {
          text: "Advanced Prescription Management",
          tooltip: "Including controlled substances and analytics",
        },
        { text: "Online appointment booking system" },
        { text: "Patient record storage (up to 5,000 records)" },
        { text: "Integrated telemedicine system" },
        { text: "SEO-optimized doctor website" },
        { text: "Live chat and priority support" },
        { text: "Up to 5 user accounts" },
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: {
        monthly: 2000,
        yearly: 20000,
      },
      description: "For large medical organizations",
      features: [
        { text: "Fully customized prescription system" },
        { text: "Unlimited patient record storage" },
        { text: "Dedicated account manager" },
        { text: "Marketing solutions included" },
        { text: "API integrations with hospital systems" },
        { text: "Staff training and onboarding" },
        { text: "24/7 premium support" },
        { text: "Custom workflow automation" },
      ],
      isEnterprise: true,
    },
  ];

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            Manage Your Subscription
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            Choose a plan that fits your chamber, budget, and needs. 
          </p>

          <div className="mb-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm ${
                !isYearly
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-900 dark:bg-slate-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${
                isYearly
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Yearly
              <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                Save up to 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} isYearly={isYearly} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include secure data storage, HIPAA compliance, and
            automatic updates. No hidden fees. Cancel anytime.{" "}
            <a
              href="#faq"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              View our pricing FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
