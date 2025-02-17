import { cn } from "@/lib/utils";
import {
  Clock,
  Headphones,
  HeartHandshake,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Easy to Use",
    description:
      "No technical knowledge required. Our platforms are designed for simplicity and intuitive navigation.",
    icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-blue-50/50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/80",
    borderColor: "group-hover:border-blue-200 dark:group-hover:border-blue-800",
  },
  {
    title: "Secure & Compliant",
    description:
      "HIPAA-compliant systems with enterprise-grade security protocols and data protection.",
    icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/80",
    borderColor:
      "group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock technical support to help you whenever needed, ensuring uninterrupted service.",
    icon: <Headphones className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-purple-50/50 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-950/80",
    borderColor:
      "group-hover:border-purple-200 dark:group-hover:border-purple-800",
  },
  {
    title: "Time-Saving",
    description:
      "Automate routine tasks and focus more on patient care with our efficient workflows.",
    icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-orange-50/50 dark:bg-orange-950/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950/80",
    borderColor:
      "group-hover:border-orange-200 dark:group-hover:border-orange-800",
  },
  {
    title: "Patient-Centric",
    description:
      "Improve patient experience with modern digital tools and seamless communication.",
    icon: (
      <HeartHandshake className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
    ),
    bgColor: "bg-rose-50/50 dark:bg-rose-950/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    hoverBg: "hover:bg-rose-50 dark:hover:bg-rose-950/80",
    borderColor: "group-hover:border-rose-200 dark:group-hover:border-rose-800",
  },
  {
    title: "Scalable Solution",
    description:
      "Grows with your practice, from single clinic to multiple locations, without compromising performance.",
    icon: <Rocket className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-indigo-50/50 dark:bg-indigo-950/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    hoverBg: "hover:bg-indigo-50 dark:hover:bg-indigo-950/80",
    borderColor:
      "group-hover:border-indigo-200 dark:group-hover:border-indigo-800",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-slate-900 sm:py-20 lg:py-24">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Why Doctors Choose Us
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
            Experience the benefits of our comprehensive digital solutions
            designed specifically for healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-800",
                "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
                "sm:p-8",
                feature.hoverBg,
                feature.borderColor,
              )}
            >
              <div className="relative z-10 flex h-full flex-col">
                <div
                  className={cn(
                    "mb-6 inline-flex w-fit rounded-xl p-3",
                    feature.bgColor,
                  )}
                >
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="flex-grow text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center">
                  <span className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    Learn more
                  </span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
          ))}
        </div>
      </div>
    </section>
  );
}
