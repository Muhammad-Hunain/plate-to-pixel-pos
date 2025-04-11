
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Restaurant POS System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive point-of-sale and restaurant management system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/auth/login")}
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/auth/register")}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
