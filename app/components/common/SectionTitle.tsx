import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  center?: boolean;
  className?: string;
}

const SectionTitle = ({
  children,
  as: Tag = "h2",
  center = false,
  className = "",
}: SectionTitleProps) => {
  return (
    <Tag
      className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-extrabold text-tertiary leading-tight mb-4",
        center && "text-center",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default SectionTitle;
