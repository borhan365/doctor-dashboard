import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Add this function for className merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Your existing generateOTP function
export function generateOTP(length: number = 6): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Format a number as currency
 * @param amount The amount to format
 * @param currency The currency code (e.g., 'BDT', 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = "BDT",
): string {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
