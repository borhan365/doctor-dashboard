"use client";

import { motion } from "framer-motion";

interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  color: {
    light: string;
    dark: string;
    accent: string;
  };
  cta: {
    text: string;
    href: string;
  };
}

const services: Service[] = [
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Improve your medical practice's visibility in search results and attract more patients organically.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    features: [
      "Local SEO optimization",
      "Keyword research & targeting",
      "Content optimization",
      "Technical SEO improvements",
    ],
    color: {
      light: "bg-blue-50",
      dark: "dark:bg-blue-950/50",
      accent: "text-blue-600 dark:text-blue-400",
    },
    cta: {
      text: "Start SEO Journey",
      href: "#contact",
    },
  },
  {
    title: "Social Media Marketing",
    description:
      "Build strong relationships with patients and showcase your expertise across social platforms.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    features: [
      "Content creation & scheduling",
      "Community management",
      "Paid social campaigns",
      "Performance analytics",
    ],
    color: {
      light: "bg-purple-50",
      dark: "dark:bg-purple-950/50",
      accent: "text-purple-600 dark:text-purple-400",
    },
    cta: {
      text: "Boost Social Presence",
      href: "#contact",
    },
  },
  {
    title: "Content Marketing",
    description:
      "Educate and engage patients with valuable medical content that builds trust and authority.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
        />
      </svg>
    ),
    features: [
      "Blog post creation",
      "Medical infographics",
      "Patient success stories",
      "Healthcare newsletters",
    ],
    color: {
      light: "bg-emerald-50",
      dark: "dark:bg-emerald-950/50",
      accent: "text-emerald-600 dark:text-emerald-400",
    },
    cta: {
      text: "Create Content Strategy",
      href: "#contact",
    },
  },
  {
    title: "Pay-Per-Click Advertising",
    description:
      "Drive immediate results with targeted ads that reach potential patients actively seeking care.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
    features: [
      "Google Ads management",
      "Display advertising",
      "Remarketing campaigns",
      "Conversion tracking",
    ],
    color: {
      light: "bg-rose-50",
      dark: "dark:bg-rose-950/50",
      accent: "text-rose-600 dark:text-rose-400",
    },
    cta: {
      text: "Launch Campaign",
      href: "#contact",
    },
  },
];

export function ServiceSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 dark:bg-slate-900">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Medical Cross Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34h-2v-4h-4v-2h4v-4h2v4h4v2h-4v4zm0-30V0h2v4h4v2h-4v4h-2V6h-4V4h4zM6 34v-4h2v4h4v2H8v4H6v-4H2v-2h4zm0-30V0h2v4h4v2H8v4H6V6H2V4h4zm24 24v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V0h2v4h4v2h-4v4h-2V6h-4V4h4zm0 60v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V30h2v4h4v2h-4v4h-2v-4h-4v-2h4zm-12 30v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V30h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V0h2v4h4v2h-4v4h-2V6h-4V4h4zm12 60v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4zm-12 0v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4zm-12 0v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V30h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V0h2v4h4v2h-4v4h-2V6h-4V4h4zm12 30V30h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V0h2v4h4v2h-4v4h-2V6h-4V4h4zm12 30V30h2v4h4v2h-4v4h-2v-4h-4v-2h4zm0-30V0h2v4h4v2h-4v4h-2V6h-4V4h4z' /%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Blobs */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl dark:bg-blue-950/30" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-50/50 blur-3xl dark:bg-purple-950/30" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold !leading-[65px] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Comprehensive Digital Marketing Services for Doctors
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tailored solutions to help your medical practice thrive in the
            digital age
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 ${service.color.light} ${service.color.dark} backdrop-blur-sm dark:border-slate-800`}
            >
              {/* Service Header */}
              <div className="relative p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md dark:bg-slate-800">
                  <div className={service.color.accent}>{service.icon}</div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="border-t border-slate-200/50 bg-white/50 p-8 dark:border-slate-700/50 dark:bg-slate-800/50">
                <ul className="mb-6 space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="flex items-center text-slate-700 dark:text-slate-300"
                    >
                      <svg
                        className={`mr-3 h-5 w-5 ${service.color.accent}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Add CTA Button */}
                <div className="mt-auto pt-4">
                  <a
                    href={service.cta.href}
                    className={`inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium shadow-sm transition-all duration-200 
                    ${service.color.accent} hover:bg-slate-50 
                    focus:outline-none focus:ring-2
                    focus:ring-slate-900/10 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-300/10`}
                  >
                    {service.cta.text}
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
