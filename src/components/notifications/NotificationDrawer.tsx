
import { useRef } from "react";
import { X, Check, Trash2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore, Notification } from "@/hooks/useNotificationStore";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationDrawer() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotificationStore();
  
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
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80" sideOffset={8}>
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
            </p>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-7">
                <Check className="mr-1 h-3 w-3" /> Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-[300px]">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-3 rounded-md relative mb-2",
                    notification.read ? "bg-card border" : getNotificationTypeStyles(notification.type)
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 hover:bg-background/80" 
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(notification.date, 'MMM d, yyyy - h:mm a')}
                  </p>
                  {!notification.read && (
                    <div className="absolute top-3 right-10 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 px-4">
              <Bell className="h-10 w-10 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="border-t p-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full text-xs"
              onClick={handleClearAll}
            >
              <Trash2 className="mr-2 h-3 w-3" /> Clear all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
