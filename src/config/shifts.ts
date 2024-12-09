import { Sun, Moon } from 'lucide-react';

export type ShiftType = "AM" | "PM";

export const shifts = ["AM", "PM"] as const;

export const shiftThemes = {
  AM: {
    icon: Sun,
    bg: "bg-amber-50",
    selectedBg: "bg-amber-100",
    text: "text-amber-900",
    hover: "hover:bg-amber-100/70",
    iconColor: "text-amber-500"
  },
  PM: {
    icon: Moon,
    bg: "bg-blue-50",
    selectedBg: "bg-blue-100",
    text: "text-blue-900",
    hover: "hover:bg-blue-100/70",
    iconColor: "text-blue-500"
  }
} as const;