import Image from "next/image";
import { FC } from "react";

import GoogleAds from "/public/images/logo/adwords.webp";
import GoogleAnalytics from "/public/images/logo/google-analytics.webp";
import HubSpot from "/public/images/logo/hubspot.webp";
import Mailchimp from "/public/images/logo/mailchimp.webp";
import MetaAds from "/public/images/logo/meta.webp";
import SEMrush from "/public/images/logo/semrush.webp";

interface TechnologySectionProps {}

const technologies = [
  {
    name: "Google Ads",
    description:
      "Drive instant traffic and leads with targeted PPC campaigns optimized for healthcare.",
    logo: GoogleAds,
    category: "Advertising",
  },
  {
    name: "Meta Ads Manager",
    description:
      "Build your audience and engage patients across Facebook and Instagram platforms.",
    logo: MetaAds,
    category: "Social Media",
  },
  {
    name: "SEMrush",
    description:
      "Analyze and optimize your SEO strategies for maximum visibility in medical searches.",
    logo: SEMrush,
    category: "SEO",
  },
  {
    name: "HubSpot",
    description:
      "Streamline patient communication and nurture leads with automated marketing workflows.",
    logo: HubSpot,
    category: "Marketing Automation",
  },
  {
    name: "Mailchimp",
    description:
      "Create and manage targeted email campaigns to keep patients engaged and informed.",
    logo: Mailchimp,
    category: "Email Marketing",
  },
  {
    name: "Google Analytics",
    description:
      "Track and analyze patient behavior to optimize your marketing strategies.",
    logo: GoogleAnalytics,
    category: "Analytics",
  },
];

export const TechnologySection: FC<TechnologySectionProps> = () => {
  return (
    <section className="bg-white py-24 dark:bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Cutting-Edge Tools to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Power Your Growth
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We leverage industry-leading technology to ensure your marketing
            campaigns deliver exceptional results.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900 dark:hover:shadow-blue-900/20"
            >
              {/* Card Header with Logo and Category */}
              <div className="relative border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-white p-2 shadow-sm dark:bg-slate-900">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        className="h-full w-full object-contain"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {tech.name}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-colors group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-500 dark:group-hover:text-blue-400">
                    <svg
                      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-800/50">
          <p className="mb-6 text-sm font-medium text-slate-900 dark:text-white">
            Certified Partners With Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative h-12 w-24 overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-slate-900"
              >
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  className="h-full w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  width={96}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
