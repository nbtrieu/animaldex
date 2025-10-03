import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ConservationStatus } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getConservationColor(status?: ConservationStatus): string {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  const normalizedStatus = typeof status === 'string' 
    ? status.toUpperCase().replace(/ /g, '_') 
    : status;
  
  const colors: Record<string, string> = {
    'LEAST_CONCERN': 'bg-green-100 text-green-800',
    'NEAR_THREATENED': 'bg-yellow-100 text-yellow-800',
    'VULNERABLE': 'bg-orange-100 text-orange-800',
    'ENDANGERED': 'bg-red-100 text-red-800',
    'CRITICALLY_ENDANGERED': 'bg-red-200 text-red-900',
    'EXTINCT_WILD': 'bg-purple-100 text-purple-800',
    'EXTINCT': 'bg-gray-200 text-gray-900',
  };
  
  return colors[normalizedStatus] || 'bg-gray-100 text-gray-800';
}

export function formatConservationStatus(status?: ConservationStatus): string {
  if (!status) return '';
  return status.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');
}