"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ReadingPracticeView } from "@/components/practice/ReadingPracticeView";

export default function ReadingPracticePage() {
  return (
    <AppShell
      title="Luyện Đọc (阅读)"
      subtitle="Đọc văn bản đối chiếu, tra từ tức thì và làm bài kiểm tra hiểu bài"
    >
      <div className="space-y-6">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trung tâm luyện tập</span>
        </Link>

        <ReadingPracticeView />
      </div>
    </AppShell>
  );
}
