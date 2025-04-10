
import { useLocation, Link } from "react-router-dom";
import { 
  Users, Settings, BarChart3, Store, Home, CreditCard, 
  Calendar, ChefHat, Coffee, Utensils, Menu
} from "lucide-react";

type SidebarNavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export default function AppSidebar({ role = "restaurant" }) {
  const location = useLocation();

  const adminNavigation: SidebarNavigationItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Restaurants", href: "/admin/restaurants", icon: Store },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const restaurantNavigation: SidebarNavigationItem[] = [
    { name: "Dashboard", href: "/restaurant/dashboard", icon: Home },
    { name: "POS", href: "/restaurant/pos", icon: CreditCard },
    { name: "Menu", href: "/restaurant/menu", icon: Menu },
    { name: "Orders", href: "/restaurant/orders", icon: Utensils },
    { name: "Kitchen", href: "/restaurant/kitchen", icon: ChefHat },
    { name: "Employees", href: "/restaurant/employees", icon: Users },
    { name: "Reservations", href: "/restaurant/reservations", icon: Calendar },
    { name: "Inventory", href: "/restaurant/inventory", icon: Coffee },
    { name: "Reports", href: "/restaurant/reports", icon: BarChart3 },
    { name: "Settings", href: "/restaurant/settings", icon: Settings },
  ];

  const navigation = role === "admin" ? adminNavigation : restaurantNavigation;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-4">
        <h1 className="font-bold text-2xl text-sidebar-foreground">POS System</h1>
        <p className="text-sm text-sidebar-foreground/70">
          {role === "admin" ? "Admin Panel" : "Restaurant Panel"}
        </p>
      </div>
      <div className="mt-4 flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 pb-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-item ${isActive ? "active" : ""}`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <Users className="h-4 w-4 text-sidebar-foreground" />
          </div>
          <div>
            <div className="font-medium text-sidebar-foreground">
              {role === "admin" ? "Admin User" : "Restaurant User"}
            </div>
            <div className="text-sm text-sidebar-foreground/70">
              {role === "admin" ? "Super Admin" : "Owner"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
