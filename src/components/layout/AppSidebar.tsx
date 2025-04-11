
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, Settings, Users, Store, FileBarChart, Menu,
  ShoppingBag, UtensilsCrossed, Calendar, BookOpen, PackageOpen,
  AlertCircle, User, ChevronLeft
} from 'lucide-react';
import { cn } from "@/lib/utils";

type SidebarProps = {
  role: "admin" | "restaurant";
  isOpen?: boolean;
  onToggle?: () => void;
};

export default function AppSidebar({ role, isOpen = true, onToggle }: SidebarProps) {
  const location = useLocation();
  
  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Store, label: "Restaurants", path: "/admin/restaurants" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: FileBarChart, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
    { icon: User, label: "Profile", path: "/admin/profile" },
  ];

  const restaurantMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/restaurant/dashboard" },
    { icon: ShoppingBag, label: "POS", path: "/restaurant/pos" },
    { icon: Store, label: "Branches", path: "/restaurant/branches" },
    { icon: UtensilsCrossed, label: "Menu", path: "/restaurant/menu" },
    { icon: ShoppingBag, label: "Orders", path: "/restaurant/orders" },
    { icon: Calendar, label: "Reservations", path: "/restaurant/reservations" },
    { icon: PackageOpen, label: "Inventory", path: "/restaurant/inventory" },
    { icon: FileBarChart, label: "Reports", path: "/restaurant/reports" },
    { icon: Settings, label: "Settings", path: "/restaurant/settings" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : restaurantMenuItems;

  // Mobile sidebar overlay
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0" // Always show on desktop
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="font-semibold text-xl text-sidebar-foreground">
              Restaurant POS
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-sidebar-foreground" 
              onClick={onToggle}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-2 overflow-y-auto flex-1">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "sidebar-item",
                        isActive && "active"
                      )}
                      onClick={() => {
                        if (onToggle && window.innerWidth < 768) {
                          onToggle();
                        }
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => {
                localStorage.removeItem("userRole");
                window.location.href = "/auth/login";
              }}
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
