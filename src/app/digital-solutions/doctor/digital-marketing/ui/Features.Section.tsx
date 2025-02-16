import { cn } from "@/lib/utils";
import {
  Award,
  BadgeDollarSign,
  BarChart2,
  Brain,
  HeartHandshake,
  Shield,
  ShieldCheck,
  Target,
  Trophy,
  Users2,
} from "lucide-react";

const features = [
  {
    title: "Healthcare Expertise",
    description:
      "10+ years of specialized experience in medical digital marketing and deep understanding of healthcare regulations.",
    icon: <Brain className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-blue-50/50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/80",
    borderColor: "group-hover:border-blue-200 dark:group-hover:border-blue-800",
    stat: "10+ Years",
    statDesc: "Industry Experience",
  },
  {
    title: "Proven Results",
    description:
      "Data-driven strategies that have helped 1000+ healthcare providers increase their patient acquisition by 200%.",
    icon: <BarChart2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/80",
    borderColor:
      "group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
    stat: "200%",
    statDesc: "Average Growth",
  },
  {
    title: "HIPAA Compliant",
    description:
      "All our marketing strategies and platforms are fully HIPAA-compliant, ensuring patient data security and privacy.",
    icon: <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-purple-50/50 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-950/80",
    borderColor:
      "group-hover:border-purple-200 dark:group-hover:border-purple-800",
    stat: "100%",
    statDesc: "HIPAA Compliant",
  },
  {
    title: "Dedicated Support",
    description:
      "24/7 access to our healthcare marketing experts who understand your unique challenges and goals.",
    icon: (
      <HeartHandshake className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
    ),
    bgColor: "bg-orange-50/50 dark:bg-orange-950/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950/80",
    borderColor:
      "group-hover:border-orange-200 dark:group-hover:border-orange-800",
    stat: "24/7",
    statDesc: "Expert Support",
  },
  {
    title: "Industry Recognition",
    description:
      "Award-winning digital marketing solutions recognized by leading healthcare organizations and institutions.",
    icon: <Award className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-rose-50/50 dark:bg-rose-950/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    hoverBg: "hover:bg-rose-50 dark:hover:bg-rose-950/80",
    borderColor: "group-hover:border-rose-200 dark:group-hover:border-rose-800",
    stat: "50+",
    statDesc: "Industry Awards",
  },
  {
    title: "Trusted Network",
    description:
      "Join our network of 1000+ healthcare providers who trust us for their digital marketing success.",
    icon: <Users2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-indigo-50/50 dark:bg-indigo-950/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    hoverBg: "hover:bg-indigo-50 dark:hover:bg-indigo-950/80",
    borderColor:
      "group-hover:border-indigo-200 dark:group-hover:border-indigo-800",
    stat: "1000+",
    statDesc: "Happy Clients",
  },
  {
    title: "Complete Reputation Management",
    description:
      "We monitor, address, and mitigate social media mentions, reviews, and search engine results to enhance your practice's online positive image.",
    icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-cyan-50/50 dark:bg-cyan-950/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    hoverBg: "hover:bg-cyan-50 dark:hover:bg-cyan-950/80",
    borderColor: "group-hover:border-cyan-200 dark:group-hover:border-cyan-800",
    stat: "100%",
    statDesc: "Reputation Score",
  },
  {
    title: "Cost-effectiveness",
    description:
      "We can manage one service, your entire digital portfolio or anything in-between and also we provide customised plans based on your budget.",
    icon: (
      <BadgeDollarSign className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
    ),
    bgColor: "bg-amber-50/50 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-950/80",
    borderColor:
      "group-hover:border-amber-200 dark:group-hover:border-amber-800",
    stat: "30%",
    statDesc: "Cost Savings",
  },
  {
    title: "Innovative Marketing Strategies",
    description:
      "We love what we do and are proud of the successes we help our clients achieve with our marketing strategies.",
    icon: <Target className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-teal-50/50 dark:bg-teal-950/50",
    iconColor: "text-teal-600 dark:text-teal-400",
    hoverBg: "hover:bg-teal-50 dark:hover:bg-teal-950/80",
    borderColor: "group-hover:border-teal-200 dark:group-hover:border-teal-800",
    stat: "95%",
    statDesc: "Success Rate",
  },
  {
    title: "We Are Ambitious For You",
    description:
      "Big or small, our clients partner with us because of the ideas we generate, the results we produce and the service we provide.",
    icon: <Trophy className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />,
    bgColor: "bg-pink-50/50 dark:bg-pink-950/50",
    iconColor: "text-pink-600 dark:text-pink-400",
    hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-950/80",
    borderColor: "group-hover:border-pink-200 dark:group-hover:border-pink-800",
    stat: "100%",
    statDesc: "Client Satisfaction",
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
            Why Doctors Trust Us for{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Digital Growth
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
            Our expertise in healthcare marketing makes us the perfect partner
            for your success. Join thousands of healthcare providers who trust
            us.
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
