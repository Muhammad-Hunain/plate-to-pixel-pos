
import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  User, Camera, Check, Lock, Key, Shield, Smartphone, 
  Mail, Clock, Globe, LogOut, Save, ArrowRight, 
  AlertTriangle, Bell, ChevronDown, Utensils, Store
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading for animation purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProfile = () => {
    toast.success("Profile information updated successfully");
  };

  const handleChangePassword = () => {
    setShowPasswordDialog(false);
    toast.success("Password has been changed successfully");
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast.success("Account has been deleted");
  };

  return (
    <RestaurantLayout>
      <motion.div 
        initial="hidden" 
        animate={isLoaded ? "visible" : "hidden"} 
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div variants={fadeIn}>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Profile</h1>
          <p className="text-muted-foreground">
            Manage your restaurant profile and settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            variants={fadeIn} 
            className="md:col-span-1"
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" alt="Restaurant logo" />
                      <AvatarFallback>RL</AvatarFallback>
                    </Avatar>
                    <Button
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                      size="icon"
                      variant="outline"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Upload new logo</span>
                    </Button>
                  </motion.div>
                  
                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-semibold">Culinary Corner</h2>
                    <p className="text-sm text-muted-foreground">Fine Dining Restaurant</p>
                  </div>

                  <div className="w-full pt-2">
                    <motion.div 
                      className="flex items-center justify-between py-2"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">restaurant@example.com</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between py-2"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">3 Active Locations</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between py-2"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">UTC-08:00</span>
                      </div>
                    </motion.div>
                    
                    <Separator className="my-3" />
                    
                    <motion.div 
                      className="flex items-center justify-between py-2"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Role: Restaurant Owner</span>
                      </div>
                      <Badge variant="outline">Premium</Badge>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between py-2"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Cuisine: Italian, French</span>
                      </div>
                    </motion.div>
                    
                    <Separator className="my-3" />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Delete Restaurant
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="w-full mt-2 text-muted-foreground">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} className="md:col-span-2 space-y-6">
            <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Restaurant</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              {/* Restaurant Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Restaurant Information</CardTitle>
                      <CardDescription>
                        Update your restaurant's core information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-name">Restaurant name</Label>
                          <Input id="restaurant-name" defaultValue="Culinary Corner" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cuisine-type">Cuisine type</Label>
                          <Input id="cuisine-type" defaultValue="Italian, French" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="slogan">Slogan</Label>
                        <Input id="slogan" defaultValue="Where every flavor tells a story" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Business email</Label>
                        <Input id="email" type="email" defaultValue="restaurant@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Restaurant description</Label>
                        <Textarea 
                          id="description" 
                          className="min-h-[100px]" 
                          defaultValue="An elegant fine dining restaurant specializing in Italian and French cuisine, offering a unique blend of traditional and modern culinary experiences."
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Information</CardTitle>
                      <CardDescription>
                        Update your restaurant's business details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact number</Label>
                        <div className="flex space-x-2">
                          <Select defaultValue="us">
                            <SelectTrigger className="w-[80px]">
                              <SelectValue placeholder="US" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">US</SelectItem>
                              <SelectItem value="ca">CA</SelectItem>
                              <SelectItem value="uk">UK</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input id="phone" type="tel" defaultValue="(555) 123-4567" className="flex-1" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="business-hours">Operating hours</Label>
                          <Input id="business-hours" defaultValue="11:00 AM - 11:00 PM" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="days-open">Open days</Label>
                          <Input id="days-open" defaultValue="Monday - Sunday" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tax-id">Tax ID / Business number</Label>
                        <Input id="tax-id" defaultValue="123-45-6789" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="year-established">Year established</Label>
                        <Input id="year-established" defaultValue="2015" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your account password.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={() => setShowPasswordDialog(true)}>
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>
                        Add an extra layer of security to your account.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Authenticator App</p>
                            <p className="text-sm text-muted-foreground">
                              Use an authenticator app to generate one-time codes.
                            </p>
                          </div>
                        </div>
                        <Switch />
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Email Authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Receive a code via email for verification.
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Login History</CardTitle>
                      <CardDescription>
                        Your recent login activity.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { device: "Chrome on macOS", ip: "192.168.1.1", date: "Today, 9:42 AM", current: true },
                          { device: "Safari on iOS", ip: "192.168.1.2", date: "Yesterday, 2:30 PM", current: false },
                          { device: "Chrome on Windows", ip: "192.168.1.3", date: "April 9, 2025, 8:15 AM", current: false },
                        ].map((session, index) => (
                          <motion.div 
                            key={index} 
                            className="flex justify-between items-center p-2 rounded-md"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{session.device}</p>
                                {session.current && (
                                  <Badge variant="outline" className="text-xs">Current</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{session.ip}</span>
                                <span>•</span>
                                <span>{session.date}</span>
                              </div>
                            </div>
                            {!session.current && (
                              <Button variant="ghost" size="sm">
                                Sign out
                              </Button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Sign Out of All Devices</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Choose how you want to be notified about restaurant activity.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-3">Restaurant Operations</h3>
                        <div className="space-y-3">
                          <motion.div 
                            className="flex items-center justify-between p-2 rounded-md"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="space-y-0.5">
                              <Label htmlFor="new-orders">New orders</Label>
                              <p className="text-sm text-muted-foreground">
                                When new orders are placed
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="new-orders" defaultChecked />
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center justify-between p-2 rounded-md"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="space-y-0.5">
                              <Label htmlFor="reservations">Reservations</Label>
                              <p className="text-sm text-muted-foreground">
                                When reservations are made or canceled
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="reservations" defaultChecked />
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center justify-between p-2 rounded-md"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="space-y-0.5">
                              <Label htmlFor="inventory">Inventory alerts</Label>
                              <p className="text-sm text-muted-foreground">
                                When inventory items run low
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="inventory" defaultChecked />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Notification Channels</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <motion.div 
                              className="flex flex-col items-center p-3 border rounded-md"
                              whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.2)" }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Mail className="h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Email</span>
                              <Switch defaultChecked className="mt-2" />
                            </motion.div>
                            
                            <motion.div 
                              className="flex flex-col items-center p-3 border rounded-md"
                              whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.2)" }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Bell className="h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">In-app</span>
                              <Switch defaultChecked className="mt-2" />
                            </motion.div>
                            
                            <motion.div 
                              className="flex flex-col items-center p-3 border rounded-md"
                              whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.2)" }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Smartphone className="h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Mobile Push</span>
                              <Switch className="mt-2" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Reset to Defaults</Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input id="confirm" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>
              <Check className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Restaurant Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your restaurant account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-destructive/10 p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="text-sm text-destructive">
                <p className="font-medium">Warning</p>
                <p>This will permanently delete your restaurant account, all branches, menus, and other data.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
              <Input id="confirm-delete" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Delete Restaurant Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RestaurantLayout>
  );
}
