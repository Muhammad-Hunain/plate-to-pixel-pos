
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedStatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  delay?: number;
  className?: string;
}

export default function AnimatedStatsCard({
  title,
  value,
  icon,
  description,
  trend,
  delay = 0,
  className,
}: AnimatedStatsCardProps) {
  return (
    <Card 
      className={cn(
        "stat-card overflow-hidden relative transition-all duration-500 hover:shadow-md",
        "animate-fade-in",
        `[animation-delay:${delay * 100}ms]`,
        "hover:-translate-y-1 hover:border-primary/20",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div 
            className={cn(
              "flex items-center text-xs mt-1",
              trend.positive ? "text-success" : "text-destructive",
              "animate-fade-in [animation-delay:500ms]"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={cn(
                "h-3 w-3 mr-1 transition-transform duration-500",
                trend.positive ? "rotate-0" : "rotate-180"
              )}
            >
              <path
                fillRule="evenodd"
                d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                clipRule="evenodd"
              />
            </svg>
            <span>{trend.value}</span>
          </div>
        )}
        {description && (
          <div className="mt-2 text-xs text-muted-foreground">{description}</div>
        )}
      </CardContent>
    </Card>
  );
}
