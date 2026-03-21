import { useContext } from "react";
import { AuthContext } from "../AuthProviderContext/AuthContext";
import { getMe, login, logout, register } from "../services/auth.services";
import type { LoginRequest, RegisterRequest } from "../types/auth.types";
import { useToast } from "../../../hooks/useToast";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { showToast } = useToast();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, isLoading, setIsLoading } = context;

  const handleLogin = async ({ email, password }: LoginRequest) => {
    try {
      setIsLoading(true);

      const data = await login({ email, password });
      if (!data?.data?.user || !data?.data?.accessToken) {
        throw new Error("Login failed");
      }

      localStorage.setItem("token", data.data.accessToken);
      setUser(data.data.user);
      showToast("Welcome back! Login successful.", "success");
    } catch (error) {
      console.error(error);
      showToast("Login failed. Check credentials.", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async ({
    username,
    email,
    password,
  }: RegisterRequest) => {
    try {
      setIsLoading(true);
      const data = await register({ username, email, password });
      if (!data?.data?.user || !data?.data?.accessToken) {
        throw new Error("Registration failed");
      }
      
      showToast("Account created successfully. Please log in!", "success");
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Registration failed! Check details.", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (accessToken: string, refreshToken?: string) => {
    try {
      setIsLoading(true);
      await logout(accessToken, refreshToken);
      localStorage.removeItem("token");
      setUser(null);
      showToast("Logged out securely.", "info");
    } catch (error) {
      console.error("Logout error:", error);
      showToast("Logout encountered an issue.", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMe = async (accessToken: string) => {
    try {
      setIsLoading(true);
      const data = await getMe(accessToken);

      if (data?.data) {
        setUser(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    user,
    isLoading,
    handleLogin,
    handleLogout,
    fetchMe,
    handleRegister,
  };
};
