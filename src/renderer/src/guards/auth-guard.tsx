import SplashScreen from "@renderer/components/splash-screen";
import { useAuthStore } from "@renderer/stores/auth-store";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthGuard(): React.JSX.Element {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  const location = useLocation();

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <Outlet />: <Navigate to="/" replace state={{ from: location }} />;
}
