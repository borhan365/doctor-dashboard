import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const reasons = [
  {
    title: "Largest Medical Directory",
    description:
      "Join Bangladesh's #1 doctor directory with 300,000+ monthly patient visits",
    stats: "300K+",
    statsLabel: "Monthly Visitors",
  },
  {
    title: "Targeted Reach",
    description:
      "Connect with patients actively searching for healthcare services in your area",
    stats: "85%",
    statsLabel: "Local Reach",
  },
  {
    title: "Verified Platform",
    description:
      "Build trust through our verified doctor profiles and authentic patient reviews",
    stats: "98%",
    statsLabel: "Patient Trust",
  },
  {
    title: "Premium Visibility",
    description:
      "Get featured in top search results and specialty-specific listings",
    stats: "5x",
    statsLabel: "More Views",
  },
];

const testimonial = {
  quote:
    "Advertising on Healtha has transformed my practice. The number of patient appointments has increased significantly, and the platform's reach is remarkable.",
  author: "Dr. Sarah Ahmed",
  role: "Cardiologist",
  hospital: "United Hospital, Dhaka",
  image:
    "https://healtha.io/wp-content/uploads/2024/10/Dr.-Chowdhury-Maimuna-Raisa.webp",
};

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-900">
      {/* Background Pattern */}
      <div className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,white,transparent)]"></div>

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            Why Choose Healtha for Your{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Advertisement?
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Join thousands of successful doctors who trust Healtha to grow their
            medical practice
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
            >
              <div className="mb-4">
                <span className="inline-block rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
              </div>
              <div className="mb-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {reason.stats}
              </div>
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {reason.statsLabel}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                {reason.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 p-8 dark:from-blue-500 dark:to-blue-300">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="md:w-1/3">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white/20">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <blockquote className="mb-4 text-xl font-medium text-white">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-white">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-white/80">
                  {testimonial.role} at {testimonial.hospital}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="#advertise"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start Advertising Today
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
