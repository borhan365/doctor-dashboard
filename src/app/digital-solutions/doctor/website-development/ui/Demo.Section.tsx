"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type DemoType = "general" | "dentist" | "pediatric" | "specialist";
type DeviceType = "desktop" | "tablet" | "mobile";

interface DemoOption {
  id: DemoType;
  label: string;
  images: {
    [key in DeviceType]: string;
  };
}

const demoOptions: DemoOption[] = [
  {
    id: "general",
    label: "General Physician",
    images: {
      desktop:
        "https://onlinemarketingfordoctors.com/wp-content/uploads/2024/12/FNQ-Rheumatology-home.png",
      tablet: "https://placehold.co/800x1200",
      mobile: "https://placehold.co/400x800",
    },
  },
  {
    id: "dentist",
    label: "Dentist",
    images: {
      desktop:
        "https://onlinemarketingfordoctors.com/wp-content/uploads/2024/12/FNQ-Rheumatology-home.png",
      tablet: "https://placehold.co/600x400/png",
      mobile: "https://placehold.co/600x400/png",
    },
  },
  {
    id: "pediatric",
    label: "Pediatrician",
    images: {
      desktop:
        "https://onlinemarketingfordoctors.com/wp-content/uploads/2024/12/FNQ-Rheumatology-home.png",
      tablet: "https://placehold.co/800x1200",
      mobile: "https://placehold.co/400x800",
    },
  },
  {
    id: "specialist",
    label: "Specialist",
    images: {
      desktop:
        "https://onlinemarketingfordoctors.com/wp-content/uploads/2024/12/FNQ-Rheumatology-home.png",
      tablet: "https://placehold.co/800x1200",
      mobile: "https://placehold.co/400x800",
    },
  },
];

export function DemoSection() {
  const [selectedDemo, setSelectedDemo] = useState<DemoType>("general");
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("desktop");

  const currentDemo = demoOptions.find((demo) => demo.id === selectedDemo);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-900 dark:to-slate-950 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            See Our Doctor Websites in Action
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore stunning, professional websites designed exclusively for
            healthcare professionals.
          </p>
        </div>

        {/* Demo Selection Tabs */}
        <div className="mb-8">
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
            {demoOptions.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setSelectedDemo(demo.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedDemo === demo.id
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Device Selection */}
        <div className="mb-8">
          <div className="mx-auto flex max-w-md justify-center gap-4">
            {[
              { type: "desktop", icon: Monitor },
              { type: "tablet", icon: Tablet },
              { type: "mobile", icon: Smartphone },
            ].map(({ type, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setSelectedDevice(type as DeviceType)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedDevice === type
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mx-auto mb-12 max-w-5xl">
          <div className="relative rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-800">
            <div
              className={`aspect-[16/9] overflow-hidden rounded-lg ${
                selectedDevice === "mobile"
                  ? "max-w-[400px]"
                  : selectedDevice === "tablet"
                    ? "max-w-[800px]"
                    : "w-full"
              } mx-auto`}
            >
              {currentDemo && (
                <Image
                  src={currentDemo.images[selectedDevice]}
                  alt={`${currentDemo.label} website ${selectedDevice} preview`}
                  width={1200}
                  height={800}
                  className="rounded-lg object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Customizable Designs",
            "Mobile Optimization",
            "Appointment Integration",
            "SEO-Friendly Design",
            "Secure & Reliable",
            "HIPAA Compliant",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800"
            >
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
              </div>
              <span className="font-medium text-slate-900 dark:text-white">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            Ready to create your website?
          </h3>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/digital-solutions/doctor/website-development/templates"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Explore Templates
            </Link>
            <Link
              href="/digital-solutions/doctor/website-development#contact"
              className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              Request a Free Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
