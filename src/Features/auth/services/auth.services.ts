import axios from "axios";
import type {
  ApiResponse,
  AuthResponse,
  AuthTokens,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  UserProfile,
} from "../types/auth.types";

const BASE_URL = import.meta.env.BACKEND_URL;

export const register = async (
  payload: RegisterRequest,
): Promise<ApiResponse<AuthResponse>> => {
  const { data } = await axios.post<ApiResponse<AuthResponse>>(
    `${BASE_URL}/register`,
    payload,
    { withCredentials: true },
  );
  return data;
};

export const login = async (
  payload: LoginRequest,
): Promise<ApiResponse<AuthResponse>> => {
  const { data } = await axios.post<ApiResponse<AuthResponse>>(
    `${BASE_URL}/login`,
    payload,
  );
  return data;
};
export const logout = async (
  accessToken: string,
  refreshToken?: string,
): Promise<ApiResponse<null>> => {
  const { data } = await axios.post<ApiResponse<null>>(
    `${BASE_URL}/logout`,
    { refreshToken },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return data;
};

export const refreshToken = async (
  payload: RefreshTokenRequest,
): Promise<ApiResponse<AuthTokens>> => {
  const { data } = await axios.post<ApiResponse<AuthTokens>>(
    `${BASE_URL}/refresh-token`,
    payload,
  );
  return data;
};

export const getMe = async (
  accessToken: string,
): Promise<ApiResponse<UserProfile>> => {
  const { data } = await axios.get<ApiResponse<UserProfile>>(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};
