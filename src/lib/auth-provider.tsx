
"use client";

import type { User, Role } from "@/types";
import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Mock users - in a real app, this would come from a database
const MOCK_USERS: Record<string, Omit<User, "id" | "avatar">> = {
  "admin@example.com": { email: "admin@example.com", name: "Admin User", role: "admin" },
  "user@example.com": { email: "user@example.com", name: "Regular User", role: "user" },
};

const MOCK_PASSWORDS: Record<string, string> = {
  "admin@example.com": "password",
  "user@example.com": "password",
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: Role) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUserFromStorage = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("taskzenith-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem("taskzenith-user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser = MOCK_USERS[email];
    if (mockUser && MOCK_PASSWORDS[email] === password) {
      const loggedInUser: User = {
        id: Date.now().toString(), // simple unique ID
        ...mockUser,
        avatar: `https://placehold.co/100x100.png?text=${mockUser.name?.charAt(0).toUpperCase() || 'U'}`,
      };
      localStorage.setItem("taskzenith-user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string, role: Role): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (MOCK_USERS[email]) {
      setIsLoading(false);
      return false; // User already exists
    }
    const newUserDetails: Omit<User, "id" | "avatar"> = { email, name, role };
    MOCK_USERS[email] = newUserDetails;
    MOCK_PASSWORDS[email] = password;
    
    const registeredUser: User = {
      id: Date.now().toString(),
      ...newUserDetails,
      avatar: `https://placehold.co/100x100.png?text=${name?.charAt(0).toUpperCase() || 'U'}`,
    };
    localStorage.setItem("taskzenith-user", JSON.stringify(registeredUser));
    setUser(registeredUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("taskzenith-user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
