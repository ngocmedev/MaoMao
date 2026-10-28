"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  ArrowLeft,
  UserCheck,
} from "lucide-react";
import { MaoMaoLogo } from "@/components/ui/MaoMaoLogo";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { login, loginAsDemo, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập địa chỉ email.");
      return;
    }
    if (!password) {
      setErrorMessage("Vui lòng nhập mật khẩu.");
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      showToast({
        type: "success",
        title: "Đăng nhập thành công!",
        message: "Chào mừng bạn đã trở lại không gian học MaoMao.",
      });
      router.push(redirectUrl);
    } else {
      setErrorMessage(result.error || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  const handleDemoLogin = async () => {
    setIsDemoSubmitting(true);
    setErrorMessage("");
    await loginAsDemo();
    setIsDemoSubmitting(false);

    showToast({
      type: "success",
      title: "Đăng nhập tài khoản Demo!",
      message: "Bạn đang trải nghiệm với tài khoản mẫu Minh Anh (HSK 2).",
    });
    router.push(redirectUrl);
  };

  return (
    <div className="w-full max-w-md">
      {/* Top back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#778198] hover:text-[#315FC7] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại trang chủ</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="glass-panel p-8 shadow-xl border border-white/90 bg-white/80">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center mb-1">
            <MaoMaoLogo />
          </div>
          <h1 className="text-2xl font-black text-[#202A3B] tracking-tight">
            Chào mừng trở lại!
          </h1>
          <p className="text-xs sm:text-sm text-[#778198]">
            Đăng nhập để tiếp tục hành trình học tiếng Trung của bạn
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-[#EAF4FF] to-[#EEE9FF] border border-[#D0E4FF] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#4F83F1] shadow-xs shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#202A3B] truncate">
                Tài khoản Demo (HSK 2)
              </div>
              <div className="text-[11px] text-[#778198] truncate">
                Minh Anh • Đầy đủ dữ liệu mẫu
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isDemoSubmitting || isSubmitting}
            className="px-3 py-1.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs font-bold shrink-0 transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
          >
            {isDemoSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <span>Vào nhanh</span>
            )}
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-[#E3EAF4] w-full" />
          <span className="bg-white/90 px-3 text-[11px] font-semibold text-[#9BA6BA] uppercase tracking-wider absolute">
            hoặc đăng nhập với email
          </span>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-[#FDEEF0] border border-[#F9C3C8] text-[#D95D67] text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#202A3B] mb-1.5">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vidu: ban@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#202A3B]">
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() =>
                  showToast({
                    type: "info",
                    title: "Mẹo đăng nhập",
                    message: "Với tài khoản mẫu 'minhanh@maomao.vn', mật khẩu mặc định là 123456.",
                  })
                }
                className="text-[11px] text-[#4F83F1] hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập ít nhất 6 ký tự..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] placeholder-[#9BA6BA] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#778198] hover:text-[#202A3B] p-1"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4F83F1] to-[#315FC7] hover:from-[#3D72E3] hover:to-[#264FA8] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang kiểm tra...</span>
                </>
              ) : (
                <>
                  <span>Đăng nhập</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer switch to register */}
        <div className="mt-6 pt-5 border-t border-[#E3EAF4] text-center text-xs text-[#778198]">
          Bạn chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-bold text-[#4F83F1] hover:underline"
          >
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>

      {/* Quote / Subtitle */}
      <div className="mt-6 text-center">
        <p className="text-xs text-[#778198] font-chinese">
          千里之行，始于足下
        </p>
        <p className="text-[11px] text-[#9BA6BA] mt-0.5">
          &ldquo;Đường đi ngàn dặm, bắt đầu từ một bước chân&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FD] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative ambient orbs & Chinese character watermarks */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#EAF4FF] blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#EEE9FF] blur-3xl pointer-events-none opacity-80" />
      
      <div className="absolute top-12 left-12 text-8xl font-chinese font-black text-[#EAF4FF] select-none pointer-events-none hidden lg:block">
        学
      </div>
      <div className="absolute bottom-12 right-12 text-8xl font-chinese font-black text-[#EEE9FF] select-none pointer-events-none hidden lg:block">
        习
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-[#4F83F1]">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-semibold">Đang chuẩn bị trang...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
