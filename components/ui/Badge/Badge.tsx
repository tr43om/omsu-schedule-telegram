import { twClassNames } from "@/utils";
import React from "react";

type BadgeProps = {
  label: string;
  size?: "badge-sm" | "badge-md" | "badge-lg";
  variant?: "primary" | "secondary";
};

//  label.toLowerCase() === "лаб" && "bg-indigo-200 text-white",
//  label.toLowerCase() === "лек" && "bg-red-200 text-white",
//  label.toLowerCase() === "прак" && "bg-orange-200 text-white",

const Badge = ({ label, size = "badge-sm", variant }: BadgeProps) => {
  return (
    <span
      className={twClassNames(
        "  rounded-md border-none bg-neutral px-2.5 py-0.5  font-medium text-white",

        size === "badge-sm" && "text-xs",
        size === "badge-md" && "px-3 py-1.5 text-xs",
        size === "badge-lg" && "text-md px-5 py-2",
        variant === "primary" && "bg-primaryGradient"
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
