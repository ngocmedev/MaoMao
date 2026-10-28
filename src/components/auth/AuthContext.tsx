"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, HskLevel } from "@/types";
import { authService } from "@/services/auth-service";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    targetHsk?: HskLevel;
  }) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const current = authService.getCurrentUser();
        setUser(current);
      } catch (e) {
        console.warn("Failed to retrieve current user", e);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error };
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      targetHsk?: HskLevel;
    }) => {
      const res = await authService.register(data);
      if (res.success && res.user) {
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error };
    },
    []
  );

  const loginAsDemo = useCallback(async () => {
    const demo = await authService.loginAsDemo();
    setUser(demo);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    const updated = await authService.updateProfile(updates);
    if (updated) {
      setUser(updated);
    }
    return updated;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginAsDemo,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
