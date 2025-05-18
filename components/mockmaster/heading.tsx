"use client";

import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor || "bg-purple-100")}>
        {icon || <UserCheck className={cn("w-10 h-10", iconColor || "text-purple-700")} />}
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};