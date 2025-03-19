import TextEditor from "@/components/Globals/TextEditor";
import { DoctorFormData } from "@/types/doctors";
import { ChevronDown, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface FAQsProps {
  formData: DoctorFormData;
  onChange: (data: DoctorFormData) => void;
  onNext: () => void;
}

interface FAQ {
  question: string;
  answer: string;
  bnQuestion: string;
  bnAnswer: string;
}

export function FaqSection({ formData, onChange }: FAQsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([0]);
  const [faqs, setFaqs] = useState<FAQ[]>(
    formData.faqs?.length > 0
      ? formData.faqs
      : [
          {
            question: "",
            answer: "",
            bnQuestion: "",
            bnAnswer: "",
          },
        ],
  );

  const addFAQ = () => {
    const newFaqs = [
      ...faqs,
      {
        question: "",
        answer: "",
        bnQuestion: "",
        bnAnswer: "",
      },
    ];
    setFaqs(newFaqs);
    updateFormData(newFaqs);
    setExpandedFaqs([newFaqs.length - 1]);
  };

  const removeFAQ = (index: number) => {
    if (faqs.length > 1) {
      const updatedFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(updatedFaqs);
      updateFormData(updatedFaqs);
    } else {
      toast.error("At least one FAQ is required");
    }
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq,
    );
    setFaqs(updatedFaqs);
    updateFormData(updatedFaqs);
  };

  const updateFormData = (updatedFaqs: FAQ[]) => {
    onChange({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Clickable header */}
      <div
        className="flex cursor-pointer items-center justify-between p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Click to manage your FAQs in English and Bengali
          </p>
        </div>
        <ChevronDown
          className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="border-t border-slate-200 p-6">
          {/* Description */}
          <div className="mb-6 flex items-center justify-start gap-2 rounded-lg bg-blue-50 p-3">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <p className="text-sm leading-5 text-slate-600">
              Create comprehensive FAQs to address common patient queries. Clear
              and detailed answers help visitors find the information they need
              quickly.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-white"
              >
                {/* FAQ Header */}
                <div
                  className="flex cursor-pointer items-center justify-between p-3"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900">
                      {faq.question || faq.bnQuestion || `FAQ #${index + 1}`}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {faqs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFAQ(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedFaqs.includes(index) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* FAQ Content */}
                {expandedFaqs.includes(index) && (
                  <div className="border-t border-slate-200 p-3">
                    {/* Language Tabs */}
                    <div className="flex w-fit space-x-1 rounded-lg bg-slate-100 p-1">
                      <button
                        onClick={() => setActiveTab("en")}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                          activeTab === "en"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setActiveTab("bn")}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                          activeTab === "bn"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        বাংলা
                      </button>
                    </div>

                    <div className="mt-3 space-y-3">
                      {activeTab === "en" ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700">
                              Question
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) =>
                                updateFAQ(index, "question", e.target.value)
                              }
                              className="w-full rounded-md border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-0 focus:ring-0"
                              placeholder="Enter the question in English"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <TextEditor
                              label="Answer"
                              value={faq.answer}
                              onChange={(value) =>
                                updateFAQ(index, "answer", value)
                              }
                              height="min-h-[50px]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700">
                              প্রশ্ন
                            </label>
                            <input
                              type="text"
                              value={faq.bnQuestion}
                              onChange={(e) =>
                                updateFAQ(index, "bnQuestion", e.target.value)
                              }
                              className="w-full rounded-md border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-0 focus:ring-0"
                              placeholder="বাংলায় প্রশ্ন লিখুন"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <TextEditor
                              label="উত্তর"
                              value={faq.bnAnswer}
                              onChange={(value) =>
                                updateFAQ(index, "bnAnswer", value)
                              }
                              height="min-h-[150px]"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addFAQ}
              type="button"
              className="mt-4 flex w-full items-center justify-center rounded-lg border border-dashed border-blue-200 p-3 text-sm font-medium text-blue-600 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-600 dark:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New FAQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FaqSection;
