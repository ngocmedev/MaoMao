"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ImportView } from "@/components/import/ImportView";

export default function ImportLessonPage() {
  return (
    <AppShell
      title="Nhập tài liệu học"
      subtitle="Chuyển đổi dữ liệu trích xuất từ Gemini thành bài học hoàn chỉnh"
    >
      <ImportView />
    </AppShell>
  );
}
