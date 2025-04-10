
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedDashboardCardProps {
  title: string;
  description?: string;
  delay?: number;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
  rightHeader?: ReactNode;
}

export default function AnimatedDashboardCard({
  title,
  description,
  delay = 0,
  className,
  headerClassName,
  children,
  rightHeader,
}: AnimatedDashboardCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500",
        "animate-fade-in hover:shadow-md",
        `[animation-delay:${delay * 100}ms]`,
        "hover:-translate-y-1 hover:border-primary/20",
        className
      )}
    >
      <CardHeader className={cn("flex flex-row items-center justify-between", headerClassName)}>
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="animate-fade-in [animation-delay:100ms]">
              {description}
            </CardDescription>
          )}
        </div>
        {rightHeader && (
          <div className="animate-fade-in [animation-delay:200ms]">
            {rightHeader}
          </div>
        )}
      </CardHeader>
      <CardContent className="animate-fade-in [animation-delay:300ms]">
        {children}
      </CardContent>
    </Card>
  );
}
