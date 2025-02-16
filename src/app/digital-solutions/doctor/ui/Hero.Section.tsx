"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-blue-50 blur-3xl dark:bg-blue-950/50" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-blue-50 blur-3xl dark:bg-blue-950/50" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

      <div className="relative py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-5xl flex flex-col gap-3">
                <span>Empowering Doctors with{" "}</span>
                <span className="relative">
                  <span className="relative z-10 text-blue-600 dark:text-blue-400">
                    Smart Digital Solutions
                  </span>
                  <span className="absolute -bottom-2 left-0 z-0 h-3 w-full bg-blue-100/60 dark:bg-blue-950/60"></span>
                </span>
              </h1>
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
                From prescription management to digital marketing, we provide
                all the tools doctors need to streamline their practice and grow
                their online presence.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Get Started Now
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-lg border border-blue-600 bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
                >
                  Schedule a Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    10K+
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Active Users
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    99%
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Satisfaction
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    24/7
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Support
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="relative">
                {/* Image glow effect */}
                <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-blue-400 opacity-20 blur-xl dark:from-blue-400 dark:to-blue-600"></div>

                <div className="relative rounded-2xl bg-white p-2 shadow-xl dark:bg-slate-800">
                  <Image
                    src="https://amesmedicalservices.com/wp-content/uploads/2020/04/vectorstock_29999606.png"
                    alt="Doctor using digital solutions"
                    width={600}
                    height={400}
                    className="h-auto w-full rounded-xl transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
