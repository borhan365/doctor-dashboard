import { Metadata } from "next";
import Link from "next/link";
import { AnimatedCounter } from "./AnimatedCounter";

export const metadata: Metadata = {
  title: "Healtha For Hospitals",
  description: "Healtha For Hospitals",
};

function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 sm:py-16 lg:py-20">
        {/* Hero background decorative elements */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="absolute aspect-square w-full max-w-2xl rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl dark:from-blue-500/10 dark:to-purple-500/10" />
          <div className="absolute aspect-square w-full max-w-2xl translate-x-32 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl dark:from-purple-500/10 dark:to-pink-500/10" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="relative z-10 flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20">
                Complete Hospital Management Solution
              </span>
              <h1 className="pb-4 text-4xl font-bold !leading-[70px] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                Transform Your Hospital
                <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">
                  With Digital Innovation
                </span>
              </h1>
              <p className="max-w-xl text-center text-lg text-slate-600 dark:text-slate-300">
                Join leading hospitals in revolutionizing healthcare delivery.
                Streamline operations, manage departments efficiently, and
                enhance patient care with our comprehensive digital platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-slate-900"
              >
                <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gradient-to-r from-[#fff8] to-transparent opacity-30 transition-transform duration-300 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Register Your Hospital
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
              <Link
                href="/learn-more"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-8 py-3 text-lg font-semibold text-slate-900 backdrop-blur-sm transition-all hover:border-slate-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-800/80 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                Learn More
              </Link>
            </div>

            {/* Stats preview */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="rounded-2xl bg-white/80 p-4 backdrop-blur-sm dark:bg-slate-800/80 sm:p-6">
                <AnimatedCounter
                  end={5000}
                  suffix="+"
                  size="md"
                  color="blue"
                  className="mb-2"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Registered Doctors
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 backdrop-blur-sm dark:bg-slate-800/80 sm:p-6">
                <AnimatedCounter
                  end={500000}
                  suffix="+"
                  size="md"
                  color="blue"
                  className="mb-2"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Patients Served
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 backdrop-blur-sm dark:bg-slate-800/80 sm:p-6">
                <AnimatedCounter
                  end={50}
                  suffix="+"
                  size="md"
                  color="blue"
                  className="mb-2"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Departments Managed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
