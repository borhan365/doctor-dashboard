"use client";

import { Crown, Medal, QuoteIcon, Star, StarIcon, Trophy } from "lucide-react";
import Link from "next/link";

interface PricingTierProps {
  name: string;
  icon: React.ElementType;
  price: number;
  description: string;
  features: Array<string>;
  cta: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTierProps[] = [
  {
    name: "3rd Position",
    icon: Medal,
    price: 6000,
    description: "Enhanced visibility over non-advertised profiles",
    features: [
      "Prominent placement in category",
      "Enhanced profile visibility",
      "Priority in search results",
      "Basic analytics dashboard",
      "Standard support",
      "Profile verification badge",
    ],
    cta: "Secure 3rd Position",
  },
  {
    name: "2nd Position",
    icon: Trophy,
    price: 8000,
    description: "High visibility with premium placement",
    features: [
      "Second-highest category ranking",
      "Premium profile visibility",
      "Advanced search positioning",
      "Detailed analytics dashboard",
      "Priority support",
      "Featured profile badge",
    ],
    isPopular: true,
    cta: "Get 2nd Position",
  },
  {
    name: "1st Position",
    icon: Crown,
    price: 10000,
    description: "Maximum visibility in your specialty",
    features: [
      "Top ranking in specialty",
      "Maximum profile visibility",
      "First in search results",
      "Premium analytics suite",
      "VIP support access",
      "Elite profile badge",
    ],
    cta: "Claim Top Position",
  },
];

const testimonials = [
  {
    quote: "Advertising on Healtha doubled my patient count in just 6 months!",
    author: "Dr. Sarah Ahmed",
    role: "Cardiologist",
    hospital: "United Hospital, Dhaka",
  },
  {
    quote:
      "The top position listing transformed my practice's online presence.",
    author: "Dr. Rahman Khan",
    role: "Orthopedic Surgeon",
    hospital: "Apollo Hospital, Dhaka",
  },
];

function PricingTier({
  name,
  icon: Icon,
  price,
  description,
  features,
  cta,
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

      <div className="mb-6 flex items-center gap-4">
        <span
          className={`rounded-xl ${
            isPopular
              ? "bg-blue-600 text-white dark:bg-blue-500"
              : "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
          } p-3`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {name}
        </h3>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-baseline">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            ৳{price.toLocaleString()}
          </span>
          <span className="ml-2 text-slate-500 dark:text-slate-400">/year</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <ul className="mb-8 space-y-2">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-base text-slate-600 dark:text-slate-300"
          >
            <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`w-full rounded-lg ${
          isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        } px-4 py-3 text-sm font-semibold transition-colors`}
      >
        {cta}
      </button>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            Affordable Advertising Plans{" "}
            <span className="text-blue-600 dark:text-blue-400">
              for Doctors
            </span>
          </h2>
          <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
            Choose the Best Plan That Fits Your Needs and Budget
          </p>
          <div className="inline-flex items-center rounded-full bg-blue-100 px-6 py-2 dark:bg-blue-900/50">
            <Star className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Hurry! Limited ad slots available—book now to secure your
              position!
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800/50"
            >
              <div className="mb-4 flex">
                <QuoteIcon className="h-8 w-8 text-blue-500/20 dark:text-blue-400/20" />
                <blockquote className="ml-2 text-lg italic text-slate-600 dark:text-slate-300">
                  {`“${testimonial.quote}”`}
                </blockquote>

              </div>
              <footer>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {testimonial.role} at {testimonial.hospital}
                </div>
                {/* rating */}
                <div className="flex items-center gap-1 mt-2">
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500 dark:text-yellow-400" />
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500 dark:text-yellow-400" />
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500 dark:text-yellow-400" />
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500 dark:text-yellow-400" />
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500 dark:text-yellow-400" />
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Advertisement rates may change, but confirmed bookings will not face
            additional charges during the active period. Ads are offered on a
            first-come, first-served basis.
          </p>
          <Link
            href="/contact"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Contact Us for Assistance →
          </Link>
        </div>
      </div>
    </section>
  );
}
