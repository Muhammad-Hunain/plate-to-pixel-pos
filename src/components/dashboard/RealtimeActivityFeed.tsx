
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Store, ShoppingCart, CreditCard, UserPlus, FilePen, Settings, 
  Clock, RefreshCw, CircleCheck, CircleAlert, CircleDashed
} from "lucide-react";
import { useState, useEffect } from "react";

// Activity types
type ActivityType = "order" | "login" | "registration" | "payment" | "error" | "settings";
type Priority = "low" | "medium" | "high";

interface Activity {
  id: number;
  type: ActivityType;
  message: string;
  restaurant: string;
  time: string;
  priority: Priority;
}

// Sample data
const initialActivities: Activity[] = [
  {
    id: 1,
    type: "order",
    message: "New order placed",
    restaurant: "Burger Zone",
    time: "Just now",
    priority: "medium"
  },
  {
    id: 2,
    type: "payment",
    message: "Payment confirmed",
    restaurant: "Pizza Palace",
    time: "2 minutes ago",
    priority: "low"
  },
  {
    id: 3,
    type: "error",
    message: "System error occurred",
    restaurant: "Thai Delight",
    time: "5 minutes ago",
    priority: "high"
  },
  {
    id: 4,
    type: "login",
    message: "User logged in",
    restaurant: "Sushi Express",
    time: "10 minutes ago",
    priority: "low"
  },
  {
    id: 5,
    type: "registration",
    message: "New restaurant registered",
    restaurant: "Pasta Paradise",
    time: "15 minutes ago",
    priority: "medium"
  },
  {
    id: 6,
    type: "settings",
    message: "Settings updated",
    restaurant: "Coffee Corner",
    time: "20 minutes ago",
    priority: "low"
  },
];

// New activities to add periodically
const newActivities: Omit<Activity, "id" | "time">[] = [
  {
    type: "order",
    message: "New order placed",
    restaurant: "Taco Time",
    priority: "medium"
  },
  {
    type: "payment",
    message: "Subscription renewed",
    restaurant: "Salad Station",
    priority: "low"
  },
  {
    type: "error",
    message: "Payment processing failed",
    restaurant: "Noodle House",
    priority: "high"
  },
  {
    type: "login",
    message: "Admin login detected",
    restaurant: "Steak House",
    priority: "medium"
  }
];

export default function RealtimeActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Function to get icon based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "login":
        return <UserPlus className="h-5 w-5" />;
      case "registration":
        return <Store className="h-5 w-5" />;
      case "error":
        return <CircleAlert className="h-5 w-5" />;
      case "settings":
        return <Settings className="h-5 w-5" />;
    }
  };
  
  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="ml-2">Low</Badge>;
      case "medium":
        return <Badge variant="secondary" className="ml-2">Medium</Badge>;
      case "high":
        return <Badge variant="destructive" className="ml-2">High</Badge>;
    }
  };
  
  // Add new activity periodically
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      const newActivity: Activity = {
        ...randomActivity,
        id: Date.now(),
        time: "Just now"
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Update relative times
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => 
        prev.map(activity => {
          if (activity.time === "Just now") {
            return { ...activity, time: "1 minute ago" };
          } else if (activity.time.includes("minute")) {
            const minutes = parseInt(activity.time.split(" ")[0]);
            if (minutes < 60) {
              return { ...activity, time: `${minutes + 1} minutes ago` };
            } else {
              return { ...activity, time: "1 hour ago" };
            }
          }
          return activity;
        })
      );
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Add a new activity
    const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
    const newActivity: Activity = {
      ...randomActivity,
      id: Date.now(),
      time: "Just now"
    };
    
    setTimeout(() => {
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Card className="col-span-12 lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Activity Feed</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? <CircleCheck className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 8).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="rounded-full p-2 bg-secondary flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium">{activity.message}</p>
                  {getPriorityBadge(activity.priority)}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{activity.restaurant}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
