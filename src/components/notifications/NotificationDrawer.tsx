
import { useRef } from "react";
import { X, Check, Trash2, Bell } from "lucide-react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger,
  DrawerFooter
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore, Notification } from "@/hooks/useNotificationStore";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export function NotificationDrawer() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotificationStore();
  
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const getNotificationTypeStyles = (type?: string) => {
    switch (type) {
      case 'success':
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      case 'warning':
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case 'error':
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      default:
        return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    clearAllNotifications();
    closeRef.current?.click();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-xl font-semibold">Notifications</DrawerTitle>
            <DrawerClose ref={closeRef}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
            </p>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                <Check className="mr-1 h-4 w-4" /> Mark all as read
              </Button>
            )}
          </div>
        </DrawerHeader>
        
        <ScrollArea className="h-[50vh] px-4">
          {notifications.length > 0 ? (
            <div className="py-4 space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-3 rounded-md relative",
                    notification.read ? "bg-background border" : getNotificationTypeStyles(notification.type)
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 hover:bg-background/80" 
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(notification.date, 'MMM d, yyyy - h:mm a')}
                  </p>
                  {!notification.read && (
                    <div className="absolute top-3 right-10 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </ScrollArea>
        
        <DrawerFooter className="border-t">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleClearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Clear all notifications
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
