"use client";

import React, { useState, Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { AppHeader } from "./AppHeader";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F9FD]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Suspense fallback={<div className="w-64 h-full bg-white/80 border-r border-[#E3EAF4]" />}>
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </Suspense>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AppHeader
          title={title}
          subtitle={subtitle}
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onOpenMobileMenu={() => setMobileDrawerOpen(true)}
        />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation & Drawer */}
      <Suspense fallback={null}>
        <MobileNav
          drawerOpen={mobileDrawerOpen}
          onCloseDrawer={() => setMobileDrawerOpen(false)}
        />
      </Suspense>
    </div>
  );
}
