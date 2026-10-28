import { User, HskLevel } from "@/types";

interface StoredAccount {
  user: User;
  passwordHash: string; // Plaintext or simulated hash for local storage
}

const USERS_STORAGE_KEY = "maomao_users_v1";
const CURRENT_USER_KEY = "maomao_current_user_v1";

const DEFAULT_DEMO_USER: User = {
  id: "user-demo-1",
  name: "Minh Anh",
  email: "minhanh@maomao.vn",
  avatar: "",
  targetHsk: "HSK 2",
  streakDays: 5,
  joinedAt: "2025-09-15",
};

const DEFAULT_DEMO_ACCOUNT: StoredAccount = {
  user: DEFAULT_DEMO_USER,
  passwordHash: "123456",
};

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Could not read localStorage key: ${key}`, e);
    return fallback;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not write localStorage key: ${key}`, e);
  }
}

function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Could not remove localStorage key: ${key}`, e);
  }
}

function getStoredAccounts(): StoredAccount[] {
  const accounts = getFromStorage<StoredAccount[]>(USERS_STORAGE_KEY, []);
  if (!accounts || accounts.length === 0) {
    setToStorage(USERS_STORAGE_KEY, [DEFAULT_DEMO_ACCOUNT]);
    return [DEFAULT_DEMO_ACCOUNT];
  }
  return accounts;
}

export const authService = {
  /**
   * Get current active user from session storage
   */
  getCurrentUser(): User | null {
    const user = getFromStorage<User | null>(CURRENT_USER_KEY, null);
    if (!user) {
      // Default to the demo user for a warm first-time experience if not set
      setToStorage(CURRENT_USER_KEY, DEFAULT_DEMO_USER);
      return DEFAULT_DEMO_USER;
    }
    return user;
  },

  /**
   * Login with email and password
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Artificial small delay for realistic UX feedback
    await new Promise((r) => setTimeout(r, 400));

    const cleanEmail = email.trim().toLowerCase();
    const accounts = getStoredAccounts();

    const account = accounts.find(
      (acc) => acc.user.email.toLowerCase() === cleanEmail
    );

    if (!account) {
      return {
        success: false,
        error: "Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới.",
      };
    }

    if (account.passwordHash !== password) {
      return {
        success: false,
        error: "Mật khẩu không chính xác. Vui lòng thử lại.",
      };
    }

    setToStorage(CURRENT_USER_KEY, account.user);
    return {
      success: true,
      user: account.user,
    };
  },

  /**
   * Quick demo 1-click login
   */
  async loginAsDemo(): Promise<User> {
    await new Promise((r) => setTimeout(r, 300));
    setToStorage(CURRENT_USER_KEY, DEFAULT_DEMO_USER);
    return DEFAULT_DEMO_USER;
  },

  /**
   * Register a new user account
   */
  async register(data: {
    name: string;
    email: string;
    password: string;
    targetHsk?: HskLevel;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise((r) => setTimeout(r, 500));

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();

    if (!cleanName) {
      return { success: false, error: "Vui lòng nhập họ và tên của bạn." };
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Vui lòng nhập địa chỉ email hợp lệ." };
    }
    if (!data.password || data.password.length < 6) {
      return { success: false, error: "Mật khẩu phải có ít nhất 6 ký tự." };
    }

    const accounts = getStoredAccounts();
    const existing = accounts.find(
      (acc) => acc.user.email.toLowerCase() === cleanEmail
    );

    if (existing) {
      return {
        success: false,
        error: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác.",
      };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      targetHsk: data.targetHsk || "HSK 1",
      streakDays: 1,
      joinedAt: new Date().toISOString().split("T")[0],
    };

    const newAccount: StoredAccount = {
      user: newUser,
      passwordHash: data.password,
    };

    accounts.push(newAccount);
    setToStorage(USERS_STORAGE_KEY, accounts);
    setToStorage(CURRENT_USER_KEY, newUser);

    return {
      success: true,
      user: newUser,
    };
  },

  /**
   * Update user profile data
   */
  async updateProfile(updates: Partial<User>): Promise<User | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const updatedUser: User = {
      ...currentUser,
      ...updates,
    };

    setToStorage(CURRENT_USER_KEY, updatedUser);

    // Also update in accounts list
    const accounts = getStoredAccounts();
    const idx = accounts.findIndex((acc) => acc.user.id === currentUser.id);
    if (idx !== -1) {
      accounts[idx].user = updatedUser;
      setToStorage(USERS_STORAGE_KEY, accounts);
    }

    return updatedUser;
  },

  /**
   * Logout current session
   */
  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    removeFromStorage(CURRENT_USER_KEY);
  },
};
