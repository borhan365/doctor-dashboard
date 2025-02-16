"use client";
import type { FAQ } from "@/types/faq";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FaqSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
}

export default function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  description = "Common questions about the hospital and its services",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  // Validate and filter FAQs
  const validFaqs = faqs?.filter(
    (faq): faq is FAQ =>
      typeof faq === "object" &&
      faq !== null &&
      typeof faq.question === "string" &&
      typeof faq.answer === "string" &&
      faq.question.trim() !== "" &&
      faq.answer.trim() !== "",
  );

  if (!validFaqs?.length) {
    return null;
  }

  const visibleFaqs = showAll ? validFaqs : validFaqs.slice(0, 4);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h2>
        <p className="text-base text-slate-600">{description}</p>
      </div>

      <div className="relative">
        <div
          className={`space-y-4 ${
            !showAll && validFaqs.length > 4
              ? "max-h-[600px] overflow-hidden"
              : ""
          }`}
        >
          {visibleFaqs.map((faq, index) => (
            <div
              key={`faq-${index}`}
              className="overflow-hidden rounded-lg border border-slate-200 transition-all duration-300"
            >
              <button
                className="flex w-full items-center justify-between bg-white px-4 py-4 text-left transition-colors hover:bg-slate-50 sm:px-6"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span
                  className={`text-base font-medium sm:text-md ${
                    openIndex === index ? "text-blue-600" : "text-slate-900"
                  }`}
                >
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  )}
                </span>
              </button>

              <div
                className={`transform overflow-hidden bg-white transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[500px] border-t border-slate-200 px-4 py-4 opacity-100 sm:px-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="descriptions !p-0"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>

        {validFaqs.length > 4 && (
          <>
            {!showAll && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
            )}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                {showAll ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
