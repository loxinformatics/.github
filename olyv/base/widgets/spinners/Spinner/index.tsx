"use client";

import { useBase } from "../../../app";

export default function Spinner({
  borderSize,
  borderColor,
}: {
  borderSize?: "small" | "medium" | "large";
  borderColor?: string;
}) {
  const { borderPrimary } = useBase();
  const color = borderColor || borderPrimary;

  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  const size = sizeClasses[borderSize || "medium"];

  return (
    <div
      className={`${size} ${color} border-t-transparent dark:border-t-transparent rounded-full animate-spin`}
      aria-label="Loading spinner"
    ></div>
  );
}
