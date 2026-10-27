"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { WritingPracticeView } from "@/components/practice/WritingPracticeView";

export default function WritingPracticePage() {
  return (
    <AppShell
      title="Luyện Viết (写作)"
      subtitle="Tập viết chữ Hán trên ô điền tự cảm ứng và ghép câu củng cố ngữ pháp"
    >
      <div className="space-y-6">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trung tâm luyện tập</span>
        </Link>

        <WritingPracticeView />
      </div>
    </AppShell>
  );
}
