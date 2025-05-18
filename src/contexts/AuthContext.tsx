
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Check local storage for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("neobasket-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user data", error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For MVP, we'll simulate a successful login
    if (email && password) {
      const mockUser: User = {
        id: "user1",
        email,
        name: email.split('@')[0],
        wishlist: [],
        cart: []
      };
      
      setUser(mockUser);
      localStorage.setItem("neobasket-user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For MVP, we'll simulate a successful registration
    if (email && password && name) {
      const mockUser: User = {
        id: "user1",
        email,
        name,
        wishlist: [],
        cart: []
      };
      
      setUser(mockUser);
      localStorage.setItem("neobasket-user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("neobasket-user");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register,
      logout 
    }}>
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
