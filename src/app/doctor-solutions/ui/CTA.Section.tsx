"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 dark:from-blue-900/90 dark:to-slate-900/90" />

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />
        <div className="absolute -left-1/4 top-0 h-[1000px] w-[1000px] rotate-12 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-800/20" />
        <div className="absolute -right-1/4 bottom-0 h-[1000px] w-[1000px] -rotate-12 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-800/20" />
      </div>

      <div className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Ready to Transform Your Practice?
            </h2>
            <p className="mb-10 text-lg text-blue-100 dark:text-blue-200">
              Join thousands of doctors who have already digitized their
              practice. Start your journey to better healthcare management
              today.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md dark:bg-white/90 dark:text-blue-700 dark:hover:bg-white"
              >
                Get Started Today
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-lg border border-blue-200 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-blue-700/50 dark:border-blue-400/30 dark:hover:bg-blue-800/50"
              >
                Talk to Sales
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
