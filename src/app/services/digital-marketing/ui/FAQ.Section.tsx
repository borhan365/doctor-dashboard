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
    question:
      "What digital marketing services do you offer for healthcare providers?",
    answer:
      "We offer comprehensive digital marketing services including Local SEO optimization, Social Media Management, Google & Meta Ads campaigns, Content Marketing, Review Management, Email Marketing, and Video Marketing. Our services are specifically tailored for healthcare providers, ensuring HIPAA compliance and medical industry best practices.",
  },
  {
    question: "How much should I budget for healthcare digital marketing?",
    answer:
      "Our plans start at $499/month for essential services and scale up based on your needs. The Growth plan ($999/month) includes comprehensive marketing services, while our Premium plan ($1,999/month) offers multi-location support and advanced features. We recommend choosing a plan based on your practice size and growth goals.",
  },
  {
    question: "How long does it take to see results from digital marketing?",
    answer:
      "While some results can be seen immediately (especially with paid advertising), sustainable growth typically takes 3-6 months. SEO efforts usually show significant results within 4-6 months, while social media and content marketing build momentum over time. We provide monthly reports to track progress and optimize strategies accordingly.",
  },
  {
    question: "Is your healthcare marketing HIPAA compliant?",
    answer:
      "Yes, absolutely! All our marketing strategies and campaigns are designed with HIPAA compliance in mind. We have strict protocols for handling patient information, and our team is trained in healthcare privacy regulations. This ensures your marketing efforts maintain patient confidentiality while effectively promoting your practice.",
  },
  {
    question: "Do you handle social media posting and content creation?",
    answer:
      "Yes! Our Growth and Premium plans include comprehensive social media management with daily posts, engagement monitoring, and content creation. We create medical content that engages patients while maintaining professional standards. This includes blog posts, infographics, social media content, and video content for Premium plan subscribers.",
  },
  {
    question: "How do you measure the success of digital marketing campaigns?",
    answer:
      "We track multiple KPIs including website traffic, search rankings, lead generation, patient inquiries, social media engagement, and ROI from advertising campaigns. You'll receive detailed monthly reports showing these metrics, along with insights and recommendations for ongoing optimization.",
  },
  {
    question: "Can you help with Google Ads and Meta (Facebook) advertising?",
    answer:
      "Yes! We manage both Google Ads and Meta advertising campaigns, with dedicated ad spend management included in our Growth ($500/month) and Premium ($1000/month) plans. Our team optimizes campaigns for healthcare keywords and audience targeting to maximize your return on ad spend.",
  },
  {
    question: "Do you provide reputation management services?",
    answer:
      "Yes, our Growth and Premium plans include active review management. We monitor your online reviews across various platforms, help generate positive reviews from satisfied patients, respond to feedback professionally, and help maintain your practice's online reputation.",
  },
  {
    question: "What makes your healthcare marketing services different?",
    answer:
      "Our focus is exclusively on healthcare providers, giving us deep industry expertise. We understand medical marketing regulations, HIPAA requirements, and patient acquisition strategies. Our team stays updated with healthcare marketing trends and uses proven strategies specifically designed for medical practices.",
  },
  {
    question: "Can I upgrade or change my marketing plan later?",
    answer:
      "Yes! You can upgrade, downgrade, or modify your plan at any time. As your practice grows or your needs change, we'll help you transition to the most suitable plan. We also offer custom solutions for practices with specific requirements not covered in our standard plans.",
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
          Common questions about our healthcare digital marketing services
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
          <p className="mb-4 text-slate-600 dark:text-slate-400 text-lg">
            Have more questions about our digital marketing services?{" "}
            <br />
            <span className="text-base text-[#128C7E] dark:text-slate-400">
              Please message or directly call us.
            </span>
          </p>
          <a
            href="https://wa.me/01851590081"
            className="inline-flex items-center justify-center rounded-lg bg-[#128C7E] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#128C7E] dark:bg-[#25D366] dark:hover:bg-[#128C7E]"
          >
            {/* whatsapp icon */}
            <BsWhatsapp className="h-5 w-5" />
            <span className="ml-2">01851590081</span>
          </a>
        </div>
      </div>
    </section>
  );
}
