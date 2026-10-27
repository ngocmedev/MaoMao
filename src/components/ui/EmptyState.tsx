import React from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "glass-panel-subtle flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-[#CBD6E4]",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#EAF4FF] flex items-center justify-center text-[#4F83F1] mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-[#202A3B]">{title}</h3>
      <p className="text-xs md:text-sm text-[#778198] max-w-sm mt-1 mb-5 leading-relaxed">
        {description}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="px-4 py-2 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-semibold shadow-md shadow-[#4F83F1]/20 transition-all cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function LoadingState({ message = "Đang tải dữ liệu..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-9 h-9 border-3 border-[#E3EAF4] border-t-[#4F83F1] rounded-full animate-spin" />
      <span className="text-xs font-medium text-[#778198]">{message}</span>
    </div>
  );
}
