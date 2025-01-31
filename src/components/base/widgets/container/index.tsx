"use client";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`@container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 ${className}`}
    >
      {children}
    </div>
  );
}
