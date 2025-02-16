"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useStepParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setStep = useCallback(
    (step: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("step", step);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const currentStep = searchParams.get("step") || "general-info";

  return {
    currentStep,
    setStep,
  };
}
