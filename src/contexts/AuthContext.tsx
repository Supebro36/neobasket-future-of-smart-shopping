
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

  const cleanupAuthState = () => {
    console.log('Cleaning up auth state...');
    
    // Clear user and session state
    setUser(null);
    setSession(null);
    
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem("neobasket-user");
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        console.log('Removing localStorage key:', key);
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    try {
      Object.keys(sessionStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          console.log('Removing sessionStorage key:', key);
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.log('SessionStorage not available or error:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider initializing...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state change:', event, currentSession?.user?.id);
        
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
          
          // Create user profile in database if it doesn't exist - deferred
          setTimeout(async () => {
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
          }, 0);
          
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
        console.log('Checking for existing session...');
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log('Initial session:', initialSession?.user?.id);
        
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
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Starting login process...');
      setIsLoading(true);
      
      // Clean up existing state first
      cleanupAuthState();
      
      // Attempt global sign out to clear any existing sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Previous session cleared');
      } catch (err) {
        console.log("Error during global sign out:", err);
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

      console.log('Login successful:', data.user?.id);
      toast.success("Successfully signed in!");
      
      // Force navigation after successful login
      setTimeout(() => {
        navigate("/");
      }, 100);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log('Starting registration process...');
      setIsLoading(true);
      
      // Clean up existing state first
      cleanupAuthState();
      
      // Attempt global sign out to clear any existing sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Previous session cleared');
      } catch (err) {
        console.log("Error during global sign out:", err);
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        toast.error(error.message);
        return false;
      }

      if (data.session) {
        console.log('Registration successful with immediate session:', data.user?.id);
        toast.success("Successfully signed up and logged in!");
        
        // Force navigation after successful registration
        setTimeout(() => {
          navigate("/");
        }, 100);
        
        return true;
      } else {
        console.log('Registration successful, email verification required');
        toast.info("Sign-up successful! Please check your email for verification instructions.");
        return true;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Starting logout process...');
      setIsLoading(true);
      
      // Clean up state first
      cleanupAuthState();
      
      // Attempt to sign out from Supabase
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Supabase logout successful');
      } catch (error) {
        console.log("Supabase logout error (continuing anyway):", error);
      }
      
      toast.success("Successfully logged out");
      
      // Force page refresh to ensure clean state
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
      
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, clean up and redirect
      cleanupAuthState();
      toast.error("Logout completed (with some errors)");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    } finally {
      setIsLoading(false);
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
