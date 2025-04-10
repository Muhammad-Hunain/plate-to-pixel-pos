
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthLayoutProps = {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "restaurant") {
      navigate("/restaurant/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">POS System</h1>
        <p className="text-muted-foreground">Restaurant Management Solution</p>
      </div>
      {children}
    </div>
  );
}
