
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, FileText, Download, BarChart2, ListFilter, Eye } from "lucide-react";

interface DashboardActionButtonsProps {
  className?: string;
}

export default function DashboardActionButtons({ className }: DashboardActionButtonsProps) {
  const buttons = [
    {
      label: "Last 30 Days",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      variant: "outline" as const,
      delay: 0,
    },
    {
      label: "Generate Report",
      icon: <FileText className="mr-2 h-4 w-4" />,
      variant: "outline" as const,
      delay: 1,
    },
    {
      label: "Export Data",
      icon: <Download className="mr-2 h-4 w-4" />,
      variant: "outline" as const,
      delay: 2,
    },
    {
      label: "View All Reports",
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
      variant: "default" as const,
      delay: 3,
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {buttons.map((button, index) => (
        <Button 
          key={index}
          variant={button.variant}
          size="sm"
          className={`animate-fade-in [animation-delay:${button.delay * 100}ms]`}
        >
          {button.icon}
          {button.label}
        </Button>
      ))}
    </div>
  );
}
