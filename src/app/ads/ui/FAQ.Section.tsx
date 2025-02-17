"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the position-based advertising system work?",
    answer:
      "Our position-based advertising system offers three premium spots (1st, 2nd, and 3rd positions) in search results for your specialty. When patients search for doctors in your specialty, your profile will appear in your chosen position, giving you enhanced visibility. The higher your position, the more prominent your profile appears in search results.",
  },
  {
    question: "What are the benefits of advertising on Healtha?",
    answer:
      "Advertising on Healtha offers multiple benefits: increased visibility in search results, priority placement in your specialty category, verified profile badge, enhanced credibility, more patient inquiries, detailed analytics dashboard, and priority support. Our platform receives over 300,000 monthly visitors, ensuring maximum exposure for your practice.",
  },
  {
    question: "How long is the advertising period?",
    answer:
      "Our advertising plans are offered on an annual basis. Once you secure your position, it's guaranteed for the entire year. This long-term commitment helps maintain consistency in your online presence and allows for better return on investment. Your position is secured as soon as your payment is confirmed.",
  },
  {
    question: "Can I change my advertising position later?",
    answer:
      "Yes, you can upgrade to a higher position if it becomes available. However, availability is on a first-come, first-served basis. We recommend securing your preferred position as soon as possible. If you wish to downgrade, you can do so when your current term expires.",
  },
  {
    question: "How will patients know my profile is verified?",
    answer:
      "Advertised profiles feature a prominent 'Ads' label and verification badge, indicating your profile has been verified by Healtha. This helps build trust with potential patients while maintaining transparency about the promotional nature of the placement.",
  },
  {
    question: "What analytics and insights will I receive?",
    answer:
      "You'll have access to a comprehensive analytics dashboard showing profile views, patient inquiries, click-through rates, and engagement metrics. This helps you track the performance of your advertising investment and understand patient behavior patterns.",
  },
  {
    question:
      "Is there a limit to how many doctors can advertise in each specialty?",
    answer:
      "Yes, we maintain exclusivity by limiting advertising positions to just three spots per specialty. This ensures advertisers receive maximum value and visibility. Positions are allocated on a first-come, first-served basis.",
  },
  {
    question: "What happens after my advertising period ends?",
    answer:
      "You'll have the first right to renew your position for another year. We'll notify you well in advance of your term's expiration. If you choose not to renew, your profile will return to standard listing placement.",
  },
  {
    question: "Can I cancel my advertisement and get a refund?",
    answer:
      "Once your position is secured and activated, the commitment is for the full year. We don't offer refunds for cancelled advertisements as positions are held exclusively for you during this period. This policy helps maintain stability in our advertising system.",
  },
  {
    question: "How do I get started with advertising?",
    answer:
      "Getting started is simple! Choose your preferred position (1st, 2nd, or 3rd), complete the payment, and your enhanced visibility will be activated within 24 hours. Our support team will guide you through the process and help optimize your profile for maximum impact.",
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
          Common questions about advertising on Healtha
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
          <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">
            Have more questions about advertising on Healtha? <br />
            <span className="text-base text-[#128C7E] dark:text-slate-400">
              Please message or directly call us.
            </span>
          </p>
          <a
            href="https://wa.me/01851590081"
            className="inline-flex items-center justify-center rounded-lg bg-[#128C7E] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#128C7E] dark:bg-[#25D366] dark:hover:bg-[#128C7E]"
          >
            <BsWhatsapp className="h-5 w-5" />
            <span className="ml-2">01851590081</span>
          </a>
        </div>
      </div>
    </section>
  );
}
