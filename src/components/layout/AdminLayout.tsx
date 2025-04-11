
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

type AdminLayoutProps = {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  // Simple auth check - in a real app, this would be more sophisticated
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole !== "admin") {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar role="admin" />
      <div className="pl-64">
        <AppHeader role="admin" />
        <main className="pt-16 min-h-screen">
          <div className="px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
