"use client";

import type { AlertProps } from "../../../types/base";

export default function Alert({ children, status }: AlertProps) {
  let border;
  let textColor;
  let bg;

  /*
   * border colors I used for example bootstrap's '--bs-danger-border-subtle' for the light and dark,
   * text color - --bs-success-text-emphasis,
   */

  switch (status) {
    case "success":
      border = "border border-[#a3cfbb] dark:border-[#0f5132]";
      textColor = "text-[#0a3622] dark:text-[#75b798]";
      bg = "bg-[#d1e7dd] dark:bg-[#051b11]";
      break;

    case "error":
      border = "border border-[#f1aeb5] dark:border-[#842029]";
      textColor = "text-[#58151c] dark:text-[#ea868f]";
      bg = "bg-[#f8d7da] dark:bg-[#2c0b0e]";

      break;

    default:
      border = "";
      textColor = "";
      bg = "";
      break;
  }
  return (
    <div
      className={`relative p-4 rounded-md text-center ${border} ${textColor} ${bg}`}
    >
      {children}
    </div>
  );
}
