import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface SkillCardProps {
  skill: string;
  hanzi: string;
  description: string;
  activity: string;
  countLabel: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  badgeBg: string;
  badgeText: string;
}

export function SkillCard({
  skill,
  hanzi,
  description,
  activity,
  countLabel,
  href,
  icon: Icon,
  gradient,
  badgeBg,
  badgeText,
}: SkillCardProps) {
  return (
    <div className="glass-card p-6 flex flex-col justify-between gap-6 group hover:border-[#4F83F1]/50 transition-all">
      <div className="space-y-4">
        {/* Header icon and badges */}
        <div className="flex items-start justify-between">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white shadow-md shadow-[#4F83F1]/15 group-hover:scale-105 transition-transform`}
          >
            <Icon className="w-7 h-7" />
          </div>

          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeBg} ${badgeText}`}
          >
            {countLabel}
          </span>
        </div>

        {/* Titles */}
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold text-[#202A3B]">{skill}</h3>
            <span className="font-chinese text-base font-semibold text-[#4F83F1]">
              {hanzi}
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#778198] mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Suggested activity */}
        <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#E3EAF4] text-xs">
          <span className="font-semibold text-[#315FC7]">Hoạt động đề xuất: </span>
          <span className="text-[#202A3B]">{activity}</span>
        </div>
      </div>

      {/* Action CTA */}
      <Link
        href={href}
        className="w-full py-2.5 rounded-xl bg-white border border-[#E3EAF4] group-hover:bg-[#4F83F1] group-hover:text-white group-hover:border-[#4F83F1] text-xs md:text-sm font-bold text-[#202A3B] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>Bắt đầu luyện tập</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
