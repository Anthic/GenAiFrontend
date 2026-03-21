import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Router/router.tsx";
import { AuthProvider } from "./Features/auth/AuthProviderContext/AuthProvider.tsx";

import { ToastProvider } from "./hooks/useToast.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
