
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/restaurant/RestaurantDashboard";
import BranchesPage from "./pages/restaurant/BranchesPage";
import InventoryPage from "./pages/restaurant/InventoryPage";
import KitchenPage from "./pages/restaurant/KitchenPage";
import OrdersPage from "./pages/restaurant/OrdersPage";
import PosPage from "./pages/restaurant/PosPage";
import SettingsPage from "./pages/restaurant/SettingsPage";
import LoginPage from "./pages/auth/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";
import EmployeesPage from "./pages/restaurant/EmployeesPage";
import OrderReportPage from "./pages/restaurant/OrderReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/restaurant/branches"
          element={
            <RequireAuth>
              <BranchesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/restaurant/inventory"
          element={
            <RequireAuth>
              <InventoryPage />
            </RequireAuth>
          }
        />
        <Route
          path="/restaurant/kitchen"
          element={
            <RequireAuth>
              <KitchenPage />
            </RequireAuth>
          }
        />
        <Route
          path="/restaurant/orders"
          element={
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/restaurant/pos"
          element={
            <RequireAuth>
              <PosPage />
            </RequireAuth>
          }
        />
        <Route
          path="/restaurant/employees"
          element={
            <RequireAuth>
              <EmployeesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
        <Route path="/restaurant/orders/report" element={<OrderReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
