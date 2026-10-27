import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "normal" | "subtle" | "prominent";
  className?: string;
}

export function GlassPanel({
  children,
  intensity = "normal",
  className,
  ...props
}: GlassPanelProps) {
  const intensityClass = {
    subtle: "glass-panel-subtle",
    normal: "glass-panel",
    prominent:
      "bg-white/85 backdrop-blur-2xl border border-white shadow-xl shadow-[#315FC7]/08 rounded-2xl",
  }[intensity];

  return (
    <div className={cn(intensityClass, "p-6", className)} {...props}>
      {children}
    </div>
  );
}
