"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ListeningPracticeView } from "@/components/practice/ListeningPracticeView";

export default function ListeningPracticePage() {
  return (
    <AppShell
      title="Luyện Nghe (听力)"
      subtitle="Nghe phát âm chuẩn tiếng Hán và rèn luyện phản xạ nghe hiểu"
    >
      <div className="space-y-6">
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#202A3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trung tâm luyện tập</span>
        </Link>

        <ListeningPracticeView />
      </div>
    </AppShell>
  );
}
