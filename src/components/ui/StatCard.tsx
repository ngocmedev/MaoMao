import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  className?: string;
  badge?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-[#4F83F1]",
  iconBg = "bg-[#EAF4FF]",
  className,
  badge,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-5 flex items-start justify-between gap-4 relative overflow-hidden",
        className
      )}
    >
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#778198] truncate">{title}</span>
          {badge && (
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#EAF4FF] text-[#315FC7]">
              {badge}
            </span>
          )}
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-[#202A3B] tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-[#778198] flex items-center gap-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className={cn("p-3 rounded-2xl shrink-0 shadow-xs", iconBg)}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
    </div>
  );
}
