import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  phone_number: string;
  role: "jobseeker" | "employer" | null;
  full_name: string | null;
  profile_image_url: string | null;
  language: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  authLoaded: boolean;

  // 🔹 actions
  setAuth: (token: string) => Promise<void>;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  loadAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  authLoaded: false,

  // 🔐 Save token after login
  setAuth: async (token) => {
    await AsyncStorage.setItem("token", token);
    set({ token });
  },

  // 👤 Save user from /me
  setUser: (user) => {
    set({ user });
  },

  // 🚪 Logout
  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ token: null, user: null });
  },

  // 🔄 Load token on app start
  loadAuth: async () => {
    const token = await AsyncStorage.getItem("token");

    set({
      token: token || null,
      authLoaded: true,
    });
  },
}));