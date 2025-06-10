
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import { User as AppUser } from "../types";

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        
        if (!mounted) return;

        setSession(currentSession);
        
        if (currentSession?.user) {
          const appUser: AppUser = {
            id: currentSession.user.id,
            email: currentSession.user.email || "",
            name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || "",
            wishlist: [],
            cart: []
          };
          setUser(appUser);
          
          // Create user profile in database if it doesn't exist
          try {
            const { DatabaseService } = await import("../services");
            const existingUser = await DatabaseService.getCurrentUser();
            
            if (!existingUser) {
              await DatabaseService.createUserProfile(
                currentSession.user.id,
                appUser.name,
                appUser.email
              );
            }
          } catch (error) {
            console.error("Error handling user profile:", error);
          }
          
          // Update local storage with user data
          localStorage.setItem("neobasket-user", JSON.stringify(appUser));
        } else {
          setUser(null);
          localStorage.removeItem("neobasket-user");
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        setSession(initialSession);
        
        if (initialSession?.user) {
          const appUser: AppUser = {
            id: initialSession.user.id,
            email: initialSession.user.email || "",
            name: initialSession.user.user_metadata.name || initialSession.user.email?.split('@')[0] || "",
            wishlist: [],
            cart: []
          };
          setUser(appUser);
          localStorage.setItem("neobasket-user", JSON.stringify(appUser));
        }
      } catch (error) {
        console.error("Error checking auth session:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const cleanupAuthState = () => {
    console.log('Cleaning up auth state');
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('neobasket-user');
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('Starting login process for:', email);
    cleanupAuthState();

    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.error("Error during global sign out:", err);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error);
      toast.error(error.message);
      return false;
    }

    //  Check if email is verified
    if (!data.session?.user.email_confirmed_at) {
      toast.error("Please verify your email before logging in.");
      await supabase.auth.signOut();
      return false;
    }

    console.log('Login successful for:', email);
    toast.success("Successfully signed in!");
    return true;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("An error occurred during login");
    return false;
  }
};

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
  try {
    console.log('Starting registration process for:', email);
    cleanupAuthState();

    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.error("Error during global sign out:", err);
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: 'https://neobasket.vercel.app/login'
 
      }
    });

    if (error) {
      console.error('Registration error:', error);
      toast.error(error.message);
      return false;
    }

    // ✅ Don't auto-login if email not verified
    if (!data.session) {
      toast.success("Verification email sent! Please check your inbox.");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("An error occurred during registration");
    return false;
  }
};

  const logout = async (): Promise<void> => {
    try {
      console.log('Starting logout process');
      
      // First clear local state
      setUser(null);
      setSession(null);
      
      // Clean up auth state
      cleanupAuthState();
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        console.error("Logout error:", error);
        // Don't show error to user as cleanup was successful
      }
      
      console.log('Logout completed successfully');
      toast.success("Successfully logged out");
      
      // Force navigation and page refresh for clean state
      navigate("/login");
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      console.error("Logout error:", error);
      // Still try to clean up and redirect
      cleanupAuthState();
      setUser(null);
      setSession(null);
      toast.success("Logged out");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated: !!session, 
      isLoading,
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
