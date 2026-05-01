import AuthGuard from "@renderer/guards/auth-guard";
import GuestGuard from "@renderer/guards/guest-guard";
import AuthLayout from "@renderer/pages/auth/auth.layout";
import ForgotPasswordPage from "@renderer/pages/auth/forgot-password.page";
import LoginPage from "@renderer/pages/auth/login.page";
import { createHashRouter } from "react-router";

const router = createHashRouter([
  {
    path: "/",
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LoginPage />,
            handle: {
              eyebrow: "Welcome back",
              title: "Sign in to FlowDesk",
              description: "Continue where your work left off."
            }
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
            handle: {
              eyebrow: "Account recovery",
              title: "Reset your password",
              description: "Enter your username or email and FlowDesk will send recovery instructions."
            }
          }
        ]
      }
    ]
  },
  {
    path: "/dashboard",
    element: <AuthGuard />,
    children: [

    ]
  },
  {
    path: "/profile",
    element: <AuthGuard />,
    children: [

    ]
  },
  {
    path: "*",
    element: (
      <div className="bg-bg text-white border border-border p-4 rounded-lg">
        404 Not Found
      </div>
    ),
  }
]);

export default router;
