
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Info, CheckCircle2, BellPlus } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import { useState } from "react";

export function NotificationDemo() {
  const { addNotification } = useNotifications();
  const [count, setCount] = useState(0);
  
  const handleAddRandomNotification = () => {
    const types = ['info', 'success', 'warning', 'error'] as const;
    const randomType = types[Math.floor(Math.random() * types.length)];
    const newCount = count + 1;
    setCount(newCount);
    
    // Generate a random notification based on type
    const notifications = {
      info: {
        title: `New Information #${newCount}`,
        message: 'A new update is available for your system.',
        icon: <Info />
      },
      success: {
        title: `Success #${newCount}`,
        message: 'Your recent action was completed successfully.',
        icon: <CheckCircle2 />
      },
      warning: {
        title: `Warning #${newCount}`,
        message: 'Please check your system settings.',
        icon: <AlertTriangle />
      },
      error: {
        title: `Error #${newCount}`,
        message: 'Something went wrong. Please try again.',
        icon: <AlertTriangle />
      }
    };
    
    addNotification({
      title: notifications[randomType].title,
      message: notifications[randomType].message,
      type: randomType
    });
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleAddRandomNotification}
      className="flex items-center"
    >
      <BellPlus className="h-4 w-4 mr-2" />
      Add Test Notification
    </Button>
  );
}
