import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Fonction pour fusionner les classes Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format de date
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
