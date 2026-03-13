import { createContext } from "react";
import type { UserProfile } from "../types/auth.types";


interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);