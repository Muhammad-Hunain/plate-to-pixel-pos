
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import RestaurantsPage from "./pages/admin/RestaurantsPage";
import UsersPage from "./pages/admin/UsersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ProfilePage from "./pages/admin/ProfilePage";
import MyProfilePage from "./pages/admin/MyProfilePage";
import AddRestaurantPage from "./pages/admin/AddRestaurantPage";
import AddUserPage from "./pages/admin/AddUserPage";
import EditUserPage from "./pages/admin/EditUserPage";
import AddSubscriptionPlanPage from "./pages/admin/subscription/AddSubscriptionPlanPage";
import EditSubscriptionPlanPage from "./pages/admin/subscription/EditSubscriptionPlanPage";

// Restaurant Pages
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import PosPage from "./pages/restaurant/PosPage";
import BranchesPage from "./pages/restaurant/BranchesPage";
import MenuPage from "./pages/restaurant/MenuPage";
import OrdersPage from "./pages/restaurant/OrdersPage";
import KitchenPage from "./pages/restaurant/KitchenPage";
import EmployeesPage from "./pages/restaurant/EmployeesPage";
import ReservationsPage from "./pages/restaurant/ReservationsPage";
import InventoryPage from "./pages/restaurant/InventoryPage";
import InventoryHistoryPage from "./pages/restaurant/InventoryHistoryPage";
import RestaurantReportsPage from "./pages/restaurant/ReportsPage";
import RestaurantSettingsPage from "./pages/restaurant/SettingsPage";
import RestaurantProfilePage from "./pages/restaurant/ProfilePage";
import TransactionsPage from "./pages/restaurant/TransactionsPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing/Home Page */}
              <Route path="/" element={<Index />} />
              
              {/* Auth Routes */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/restaurants" element={<RestaurantsPage />} />
              <Route path="/admin/restaurants/add" element={<AddRestaurantPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/users/add" element={<AddUserPage />} />
              <Route path="/admin/users/edit/:id" element={<EditUserPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/profile" element={<ProfilePage />} />
              <Route path="/admin/my-profile" element={<MyProfilePage />} />
              
              {/* Subscription Routes */}
              <Route path="/admin/subscription/add" element={<AddSubscriptionPlanPage />} />
              <Route path="/admin/subscription/edit/:id" element={<EditSubscriptionPlanPage />} />
              
              {/* Restaurant Routes */}
              <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
              <Route path="/restaurant/pos" element={<PosPage />} />
              <Route path="/restaurant/branches" element={<BranchesPage />} />
              <Route path="/restaurant/menu" element={<MenuPage />} />
              <Route path="/restaurant/orders" element={<OrdersPage />} />
              <Route path="/restaurant/kitchen" element={<KitchenPage />} />
              <Route path="/restaurant/employees" element={<EmployeesPage />} />
              <Route path="/restaurant/reservations" element={<ReservationsPage />} />
              <Route path="/restaurant/inventory" element={<InventoryPage />} />
              <Route path="/restaurant/inventory/history" element={<InventoryHistoryPage />} />
              <Route path="/restaurant/reports" element={<RestaurantReportsPage />} />
              <Route path="/restaurant/transactions" element={<TransactionsPage />} />
              <Route path="/restaurant/settings" element={<RestaurantSettingsPage />} />
              <Route path="/restaurant/profile" element={<RestaurantProfilePage />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
