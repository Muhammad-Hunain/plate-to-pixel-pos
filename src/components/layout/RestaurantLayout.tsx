
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useIsMobile } from "@/hooks/use-mobile";

type RestaurantLayoutProps = {
  children: React.ReactNode;
}

export default function RestaurantLayout({ children }: RestaurantLayoutProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Simple auth check - in a real app, this would be more sophisticated
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole !== "restaurant") {
      navigate("/auth/login");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        role="restaurant" 
        isOpen={isMobile ? sidebarOpen : true} 
        onToggle={toggleSidebar} 
      />
      <div className={`${isMobile ? 'pl-0' : 'pl-0 md:pl-64'} transition-all duration-300`}>
        <AppHeader 
          role="restaurant" 
          showMenuButton={isMobile} 
          onMenuButtonClick={toggleSidebar}
        />
        <main className={`pt-16 min-h-screen transition-all duration-300`}>
          <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
