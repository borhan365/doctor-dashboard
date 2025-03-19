import { Clock, MapPin, Users } from "lucide-react";

const features = [
  {
    question: "Do you want to get popular among your patients?",
    description:
      "Attract new patients and build your practice with reviews & referrals from happy patients.",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50/80",
    tag: "Boost Your Practice",
  },
  {
    question:
      "Do you want your patients to find your clinic without getting lost?",
    description:
      "Help your patients find your location effortlessly with our integrated map feature.",
    icon: MapPin,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50/80",
    tag: "Easy Navigation",
  },
  {
    question: "Do you want 24/7 service for your patients?",
    description:
      "Allow patients to send a booking request anytime, even when your clinic is closed.",
    icon: Clock,
    color: "text-purple-500",
    bgColor: "bg-purple-50/80",
    tag: "Always Available",
  },
];

export default function FeatureSection() {
  return (
    <section className="relative py-24" id="features">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent dark:from-slate-800/50" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Features
          </h2>
          <h3 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Enhance Your Medical Practice
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Healtha offers a comprehensive set of features designed to help you
            grow your practice and improve patient satisfaction
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
