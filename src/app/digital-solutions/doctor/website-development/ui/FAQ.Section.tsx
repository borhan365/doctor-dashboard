"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's included in each website plan?",
    answer:
      "Each plan includes different features tailored to your practice size. The Starter plan ($29/month) includes a professional website, basic appointment form, and local SEO. The Professional plan ($69/month) adds online booking, patient portal, and advanced SEO. The Enterprise plan ($149/month) includes HIPAA-compliant hosting, multi-location support, and custom integrations.",
  },
  {
    question: "Can I customize my medical website design?",
    answer:
      "Yes! All plans include customization options. You can personalize colors, layouts, and content to match your practice's branding. The Professional and Enterprise plans offer more advanced customization options, including custom integrations and multi-location support.",
  },
  {
    question: "Is there a setup fee or long-term contract?",
    answer:
      "No setup fees or long-term contracts required. All plans are billed monthly or annually (save up to 20% with annual billing), and you can cancel anytime. We offer a 30-day money-back guarantee to ensure your satisfaction.",
  },
  {
    question: "How secure are your medical websites?",
    answer:
      "All our websites are built with security in mind. We provide SSL certificates, secure hosting, and regular security updates. The Enterprise plan includes HIPAA-compliant hosting for handling sensitive patient data. We follow industry best practices for data protection and privacy.",
  },
  {
    question: "Do you offer SEO optimization for medical practices?",
    answer:
      "Yes! Every plan includes SEO features. The Starter plan includes basic local SEO setup. The Professional plan adds advanced SEO tools for better rankings. The Enterprise plan includes comprehensive SEO optimization and marketing automation to help attract more patients.",
  },
  {
    question: "Can patients book appointments through the website?",
    answer:
      "The Starter plan includes a basic appointment inquiry form. The Professional and Enterprise plans feature a full online booking system that integrates with your practice management software, allowing patients to schedule appointments 24/7.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "All plans include technical support. Starter plan users get email support during business hours. Professional plan users receive priority support with faster response times. Enterprise plan users enjoy 24/7 premium support and a dedicated account manager.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time through your dashboard. When upgrading, you'll get immediate access to new features. If downgrading, changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial of our Professional plan. This gives you access to all core features including online booking, patient portal, and advanced SEO tools. No credit card required to start your trial.",
  },
  {
    question: "How long does it take to set up my medical website?",
    answer:
      "With our templates and setup wizard, you can have a basic website running in a few hours. For custom designs and integrations (Professional and Enterprise plans), we typically complete the setup within 1-2 weeks. Our team assists with content migration and setup throughout the process.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-900 dark:to-slate-950">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent dark:from-slate-800/50" />

      <div className="container relative mx-auto max-w-4xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mb-8 text-center text-slate-600 dark:text-slate-400">
          Everything you need to know about our medical website solutions
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-800"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="border-t border-slate-100 px-6 py-4 text-slate-600 dark:border-slate-700 dark:text-slate-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Still have questions about our website solutions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
