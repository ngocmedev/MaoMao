"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SpeakingPracticeView } from "@/components/practice/SpeakingPracticeView";

export default function SpeakingPracticePage() {
  return (
    <AppShell
      title="Luyện Nói (口语)"
      subtitle="Luyện khẩu ngữ, ngữ điệu và phát âm chuẩn các thanh điệu tiếng Trung"
    >
      <div className="space-y-6">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trung tâm luyện tập</span>
        </Link>

        <SpeakingPracticeView />
      </div>
    </AppShell>
  );
}
