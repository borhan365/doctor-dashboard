import { BarChart, Globe, MessageSquare, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const benefits = [
    {
      icon: Globe,
      title: "Top Search Position",
      desc: "Priority listing in search results",
    },
    {
      icon: Users,
      title: "24/7 Exposure",
      desc: "Reach thousands of patients daily",
    },
    {
      icon: MessageSquare,
      title: "Verified Reviews",
      desc: "Build trust with real feedback",
    },
    {
      icon: BarChart,
      title: "Performance Tracking",
      desc: "Monitor your ad's success",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-950 dark:to-slate-900 lg:py-20"
      aria-label="Hero Section"
    >
      {/* Decorative blobs and shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left blob */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl dark:bg-blue-950/30" />
        {/* Bottom-right blob */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl dark:bg-blue-950/30" />

        {/* Decorative circles */}
        <div className="absolute left-1/4 top-20 h-6 w-6 rounded-full bg-blue-200/30 dark:bg-blue-400/10" />
        <div className="absolute right-1/4 top-40 h-4 w-4 rounded-full bg-blue-300/40 dark:bg-blue-400/20" />
        <div className="absolute bottom-20 left-1/3 h-8 w-8 rounded-full bg-blue-100/50 dark:bg-blue-400/10" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5 dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 0), linear-gradient(180deg, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center text-center">
          {/* Trust Badge */}
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-6 py-2 dark:bg-blue-950/50">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              #1 Doctor Directory in Bangladesh
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 max-w-4xl text-4xl font-bold !leading-[70px] tracking-tight text-slate-900 dark:text-white lg:text-5xl xl:text-6xl">
            <span className="relative">
              <span className="relative z-10 text-blue-600 dark:text-blue-400">
                Boost Your Popularity
              </span>
              <span className="absolute -bottom-2 left-0 z-0 h-3 w-full bg-blue-100/60 dark:bg-blue-950/60"></span>
            </span>{" "}
            and Patient Base with Healtha Ads!
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            {`Reach thousands of patients every day on Bangladesh's #1 doctor
            directory website. Secure a top spot in search results and grow your
            practice like never before.`}
          </p>

          {/* Features Grid */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:max-w-4xl">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center" role="listitem">
                  <div className="mb-2 flex justify-center">
                    <Icon
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="#advertise"
              className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Advertise Now
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="#pricing"
              className="group inline-flex items-center justify-center rounded-lg border border-blue-600 bg-white px-8 py-3 text-base font-medium text-blue-600 transition-all hover:bg-blue-50 dark:border-blue-400 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              See Pricing
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </Link>
          </div>

          {/* Preview Section with Stats */}
          <div className="relative w-full max-w-5xl">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-blue-400 opacity-20 blur-xl dark:from-blue-400 dark:to-blue-600"></div>
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl dark:bg-slate-900">
              <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <Image
                  src="https://www.practo.com/providers/static/images/pages/clinics/profiles-feedback.png"
                  alt="Doctor profile preview showing sponsored position and engagement metrics"
                  width={1200}
                  height={800}
                  className="rounded-xl transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Stats Cards */}
              <div className="absolute -right-8 -top-8 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Daily Views
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1000+
                </p>
              </div>
              <div className="absolute -bottom-8 -left-8 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Patient Trust
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  98%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
