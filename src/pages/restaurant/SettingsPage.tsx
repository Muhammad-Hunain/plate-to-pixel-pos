
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import RolePermissionsManager from "@/components/settings/RolePermissionsManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const handleSaveGeneralSettings = () => {
    toast.success("General settings updated successfully");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your restaurant settings and preferences
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="general">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Restaurant Details</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-name">Restaurant Name</Label>
                          <Input 
                            id="restaurant-name" 
                            placeholder="Enter restaurant name"
                            defaultValue="Urban Bites Restaurant"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-phone">Phone Number</Label>
                          <Input 
                            id="restaurant-phone" 
                            placeholder="Enter phone number"
                            defaultValue="(555) 123-4567"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-address">Address</Label>
                        <Input 
                          id="restaurant-address" 
                          placeholder="Enter restaurant address"
                          defaultValue="123 Main Street, New York, NY 10001"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-website">Website</Label>
                        <Input 
                          id="restaurant-website" 
                          placeholder="Enter website URL"
                          defaultValue="https://urbanbites.example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Business Hours</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="hours-weekday">Weekday Hours</Label>
                          <Input 
                            id="hours-weekday" 
                            placeholder="e.g., 9:00 AM - 10:00 PM"
                            defaultValue="11:00 AM - 10:00 PM"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="hours-weekend">Weekend Hours</Label>
                          <Input 
                            id="hours-weekend" 
                            placeholder="e.g., 10:00 AM - 11:00 PM"
                            defaultValue="12:00 PM - 11:00 PM"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="button" onClick={handleSaveGeneralSettings}>
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <RolePermissionsManager />
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Preferences</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-email">Email for Notifications</Label>
                        <Input 
                          id="notification-email" 
                          placeholder="Enter email address"
                          defaultValue="manager@urbanbites.example.com"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="notify-new-orders"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked={true}
                          />
                          <Label htmlFor="notify-new-orders">New Order Notifications</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="notify-reservations"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked={true}
                          />
                          <Label htmlFor="notify-reservations">Reservation Notifications</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="notify-inventory"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked={false}
                          />
                          <Label htmlFor="notify-inventory">Low Inventory Alerts</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="notify-reports"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked={false}
                          />
                          <Label htmlFor="notify-reports">Daily Sales Reports</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="button" onClick={() => toast.success("Notification preferences updated")}>
                      Save Preferences
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
