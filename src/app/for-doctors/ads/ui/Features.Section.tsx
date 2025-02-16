import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  BarChart2,
  Crown,
  Globe,
  LineChart,
  MessageSquare,
  Search,
  Shield,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Top Search Position",
    description:
      "Get featured at the top of search results in your specialty, ensuring maximum visibility to potential patients.",
    icon: <Crown className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-blue-50/50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/80",
    borderColor: "group-hover:border-blue-200 dark:group-hover:border-blue-800",
    stat: "1st",
    statDesc: "Position Ranking",
  },
  {
    title: "Enhanced Visibility",
    description:
      "Stand out from other listings with premium placement and highlighted profile features.",
    icon: <Search className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/80",
    borderColor:
      "group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
    stat: "5x",
    statDesc: "More Views",
  },
  {
    title: "Verified Profile",
    description:
      "Build trust with a verified badge and premium profile status that showcases your credibility.",
    icon: <BadgeCheck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-purple-50/50 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-950/80",
    borderColor:
      "group-hover:border-purple-200 dark:group-hover:border-purple-800",
    stat: "100%",
    statDesc: "Verified",
  },
  {
    title: "Patient Reviews",
    description:
      "Collect and showcase authentic patient reviews to build your online reputation.",
    icon: <Star className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-orange-50/50 dark:bg-orange-950/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950/80",
    borderColor:
      "group-hover:border-orange-200 dark:group-hover:border-orange-800",
    stat: "4.9",
    statDesc: "Avg. Rating",
  },
  {
    title: "Performance Analytics",
    description:
      "Track your profile's performance with detailed insights on views, contacts, and engagement.",
    icon: <LineChart className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-rose-50/50 dark:bg-rose-950/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    hoverBg: "hover:bg-rose-50 dark:hover:bg-rose-950/80",
    borderColor: "group-hover:border-rose-200 dark:group-hover:border-rose-800",
    stat: "24/7",
    statDesc: "Live Stats",
  },
  {
    title: "Wide Reach",
    description:
      "Connect with our network of 300,000+ monthly active users searching for healthcare services.",
    icon: <Globe className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-indigo-50/50 dark:bg-indigo-950/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    hoverBg: "hover:bg-indigo-50 dark:hover:bg-indigo-950/80",
    borderColor:
      "group-hover:border-indigo-200 dark:group-hover:border-indigo-800",
    stat: "300K+",
    statDesc: "Monthly Users",
  },
  {
    title: "Patient Inquiries",
    description:
      "Receive direct patient inquiries and appointment requests through your premium profile.",
    icon: <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-cyan-50/50 dark:bg-cyan-950/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    hoverBg: "hover:bg-cyan-50 dark:hover:bg-cyan-950/80",
    borderColor: "group-hover:border-cyan-200 dark:group-hover:border-cyan-800",
    stat: "3x",
    statDesc: "More Inquiries",
  },
  {
    title: "Profile Security",
    description:
      "Your profile is protected with advanced security features and regular monitoring.",
    icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-amber-50/50 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-950/80",
    borderColor:
      "group-hover:border-amber-200 dark:group-hover:border-amber-800",
    stat: "100%",
    statDesc: "Secure",
  },
  {
    title: "Growth Tracking",
    description:
      "Monitor your practice's growth with comprehensive performance metrics and insights.",
    icon: <BarChart2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-teal-50/50 dark:bg-teal-950/50",
    iconColor: "text-teal-600 dark:text-teal-400",
    hoverBg: "hover:bg-teal-50 dark:hover:bg-teal-950/80",
    borderColor: "group-hover:border-teal-200 dark:group-hover:border-teal-800",
    stat: "200%",
    statDesc: "Avg. Growth",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 dark:bg-slate-900 sm:py-20 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Premium Features for{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Advertised Profiles
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
            Unlock these exclusive features and benefits when you advertise your
            profile on Healtha. Stand out from the competition and grow your
            practice.
          </p>
        </div>

        {/* Features Grid */}
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
                {/* Icon */}
                <div
                  className={cn(
                    "mb-6 inline-flex w-fit rounded-xl p-3",
                    feature.bgColor,
                  )}
                >
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-700">
                  <div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {feature.stat}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {feature.statDesc}
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 dark:text-slate-500"
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
