
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Diamond, Award, Star, Zap, Crown } from "lucide-react";

interface SubscriptionPlanBadgeProps {
  plan: string;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export default function SubscriptionPlanBadge({
  plan,
  showIcon = true,
  className,
  size = "default"
}: SubscriptionPlanBadgeProps) {
  const getPlanIcon = () => {
    switch (plan) {
      case "Premium":
        return <Diamond className="h-3.5 w-3.5" />;
      case "Standard":
        return <Award className="h-3.5 w-3.5" />;
      case "Basic":
        return <Star className="h-3.5 w-3.5" />;
      case "Pro":
        return <Crown className="h-3.5 w-3.5" />;
      case "Growth":
        return <Zap className="h-3.5 w-3.5" />;
      default:
        return <Star className="h-3.5 w-3.5" />;
    }
  };

  const getPlanVariant = () => {
    switch (plan) {
      case "Premium":
        return "default";
      case "Pro":
        return "default";
      case "Standard":
        return "secondary";
      case "Growth":
        return "secondary";
      case "Basic":
        return "outline";
      default:
        return "outline";
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs py-0.5 px-2";
      case "lg":
        return "text-sm px-3 py-1";
      default:
        return "";
    }
  };

  return (
    <Badge 
      variant={getPlanVariant()} 
      className={cn(
        "flex items-center gap-1", 
        getSizeClasses(),
        className
      )}
    >
      {showIcon && getPlanIcon()}
      {plan}
    </Badge>
  );
}
