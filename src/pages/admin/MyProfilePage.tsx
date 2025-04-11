
import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Camera, Lock, Shield, UserCog, Mail, Calendar, 
  Globe, LogOut, Save, CheckCircle, AlertTriangle, 
  BellRing, Users, BarChart3, ClipboardList, Activity,
  Smartphone, Key, Heart, BookOpen, Award
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren", 
      staggerChildren: 0.1,
      duration: 0.3 
    } 
  },
  exit: { 
    opacity: 0,
    transition: { when: "afterChildren" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2, 
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [profileStrength, setProfileStrength] = useState(68);

  useEffect(() => {
    // Animate progress bar on load
    const timer = setTimeout(() => setProgress(profileStrength), 500);
    return () => clearTimeout(timer);
  }, [profileStrength]);

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully", {
      description: "Your changes have been saved"
    });
  };

  const handlePasswordChange = () => {
    setShowPasswordDialog(false);
    toast.success("Password changed successfully", {
      description: "Your password has been updated"
    });
  };

  const handleVerification = () => {
    setShowVerificationDialog(false);
    toast.success("Email verification sent", {
      description: "Please check your inbox"
    });
    setProfileStrength(85);
    setTimeout(() => setProgress(85), 500);
  };

  return (
    <AdminLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal account settings
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="text-lg">SA</AvatarFallback>
                      </Avatar>
                      <motion.div
                        className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </motion.div>
                      <Button
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                        size="icon"
                        variant="secondary"
                      >
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Change avatar</span>
                      </Button>
                    </motion.div>

                    <div className="text-center">
                      <h2 className="text-xl font-semibold">Sarah Adams</h2>
                      <p className="text-sm text-muted-foreground">System Administrator</p>
                    </div>

                    <motion.div 
                      variants={pulseVariants}
                      animate="pulse"
                      className="w-full bg-muted p-3 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Profile strength</span>
                        <Badge variant={profileStrength > 80 ? "default" : "outline"}>
                          {profileStrength}%
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                      {profileStrength < 80 && (
                        <motion.button
                          className="w-full mt-2 text-xs text-blue-600 hover:underline text-center"
                          onClick={() => setShowVerificationDialog(true)}
                          whileHover={{ scale: 1.02 }}
                        >
                          Complete your profile verification
                        </motion.button>
                      )}
                    </motion.div>

                    <div className="w-full pt-2 grid grid-cols-2 gap-2">
                      <motion.div 
                        className="flex flex-col items-center p-3 border rounded-md"
                        whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <Users className="h-5 w-5 mb-1 text-blue-500" />
                        <span className="text-xs font-medium">24</span>
                        <span className="text-xs text-muted-foreground">Users</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-center p-3 border rounded-md"
                        whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <BarChart3 className="h-5 w-5 mb-1 text-green-500" />
                        <span className="text-xs font-medium">8</span>
                        <span className="text-xs text-muted-foreground">Reports</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-center p-3 border rounded-md"
                        whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <Activity className="h-5 w-5 mb-1 text-amber-500" />
                        <span className="text-xs font-medium">87%</span>
                        <span className="text-xs text-muted-foreground">Activity</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-center p-3 border rounded-md"
                        whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <ClipboardList className="h-5 w-5 mb-1 text-purple-500" />
                        <span className="text-xs font-medium">15</span>
                        <span className="text-xs text-muted-foreground">Tasks</span>
                      </motion.div>
                    </div>

                    <Separator />
                    
                    <div className="w-full space-y-3">
                      <motion.a 
                        className="flex items-center justify-between p-2 rounded-lg text-sm cursor-pointer"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", x: 5 }}
                      >
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3 text-primary" />
                          <span>sarah.adams@example.com</span>
                        </div>
                        {profileStrength < 80 && (
                          <Badge variant="outline" className="text-amber-500 text-xs">Verify</Badge>
                        )}
                      </motion.a>
                      
                      <motion.a 
                        className="flex items-center p-2 rounded-lg text-sm cursor-pointer"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", x: 5 }}
                      >
                        <Calendar className="h-4 w-4 mr-3 text-primary" />
                        <span>Joined April 2023</span>
                      </motion.a>
                      
                      <motion.a 
                        className="flex items-center p-2 rounded-lg text-sm cursor-pointer"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", x: 5 }}
                      >
                        <Globe className="h-4 w-4 mr-3 text-primary" />
                        <span>San Francisco, CA</span>
                      </motion.a>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Achievements</CardTitle>
                  <CardDescription>Your current progress and badges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <motion.div 
                      className="flex flex-col items-center p-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs">Admin Pro</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col items-center p-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                        <BookOpen className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-xs">Mentor</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col items-center p-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                        <Heart className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-xs">Supporter</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col items-center p-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Lock className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-xs">Locked</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-8 lg:col-span-9">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Profile</CardTitle>
                      <CardDescription>
                        Your personal information and activity overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" defaultValue="Sarah" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" defaultValue="Adams" />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="displayName">Display name</Label>
                              <Input id="displayName" defaultValue="Sarah Adams" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="title">Job title</Label>
                              <Input id="title" defaultValue="System Administrator" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Contact Details</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email address</Label>
                              <Input id="email" type="email" defaultValue="sarah.adams@example.com" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone number</Label>
                              <Input id="phone" type="tel" defaultValue="(555) 987-6543" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input id="location" defaultValue="San Francisco, CA" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">About Me</h3>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            className="min-h-[120px]" 
                            defaultValue="Experienced system administrator with a focus on restaurant management systems. Over 5 years experience in deploying and managing cloud-based POS solutions for enterprise clients."
                          />
                          <p className="text-xs text-muted-foreground">
                            This bio appears on your public profile and in communications.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleUpdateProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Update Profile
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>Your latest system activities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              action: "Added new restaurant", 
                              time: "2 hours ago", 
                              icon: <Store className="h-4 w-4 text-green-500" /> 
                            },
                            { 
                              action: "Updated user permissions", 
                              time: "Yesterday", 
                              icon: <Shield className="h-4 w-4 text-blue-500" /> 
                            },
                            { 
                              action: "Generated monthly report", 
                              time: "2 days ago", 
                              icon: <BarChart3 className="h-4 w-4 text-amber-500" /> 
                            },
                            { 
                              action: "System maintenance completed", 
                              time: "April 8, 2025", 
                              icon: <Activity className="h-4 w-4 text-purple-500" /> 
                            },
                          ].map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="flex items-center gap-3 p-2 rounded-md"
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{item.action}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <CardDescription>Priority tasks and deadlines</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { 
                              task: "Review new restaurant applications", 
                              deadline: "Today", 
                              status: "urgent",
                            },
                            { 
                              task: "Update subscription plans", 
                              deadline: "Tomorrow", 
                              status: "normal",
                            },
                            { 
                              task: "System security audit", 
                              deadline: "April 15, 2025", 
                              status: "normal",
                            },
                            { 
                              task: "Quarterly performance review", 
                              deadline: "April 20, 2025", 
                              status: "low",
                            },
                          ].map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="flex items-center justify-between p-2 rounded-md"
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  item.status === "urgent" ? "bg-red-500" : 
                                  item.status === "normal" ? "bg-amber-500" : "bg-green-500"
                                }`} />
                                <p className="text-sm font-medium">{item.task}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {item.deadline}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences and details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                              <SelectTrigger id="language">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English (US)</SelectItem>
                                <SelectItem value="en-gb">English (UK)</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select defaultValue="pt">
                              <SelectTrigger id="timezone">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pt">Pacific Time (UTC-8)</SelectItem>
                                <SelectItem value="et">Eastern Time (UTC-5)</SelectItem>
                                <SelectItem value="utc">UTC</SelectItem>
                                <SelectItem value="cet">Central European Time (UTC+1)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="theme">Dark mode</Label>
                            <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                          </div>
                          <Switch id="theme" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="focus">Focus mode</Label>
                            <p className="text-sm text-muted-foreground">Hide non-essential UI elements</p>
                          </div>
                          <Switch id="focus" defaultChecked />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Account Management</h3>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="sarah.adams" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="url">Profile URL</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                              possystem.com/users/
                            </span>
                            <Input id="url" defaultValue="sarah.adams" className="rounded-l-none" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">Delete account</p>
                            <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleUpdateProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Settings
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your security preferences and authentication
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Password</h3>
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">Change password</p>
                            <p className="text-sm text-muted-foreground">Update your password to enhance security</p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button onClick={() => setShowPasswordDialog(true)}>
                              <Key className="mr-2 h-4 w-4" />
                              Change Password
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">Authenticator app</p>
                            <p className="text-sm text-muted-foreground">
                              Use an authenticator app for additional security
                            </p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">SMS authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Receive code via SMS for verification
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">Email verification</p>
                            <p className="text-sm text-muted-foreground">
                              Receive security code via email
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Session Management</h3>
                        <div className="space-y-3">
                          {[
                            { 
                              device: "Chrome on MacBook Pro", 
                              location: "San Francisco, CA", 
                              time: "Current session", 
                              active: true
                            },
                            { 
                              device: "Safari on iPhone 15", 
                              location: "San Francisco, CA", 
                              time: "1 hour ago", 
                              active: false 
                            },
                            { 
                              device: "Firefox on Windows", 
                              location: "Seattle, WA", 
                              time: "Yesterday", 
                              active: false 
                            },
                          ].map((session, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center justify-between p-2 border rounded-md"
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${session.active ? "bg-green-500" : "bg-gray-300"}`} />
                                <div>
                                  <p className="font-medium">{session.device}</p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{session.location}</span>
                                    <span>•</span>
                                    <span>{session.time}</span>
                                  </div>
                                </div>
                              </div>
                              {!session.active && (
                                <Button variant="ghost" size="sm">
                                  End Session
                                </Button>
                              )}
                            </motion.div>
                          ))}
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out of All Devices
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleUpdateProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Settings
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verify Your Email</DialogTitle>
            <DialogDescription>
              Complete your profile by verifying your email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-blue-50 p-4 flex items-start space-x-3">
              <BellRing className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Verification Required</p>
                <p>A verification link will be sent to sarah.adams@example.com</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerificationDialog(false)}>
              Later
            </Button>
            <Button onClick={handleVerification}>
              <Mail className="mr-2 h-4 w-4" />
              Send Verification Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
