import { cn } from "@/lib/utils";
import { FileText, Stethoscope, UserPlus } from "lucide-react";
import Link from "next/link";

export default function CreateProfileSteps() {
  const steps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Quick registration with your basic information",
      icon: UserPlus,
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      step: 2,
      title: "Complete Your Profile",
      description: "Add your qualifications and practice details",
      icon: FileText,
      gradient: "from-emerald-500/20 to-blue-500/20",
    },
    {
      step: 3,
      title: "Start Practicing",
      description: "Begin connecting with patients and growing your practice",
      icon: Stethoscope,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50/50 px-4 py-20 dark:bg-slate-900/50 md:py-32">
      {/* Decorative grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute aspect-square w-full max-w-xl rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl dark:from-blue-500/10 dark:to-purple-500/10" />
        <div className="absolute aspect-square w-full max-w-xl translate-x-32 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl dark:from-purple-500/10 dark:to-pink-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
            Get Started in{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Three Simple Steps
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Join our platform and start growing your medical practice with these
            easy steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={cn(
                "group relative rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-slate-700",
                "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-b before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
                step.gradient,
              )}
            >
              <div className="relative">
                {/* Step number badge */}
                <div className="absolute -right-2 -top-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white dark:bg-blue-500">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 dark:from-blue-500 dark:to-blue-600 dark:shadow-blue-500/20">
                  <step.icon className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>

                {/* Decorative arrow for non-last items */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-slate-300 dark:text-slate-700 md:block">
                    <svg
                      className="h-6 w-6"
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
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/for-doctors/register"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-slate-900"
          >
            <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gradient-to-r from-[#fff8] to-transparent opacity-30 transition-transform duration-300 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              Join Now
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
