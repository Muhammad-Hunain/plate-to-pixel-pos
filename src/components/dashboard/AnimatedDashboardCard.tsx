
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: delay * 0.1,
        type: "spring", 
        stiffness: 100 
      }}
    >
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-500",
          "hover:shadow-md hover:-translate-y-1 hover:border-primary/20",
          className
        )}
      >
        <CardHeader className={cn("flex flex-row items-center justify-between", headerClassName)}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.1 + 0.2 }}
          >
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription>
                {description}
              </CardDescription>
            )}
          </motion.div>
          {rightHeader && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay * 0.1 + 0.3 }}
            >
              {rightHeader}
            </motion.div>
          )}
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1 + 0.4 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
