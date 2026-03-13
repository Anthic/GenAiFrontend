import { useContext } from "react";
import { AuthContext } from "../AuthProviderContext/AuthContext";
import { getMe, login, logout, register } from "../services/auth.services";
import type { LoginRequest, RegisterRequest } from "../types/auth.types";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, isLoading, setIsLoading } = context;

  const handleLogin = async ({ email, password }: LoginRequest) => {
    try {
      setIsLoading(true);

      const data = await login({ email, password });
      if (!data?.data?.user) {
        throw new Error("Login failed");
      }

      setUser(data.data.user);
    } catch (error) {
      console.error(error);
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
      if (!data?.data?.user) {
        throw new Error("Registration failed");
      }
      setUser(data.data.user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (accessToken: string, refreshToken?: string) => {
    try {
      setIsLoading(true);
      await logout(accessToken, refreshToken);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
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
