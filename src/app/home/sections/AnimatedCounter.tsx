"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "white" | "blue" | "slate";
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  className,
  size = "lg",
  color = "white",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const timePassed = Date.now() - start;
      const progress = Math.min(timePassed / duration, 1);

      countRef.current = Math.floor(end * progress);
      setCount(countRef.current);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [end, duration]);

  const sizeClasses = {
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-6xl",
  };

  const colorClasses = {
    white: "text-white dark:text-white",
    blue: "text-blue-600 dark:text-blue-400",
    slate: "text-slate-900 dark:text-white",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center font-bold tracking-tight",
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
      // Accessibility attributes
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="tabular-nums">{count.toLocaleString()}</span>
      {suffix && (
        <span
          className={cn(
            "ml-1",
            size === "sm" && "text-xl sm:text-2xl",
            size === "md" && "text-2xl sm:text-3xl",
            size === "lg" && "text-3xl sm:text-4xl",
            size === "xl" && "text-4xl sm:text-5xl",
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
