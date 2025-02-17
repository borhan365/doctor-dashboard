"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  practice: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    practice: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-900 dark:to-slate-950 lg:py-20">
      {/* Decorative blobs and shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left blob */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl dark:bg-blue-950/30" />
        {/* Bottom-right blob */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl dark:bg-blue-950/30" />

        {/* Decorative circles */}
        <div className="absolute left-1/4 top-20 h-6 w-6 rounded-full bg-blue-200/30 dark:bg-blue-400/10" />
        <div className="absolute right-1/4 top-40 h-4 w-4 rounded-full bg-blue-300/40 dark:bg-blue-400/20" />
        <div className="absolute bottom-20 left-1/3 h-8 w-8 rounded-full bg-blue-100/50 dark:bg-blue-400/10" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5 dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 0), linear-gradient(180deg, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-6 py-2 dark:bg-blue-950/50">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Let's Connect
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ready to Digitalize Your Chamber?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Transform your practice with our digital marketing expertise
          </p>
        </div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-5xl">
          {/* Contact Form Card */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-md border border-slate-100 dark:bg-slate-800">
            <div className="grid lg:grid-cols-5">
              {/* Contact Info Sidebar */}
              <div className="bg-blue-50 px-8 py-12 text-white dark:bg-blue-500 lg:col-span-2">
                <h3 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
                  Contact Details
                </h3>
                <div className="space-y-8 border-t border-blue-100 pt-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 dark:bg-blue-400">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">
                        Phone
                      </p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        +8801851590081
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 dark:bg-blue-400">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">
                        Email
                      </p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        contact@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 dark:bg-blue-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">
                        Office
                      </p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        123 Healthcare Ave,
                        <br />
                        Medical District, NY 10001
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 space-y-4 border-t border-blue-100 pt-8">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-slate-900 dark:text-white">
                      Healthcare Marketing Specialists
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-slate-900 dark:text-white">
                      HIPAA Compliant
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="p-8 lg:col-span-3 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                        placeholder="Dr. John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                        Practice Name
                      </label>
                      <input
                        type="text"
                        value={formData.practice}
                        onChange={(e) =>
                          setFormData({ ...formData, practice: e.target.value })
                        }
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                        placeholder="Your Practice Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                      placeholder="Tell us about your practice and marketing goals..."
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      Schedule Free Consultation
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
