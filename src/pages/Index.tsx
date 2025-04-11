
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to login page if not already authenticated
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "restaurant") {
      navigate("/restaurant/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 md:space-y-6 animate-fade-in max-w-md md:max-w-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">Restaurant POS System</h1>
        <p className="text-md md:text-xl text-muted-foreground mx-auto">
          A comprehensive point-of-sale and restaurant management system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/auth/login")}
            className="w-full sm:w-auto"
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/auth/register")}
            className="w-full sm:w-auto"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
