"use client";

import { useStepParams } from "@/hooks/useStepParams";
import { Step } from "@/types/step";
import { Check, Menu, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Import components with proper paths and exports
import { DoctorFormData } from "@/types/doctors";
import { DoctorFormScreen } from "./DoctorFormScreen";
import DoctorSEOSection from "./DoctorSEOSection";
import { FaqTab } from "./FaqSection";

// Define step icons
const stepIcons = {
  "general-info": User,
  congratulations: Check,
  seo: Menu,
  faq: Sparkles,
} as const;

// Define steps with icons
const steps: Step[] = [
  {
    id: "general-info",
    title: "General Information",
    icon: stepIcons["general-info"],
  },
  { id: "faq", title: "FAQs", icon: stepIcons["faq"] },
  { id: "seo", title: "SEO", icon: stepIcons["seo"] },
];

const validateGeneralInfo = (formData: DoctorFormData) => {
  const requiredFields = {
    name: "Name",
    bmdcNumber: "BMDC Number",
    emailAddresses: "Email Address",
    phoneNumbers: "Phone Number",
    prefixId: "Prefix",
    doctorTypeId: "Doctor Type",
    specialists: "Specialization",
    degrees: "Degree",
    languages: "Language",
  };

  const errors: string[] = [];

  Object.entries(requiredFields).forEach(([field, label]) => {
    if (field === "emailAddresses" || field === "phoneNumbers") {
      if (
        !formData[field] ||
        formData[field].length === 0 ||
        !formData[field][0]
      ) {
        errors.push(`${label} is required`);
      }
    } else if (
      field === "specialists" ||
      field === "degrees" ||
      field === "languages"
    ) {
      if (!formData[field] || formData[field].length === 0) {
        errors.push(`At least one ${label} is required`);
      }
    } else if (!formData[field as keyof DoctorFormData]) {
      errors.push(`${label} is required`);
    }
  });

  return errors;
};

const validateFaqs = (formData: DoctorFormData) => {
  if (!formData.faqs || formData.faqs.length === 0) {
    return ["At least one FAQ is required"];
  }

  const errors: string[] = [];
  formData.faqs.forEach((faq, index) => {
    if (!faq.question || !faq.answer || !faq.bnQuestion || !faq.bnAnswer) {
      errors.push(
        `FAQ #${index + 1} must have both English and Bengali content`,
      );
    }
  });

  return errors;
};

interface Props {
  formData: DoctorFormData;
  onFormChange: (data: DoctorFormData) => void;
  onStepComplete: (stepId: string) => void;
}

export default function DoctorCreateSteps({
  formData,
  onFormChange,
  onStepComplete,
}: Props) {
  const { currentStep, setStep } = useStepParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleStepComplete = (stepId: string) => {
    if (stepId === "general-info") {
      // Add any specific validation you need for doctor types
      const formIsValid = validateGeneralInfo(formData).length === 0;
      if (!formIsValid) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    if (stepId === "faq") {
      const faqErrors = validateFaqs(formData);
      if (faqErrors.length > 0) {
        faqErrors.forEach((error) => toast.error(error));
        return;
      }
    }

    setCompletedSteps((prev) => [...prev, stepId]);
    onStepComplete(stepId);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderStep = () => {
    switch (currentStep) {
      case "general-info":
        return (
          <DoctorFormScreen
            formData={formData}
            onFormChange={onFormChange}
            onNext={() => handleStepComplete("general-info")}
          />
        );
      case "seo":
        return (
          <DoctorSEOSection
            formData={formData}
            onFormChange={(key: string, value: any) => {
              onFormChange({ ...formData, [key]: value });
            }}
            onNext={() => handleStepComplete("seo")}
          />
        );
      case "faq":
        return (
          <FaqTab
            formData={formData}
            onChange={onFormChange}
            onNext={() => handleStepComplete("faq")}
          />
        );
      default:
        return (
          <DoctorFormScreen
            formData={formData}
            onFormChange={onFormChange}
            onNext={() => handleStepComplete("general-info")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div
              className={`
              fixed inset-y-0 left-0 z-10 w-72 transform border-r border-slate-200 bg-slate-50 p-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
              <div className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setStep(step.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex w-full items-center space-x-3 rounded-xl p-3 transition-all duration-200 ${
                      currentStep === step.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : completedSteps.includes(step.id)
                          ? "bg-green-50 text-green-600"
                          : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 ${
                        currentStep === step.id
                          ? "bg-blue-500"
                          : completedSteps.includes(step.id)
                            ? "bg-green-100"
                            : "bg-slate-100"
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-4 md:p-6 lg:p-8">
              <div className="mx-auto max-w-4xl">
                {/* Step Content */}
                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
