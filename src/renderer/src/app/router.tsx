import AuthGuard from "@renderer/guards/auth-guard";
import GuestGuard from "@renderer/guards/guest-guard";
import { createHashRouter } from "react-router";

const router = createHashRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [

    ]
  },
  {
    path: "/dashboard",
    element: <GuestGuard />,
    children: [

    ]
  },
  {
    path: "/profile",
    element: <GuestGuard />,
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
