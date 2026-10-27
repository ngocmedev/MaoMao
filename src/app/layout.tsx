import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastContext";

export const metadata: Metadata = {
  title: "MaoMao - Học tiếng Trung, nhẹ nhàng mỗi ngày",
  description:
    "Không gian học tiếng Trung hiện đại, tinh tế cho người Việt. Nhập giáo trình có cấu trúc từ Gemini, ôn từ vựng thông minh và rèn luyện 4 kỹ năng Nghe - Nói - Đọc - Viết.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f83f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F7F9FD] text-[#202A3B] antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
