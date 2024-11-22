import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Convert any time format to seconds
// time-utils.ts
export const minutesToSeconds = (minutes: number): number => {
    return minutes * 60;
}

export const convertMinutesStringToSeconds = (duration: string): number => {
    // Convert "XX Minutes" to seconds
    return parseInt(duration.split(' ')[0]) * 60;
}

// For display only - used in UI
export const formatSecondsToDisplay = (totalSeconds: number): string => {
    if (!totalSeconds) return '0 Hours';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours === 0) {
        return `${minutes} Minutes`;
    } else if (minutes === 0) {
        return `${hours} Hours`;
    } else {
        return `${hours} Hours ${minutes} Minutes`;
    }
}