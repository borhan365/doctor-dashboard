"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Doctor Digital Solutions?",
    answer:
      "Doctor Digital Solutions is an all-in-one platform providing services like prescription management, doctor websites, digital marketing, and more. We help doctors streamline their practice and grow their business with modern digital tools.",
  },
  {
    question: "How do I get started with your solutions?",
    answer:
      "It's simple! Choose the plan that fits your needs, sign up, and follow the instructions to set up your account. Our team will guide you through the installation process and provide training if required.",
  },
  {
    question: "Do I need technical knowledge to use these tools?",
    answer:
      "Not at all. Our systems are designed to be user-friendly and intuitive, with step-by-step onboarding. If you face any issues, our support team is available to assist.",
  },
  {
    question: "Is my data secure with Doctor Digital Solutions?",
    answer:
      "Absolutely. We use industry-standard security measures to ensure that your data is safe. All patient and practice data are encrypted and stored securely.",
  },
  {
    question: "Can I customize the services to fit my practice?",
    answer:
      "Yes! Our Pro and Enterprise plans offer customization options. Whether it's your website design, prescription system, or additional features, we can tailor the solutions to your needs.",
  },
  {
    question: "What if I want to upgrade or change my plan?",
    answer:
      "You can upgrade or change your plan anytime from your dashboard. If you need assistance, contact our support team for a smooth transition.",
  },
  {
    question: "Do you offer support after purchase?",
    answer:
      "Yes, all our plans come with customer support. Basic plan users get email support, while Pro and Enterprise users receive priority live chat and 24/7 premium support.",
  },
  {
    question: "Can I integrate these solutions with other tools I use?",
    answer:
      "Yes, our Enterprise plan supports integrations with third-party tools, hospital systems, and custom APIs. Let us know your requirements, and we'll make it happen.",
  },
  {
    question: "Do you provide a free trial?",
    answer:
      "Yes, we offer a 1-month free trial for the Pro plan. This allows you to explore the features and see how it benefits your practice.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime. Your data will remain secure, and you'll have access to it for a limited time after cancellation.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // First question expanded by default

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-900 dark:to-slate-950">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent dark:from-slate-800/50" />

      <div className="container relative mx-auto max-w-4xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mb-8 text-center text-slate-600 dark:text-slate-400">
          {`Have questions about Doctor Digital Solutions? We've got you covered!`}
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
            Still have questions? Contact us here.
          </p>
          <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
}
