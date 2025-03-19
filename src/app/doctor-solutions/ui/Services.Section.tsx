import { Globe, Megaphone, Stethoscope } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Prescription Management System",
    description:
      "Automate prescriptions and streamline your practice with our intelligent digital prescription system. Save time and reduce errors.",
    icon: <Stethoscope className="h-12 w-12" />,
    features: [
      "Digital Prescription Writing",
      "Medicine Database",
      "Patient History Tracking",
      "Automated Reminders",
    ],
    color: "blue",
    colorClasses: {
      accent: "bg-blue-500 dark:bg-blue-400",
      icon: "text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-950/50",
      link: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
      check: "text-blue-500 dark:text-blue-400",
    },
    href: "/digital-solutions/doctor/prescription-management-software",
  },
  {
    title: "Doctor Websites",
    description:
      "Get a professional, SEO-optimized website that helps patients find and trust your practice. Mobile-friendly designs that convert visitors.",
    icon: <Globe className="h-12 w-12" />,
    features: [
      "Custom Design",
      "Mobile Responsive",
      "SEO Optimized",
      "Booking Integration",
    ],
    color: "emerald",
    colorClasses: {
      accent: "bg-emerald-500 dark:bg-emerald-400",
      icon: "text-emerald-500 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      link: "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
      check: "text-emerald-500 dark:text-emerald-400",
    },
    href: "/digital-solutions/doctor/website-development",
  },
  {
    title: "Digital Marketing for Doctors",
    description:
      "Grow your practice with targeted digital marketing campaigns across Facebook, Google, and LinkedIn platforms.",
    icon: <Megaphone className="h-12 w-12" />,
    features: [
      "Social Media Ads",
      "Google Ads",
      "LinkedIn Marketing",
      "Performance Analytics",
    ],
    color: "violet",
    colorClasses: {
      accent: "bg-violet-500 dark:bg-violet-400",
      icon: "text-violet-500 dark:text-violet-400",
      iconBg: "bg-violet-50 dark:bg-violet-950/50",
      link: "text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300",
      check: "text-violet-500 dark:text-violet-400",
    },
    href: "/digital-solutions/doctor/digital-marketing",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white py-24 dark:bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-5xl">
            Our Digital Solutions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Comprehensive digital tools and services designed to modernize your
            medical practice and enhance patient care
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800 dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute inset-x-0 top-0 h-2 rounded-t-2xl ${service.colorClasses.accent}`}
              />

              {/* Icon */}
              <div
                className={`mb-6 inline-flex rounded-xl p-4 ${service.colorClasses.iconBg}`}
              >
                <div className={service.colorClasses.icon}>{service.icon}</div>
              </div>

              {/* Content */}
              <h3 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mb-6 text-slate-600 dark:text-slate-300">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features?.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-slate-600 dark:text-slate-300"
                  >
                    <svg
                      className={`mr-2 h-5 w-5 ${service.colorClasses.check}`}
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
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <div className="mt-8">
                <Link
                  href={service.href}
                  className={`group inline-flex items-center ${service.colorClasses.link}`}
                >
                  <span className="font-semibold">Learn More</span>
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
