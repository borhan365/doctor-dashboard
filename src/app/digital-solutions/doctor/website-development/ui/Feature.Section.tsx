import { Check, Clock, FileText, Lock, Shield, Users } from "lucide-react";

const features = [
  {
    question: "Want to streamline your prescription process?",
    description:
      "Create, manage, and track prescriptions effortlessly with our intuitive digital system. Save time and reduce errors.",
    icon: FileText,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-50/80 dark:bg-blue-950/50",
    tag: "Smart Prescriptions",
  },
  {
    question: "Need secure patient record management?",
    description:
      "Maintain comprehensive digital records of patient history, medications, and treatment plans in a HIPAA-compliant environment.",
    icon: Users,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-50/80 dark:bg-emerald-950/50",
    tag: "Patient Records",
  },
  {
    question: "Want 24/7 access to your prescription system?",
    description:
      "Access your prescription management system anytime, anywhere. Our cloud-based solution ensures constant availability.",
    icon: Clock,
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-50/80 dark:bg-purple-950/50",
    tag: "Always Available",
  },
  {
    question: "Concerned about data security?",
    description:
      "Rest easy with our enterprise-grade security measures protecting sensitive patient data and ensuring HIPAA compliance.",
    icon: Shield,
    color: "text-red-500 dark:text-red-400",
    bgColor: "bg-red-50/80 dark:bg-red-950/50",
    tag: "Advanced Security",
  },
  {
    question: "Need controlled substance management?",
    description:
      "Securely manage and track controlled substances with built-in compliance checks and comprehensive monitoring tools.",
    icon: Lock,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-50/80 dark:bg-amber-950/50",
    tag: "Controlled Substances",
  },
  {
    question: "Worried about compliance?",
    description:
      "Stay compliant with automated checks and balances. Our system updates regularly to match changing healthcare regulations.",
    icon: Check,
    color: "text-teal-500 dark:text-teal-400",
    bgColor: "bg-teal-50/80 dark:bg-teal-950/50",
    tag: "Auto Compliance",
  },
];

export function FeatureSection() {
  return (
    <section className="relative py-24" id="features">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent dark:from-slate-800/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Features
          </h2>
          <h3 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Everything You Need for Modern Prescriptions
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Our comprehensive prescription management system provides all the
            tools you need to streamline your practice and enhance patient care
          </p>
        </div>

        {/* Features */}
        <div className="relative space-y-16">
          {features.map((feature) => (
            <div
              key={feature.question}
              className="flex flex-col items-start gap-16 lg:flex-row lg:gap-10"
            >
              {/* Icon Box */}
              <div className="w-full lg:w-1/6">
                <div
                  className={`${feature.bgColor} flex aspect-square items-center justify-center rounded-3xl p-12 backdrop-blur-sm transition duration-300 hover:scale-105 lg:p-16`}
                >
                  <feature.icon
                    className={`h-10 w-10 ${feature.color}`}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <h4 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl lg:leading-tight lg:tracking-tight">
                  {feature.question}
                </h4>
                <span
                  className={`inline-flex ${feature.bgColor} backdrop-blur-sm ${feature.color} rounded-full px-3 py-1 text-sm font-medium`}
                >
                  {feature.tag}
                </span>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
