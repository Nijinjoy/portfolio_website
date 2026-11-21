import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  return `${baseUrl}${path}`;
}

/** Two-digit editorial index: 1 -> "01". */
export function pad(value: number) {
  return String(value).padStart(2, "0");
}
