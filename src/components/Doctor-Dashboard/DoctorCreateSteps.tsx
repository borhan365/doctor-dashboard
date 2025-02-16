"use client";

import { useStepParams } from "@/hooks/useStepParams";
import { Step } from "@/types/step";
import {
  Briefcase,
  Building,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Import components with proper paths and exports
import { Chamber } from "@/components/Doctor-Dashboard/Chamber";
import { Congratulations } from "@/components/Doctor-Dashboard/Congratulations";
import { Education } from "@/components/Doctor-Dashboard/Education";
import { Experience } from "@/components/Doctor-Dashboard/Experience";
import { Payment } from "@/components/Doctor-Dashboard/Payment";
import { DoctorFormScreen } from "./DoctorFormScreen";

// Define step icons
const stepIcons = {
  "general-info": User,
  education: GraduationCap,
  experience: Briefcase,
  chamber: Building,
  payment: DollarSign,
  congratulations: Check,
} as const;

// Define steps with icons
const steps: Step[] = [
  {
    id: "general-info",
    title: "General Information",
    icon: stepIcons["general-info"],
  },
  { id: "education", title: "Education", icon: stepIcons["education"] },
  { id: "experience", title: "Experience", icon: stepIcons["experience"] },
  { id: "chamber", title: "Chamber Information", icon: stepIcons["chamber"] },
  { id: "payment", title: "Payment", icon: stepIcons["payment"] },
  {
    id: "congratulations",
    title: "Congratulations",
    icon: stepIcons["congratulations"],
  },
];

export default function DoctorCreateSteps() {
  const { currentStep, setStep } = useStepParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleStepComplete = (stepId: string) => {
    // For general-info step, validate required fields including doctor types
    if (stepId === "general-info") {
      // Add any specific validation you need for doctor types
      const formIsValid = validateForm(); // Implement this in your form validation logic
      if (!formIsValid) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    setCompletedSteps((prev) => [...prev, stepId]);
    const nextStepIndex = steps.findIndex((step) => step.id === stepId) + 1;
    if (nextStepIndex < steps.length) {
      setStep(steps[nextStepIndex].id);
    }
  };

  const canNavigateToStep = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const previousSteps = steps.slice(0, stepIndex);
    return previousSteps.every((step) => completedSteps.includes(step.id));
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderStep = () => {
    switch (currentStep) {
      case "general-info":
        return (
          <DoctorFormScreen onNext={() => handleStepComplete("general-info")} />
        );
      case "education":
        return <Education onNext={() => handleStepComplete("education")} />;
      case "experience":
        return <Experience onNext={() => handleStepComplete("experience")} />;
      case "chamber":
        return <Chamber onNext={() => handleStepComplete("chamber")} />;
      case "payment":
        return <Payment onNext={() => handleStepComplete("payment")} />;
      case "congratulations":
        return <Congratulations />;
      default:
        return (
          <DoctorFormScreen onNext={() => handleStepComplete("general-info")} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full">
        <div className="flex flex-col">
          {/* Top Action Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white p-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 block lg:hidden">
                {isSidebarOpen ? (
                  <X className="h-6 w-6 text-slate-600" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-600" />
                )}
              </button>
              <h1 className="text-lg font-semibold text-slate-800 md:text-xl">
                Create Doctor Profile
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => {
                  if (!isFirstStep) {
                    setStep(steps[currentStepIndex - 1].id);
                  }
                }}
                disabled={isFirstStep}
                className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 disabled:opacity-50 md:px-6 md:py-2.5"
              >
                <ChevronLeft className="h-4 w-4 md:mr-2 md:h-5 md:w-5" />
                <span className="hidden md:inline">Previous</span>
              </button>
              <button
                onClick={() => {
                  if (!isLastStep) {
                    setStep(steps[currentStepIndex + 1].id);
                  }
                }}
                disabled={isLastStep}
                className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 md:px-6 md:py-2.5"
              >
                <span className="hidden md:inline">
                  {isLastStep ? "Finish" : "Next"}
                </span>
                {!isLastStep && (
                  <ChevronRight className="h-4 w-4 md:ml-2 md:h-5 md:w-5" />
                )}
              </button>
            </div>
          </div>

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
                    disabled={!canNavigateToStep(step.id)}
                    onClick={() => {
                      if (canNavigateToStep(step.id)) {
                        setStep(step.id);
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`flex w-full items-center space-x-3 rounded-xl p-3 transition-all duration-200 ${
                      currentStep === step.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : completedSteps.includes(step.id)
                          ? "bg-green-50 text-green-600"
                          : "text-slate-600 hover:bg-slate-100"
                    } ${!canNavigateToStep(step.id) ? "cursor-not-allowed opacity-50" : ""}`}
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
