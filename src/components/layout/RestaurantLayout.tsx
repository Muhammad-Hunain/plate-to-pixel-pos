
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

type RestaurantLayoutProps = {
  children: React.ReactNode;
}

export default function RestaurantLayout({ children }: RestaurantLayoutProps) {
  const navigate = useNavigate();

  // Simple auth check - in a real app, this would be more sophisticated
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole !== "restaurant") {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar role="restaurant" />
      <div className="pl-64">
        <AppHeader role="restaurant" />
        <main className="pt-16 min-h-screen">
          <div className="px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
