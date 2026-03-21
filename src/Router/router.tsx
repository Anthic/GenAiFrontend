import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Features/auth/Pages/Home";
import Login from "../Features/auth/Pages/Login";
import Register from "../Features/auth/Pages/Register";
import InterviewHome from "../Features/interviews/services/InterviewHome";
import InterviewResultShow from "../Features/interviews/services/InterviewResultShow";
import ResumeBuilder from "../Features/interviews/services/ResumeBuilder";
import ProtectedRoute from "../Features/auth/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/interview-details-input",
        element: (
          <ProtectedRoute>
            <InterviewHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resume-builder",
        element: (
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/result/:id",
        element: (
          <ProtectedRoute>
            <InterviewResultShow />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
