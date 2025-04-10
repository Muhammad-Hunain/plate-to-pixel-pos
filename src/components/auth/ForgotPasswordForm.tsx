
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real implementation, this would send a password reset email
    setTimeout(() => {
      toast.success("Reset link sent! Please check your email.");
      setSentEmail(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/auth/login")}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              {sentEmail 
                ? "Check your email for a reset link" 
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!sentEmail ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="bg-muted inline-flex rounded-full p-6">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <p className="text-muted-foreground">
              We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
            </p>
            <Button
              variant="outline" 
              className="mt-2"
              onClick={() => navigate("/auth/login")}
            >
              Back to Login
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!sentEmail && (
          <div className="text-sm w-full text-center text-muted-foreground">
            Remember your password?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
