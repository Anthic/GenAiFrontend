export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
}

export type RefreshTokenResponse = AuthTokens;

export type MeResponse = UserProfile;

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T | null;
}
