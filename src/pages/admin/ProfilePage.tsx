
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
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
import { 
  User, Camera, Check, Lock, Key, Shield, Smartphone, 
  Mail, Clock, Globe, LogOut, Save, ArrowRight, 
  AlertTriangle, Bell, ChevronDown, ChevronRight, Trash2
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

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
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile image" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                    size="icon"
                    variant="outline"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload new picture</span>
                  </Button>
                </div>
                
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-semibold">Admin User</h2>
                  <p className="text-sm text-muted-foreground">Super Admin</p>
                </div>

                <div className="w-full pt-2">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">admin@example.com</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">English (US)</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">UTC-08:00</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Role: Super Admin</span>
                    </div>
                    <Badge variant="outline">System</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Last login: Today, 10:24 AM</span>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                  
                  <Button variant="outline" className="w-full mt-2 text-muted-foreground">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="User" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display name</Label>
                      <Input id="display-name" defaultValue="Admin User" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself" 
                        className="min-h-[100px]" 
                        defaultValue="System administrator with expertise in restaurant management software."
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="mr-2">Cancel</Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Update your contact details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">PST (UTC-08:00)</SelectItem>
                          <SelectItem value="est">EST (UTC-05:00)</SelectItem>
                          <SelectItem value="gmt">GMT (UTC+00:00)</SelectItem>
                          <SelectItem value="ist">IST (UTC+05:30)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en-us">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-us">English (US)</SelectItem>
                          <SelectItem value="en-gb">English (UK)</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="mr-2">Cancel</Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={() => setShowPasswordDialog(true)}>
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
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
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
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
                    </div>
                  </CardContent>
                </Card>
                
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
                        { device: "Chrome on Windows", ip: "192.168.1.1", date: "Today, 10:24 AM", current: true },
                        { device: "Safari on macOS", ip: "192.168.1.2", date: "Yesterday, 3:15 PM", current: false },
                        { device: "Firefox on Windows", ip: "192.168.1.3", date: "May 20, 2025, 8:30 AM", current: false },
                      ].map((session, index) => (
                        <div key={index} className="flex justify-between items-center">
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
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Sign Out of All Devices</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to be notified.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-3">Platform Updates</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="new-restaurants">New restaurant registrations</Label>
                            <p className="text-sm text-muted-foreground">
                              When a new restaurant joins the platform
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="new-restaurants" defaultChecked />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-alerts">System alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Critical system notifications and alerts
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="system-alerts" defaultChecked />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="payment-updates">Payment updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Subscription and payment notifications
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="payment-updates" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Notification Channels</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-3 border rounded-md">
                            <Mail className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">Email</span>
                            <Switch defaultChecked className="mt-2" />
                          </div>
                          
                          <div className="flex flex-col items-center p-3 border rounded-md">
                            <Bell className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">In-app</span>
                            <Switch defaultChecked className="mt-2" />
                          </div>
                          
                          <div className="flex flex-col items-center p-3 border rounded-md">
                            <Smartphone className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">Mobile Push</span>
                            <Switch className="mt-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="mr-2">Reset to Defaults</Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
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
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-destructive/10 p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="text-sm text-destructive">
                <p className="font-medium">Warning</p>
                <p>This will permanently delete your account and all associated data.</p>
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
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
