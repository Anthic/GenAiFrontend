import { useNavigate } from "react-router";
import { useAuth } from "../Features/auth/Hooks/useAuth";
import { useEffect, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <div>Loading.........</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
