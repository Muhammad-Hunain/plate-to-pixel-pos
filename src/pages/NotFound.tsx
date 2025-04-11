
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 animate-fade-in max-w-md">
        <h1 className="text-6xl md:text-9xl font-bold text-primary">404</h1>
        <p className="text-xl md:text-2xl font-medium">Page Not Found</p>
        <p className="text-muted-foreground mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          onClick={() => navigate("/")} 
          className="mt-4"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
