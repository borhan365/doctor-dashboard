import { ArrowRight, CircleCheckBig, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Set up your professional profile with credentials, services, and high-quality photos",
    image: "https://healtha.io/wp-content/uploads/2024/10/step-1-profile.webp",
    features: [
      "Add your qualifications",
      "Upload professional photos",
      "List your services",
    ],
  },
  {
    number: "02",
    title: "Choose Your Position",
    description:
      "Select your preferred advertising spot based on your goals and budget",
    image: "https://healtha.io/wp-content/uploads/2024/10/step-2-position.webp",
    features: [
      "Top position visibility",
      "Specialty-based targeting",
      "Flexible pricing options",
    ],
  },
  {
    number: "03",
    title: "Get Noticed",
    description:
      "Start receiving more patient inquiries as your visibility increases",
    image: "https://healtha.io/wp-content/uploads/2024/10/step-3-growth.webp",
    features: [
      "Increased profile views",
      "More patient inquiries",
      "Higher booking rates",
    ],
  },
];

export default function StepSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-900">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Simple Process
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            Advertise in 3 Simple Steps
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Get started with your advertising journey in minutes
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-gray-800 dark:bg-slate-800"
            >
              {/* Step Number with Connector */}
              <div className="relative mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white dark:bg-blue-500">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-16 top-1/2 hidden h-px w-[calc(100%+2rem)] -translate-y-1/2 bg-gradient-to-r from-blue-600/50 to-transparent md:block" />
                )}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                {step.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {step.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-2 text-base text-slate-600 dark:text-slate-400"
                  >
                    <CircleCheckBig className="h-5 w-5 shrink-0 text-blue-500 dark:text-blue-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="#get-started"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start Your Journey Today
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
