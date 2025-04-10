
import React from "react";
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Settings, Save, GraduationCap, Mail, Bell, CreditCard, Lock, User, Shield, 
  ExternalLink, Check, X, Palette, SunMoon, Info, FileText, Database, Download,
  Plus, Copy
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your platform settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Information</CardTitle>
                <CardDescription>
                  Basic information about your POS platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="Restaurant POS System" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-domain">Domain</Label>
                    <Input id="platform-domain" defaultValue="https://restaurant-pos.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-description">Description</Label>
                    <Textarea id="platform-description" defaultValue="Modern POS system for restaurant management." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button onClick={() => toast("Settings saved", { description: "Your platform settings have been saved successfully." })}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  Configure the subscription plans available to restaurants.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      name: "Basic Plan", 
                      price: "$19.99/month", 
                      features: ["1 Branch", "5 Staff Members", "Basic Reports", "Email Support"],
                      active: true 
                    },
                    { 
                      name: "Standard Plan", 
                      price: "$49.99/month", 
                      features: ["Up to 3 Branches", "15 Staff Members", "Advanced Reports", "Priority Support"],
                      active: true
                    },
                    { 
                      name: "Premium Plan", 
                      price: "$99.99/month", 
                      features: ["Unlimited Branches", "Unlimited Staff", "Custom Reports", "24/7 Support", "API Access"],
                      active: true
                    }
                  ].map((plan, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{plan.name}</h4>
                          {plan.active ? 
                            <Badge variant="success">Active</Badge> : 
                            <Badge variant="secondary">Inactive</Badge>
                          }
                        </div>
                        <p className="text-muted-foreground">{plan.price}</p>
                        <div className="mt-2">
                          {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm gap-1.5 mt-1">
                              <Check className="h-3.5 w-3.5 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant={plan.active ? "destructive" : "default"} size="sm">
                          {plan.active ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>
                  Configure available payment methods and gateways.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Stripe", connected: true, logo: "stripe.svg" },
                    { name: "PayPal", connected: true, logo: "paypal.svg" },
                    { name: "Square", connected: false, logo: "square.svg" },
                    { name: "Authorize.net", connected: false, logo: "authorize.svg" }
                  ].map((gateway, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{gateway.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {gateway.connected ? 
                              <span className="flex items-center gap-1.5">
                                <Badge variant="success">Connected</Badge>
                                Last transaction: 2 hours ago
                              </span> : 
                              <span className="flex items-center gap-1.5">
                                <Badge variant="outline">Not Connected</Badge>
                              </span>
                            }
                          </p>
                        </div>
                      </div>
                      <Button variant={gateway.connected ? "outline" : "default"} size="sm">
                        {gateway.connected ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of your platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Color Theme</Label>
                      <div className="flex flex-wrap gap-3">
                        {["#0ea5e9", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b", "#64748b"].map((color, index) => (
                          <div 
                            key={index}
                            className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 ring-offset-2 ring-offset-background"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-theme-mode">Default Theme Mode</Label>
                      <Select defaultValue="system">
                        <SelectTrigger id="default-theme-mode">
                          <SelectValue placeholder="Select theme mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-theme-toggle">Allow Users to Change Theme</Label>
                      <Switch id="allow-theme-toggle" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable this to allow users to toggle between light and dark mode.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-branding">Custom Branding</Label>
                      <Switch id="custom-branding" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow restaurants to customize their colors and logos.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button onClick={() => toast("Theme settings saved", { description: "Your appearance settings have been updated." })}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Custom CSS</CardTitle>
                <CardDescription>
                  Add custom CSS for additional customization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 font-mono text-xs h-48 overflow-auto">
                    <pre className="text-gray-800 dark:text-gray-200">
                      {`/* Custom CSS */
:root {
  --primary-color: #0ea5e9;
  --secondary-color: #f59e0b;
  --accent-color: #8b5cf6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #64748b;
}

/* Custom button styles */
.custom-button {
  border-radius: 4px;
  transition: all 0.2s ease;
}

.custom-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button onClick={() => toast("CSS saved", { description: "Your custom CSS has been applied." })}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure the email notifications sent to admins and restaurants.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { id: "new-restaurant", title: "New Restaurant Registration", description: "When a new restaurant signs up on the platform" },
                      { id: "subscription-change", title: "Subscription Changes", description: "When a restaurant upgrades or downgrades their subscription" },
                      { id: "payment-failed", title: "Payment Failures", description: "When a payment from a restaurant fails" },
                      { id: "system-updates", title: "System Updates", description: "Notifications about platform updates and maintenance" }
                    ].map((notification) => (
                      <div key={notification.id} className="flex justify-between items-start pb-2 last:pb-0">
                        <div className="space-y-1">
                          <Label className="text-base font-medium">{notification.title}</Label>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <Switch id={notification.id} defaultChecked />
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Notification Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input id="admin-email" defaultValue="admin@restaurantpos.com" className="flex-1" />
                    </div>
                    <p className="text-xs text-muted-foreground">All admin notifications will be sent to this email address.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button onClick={() => toast("Email settings saved", { description: "Your email notification preferences have been updated." })}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Manage the email templates for various notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Welcome Email", description: "Sent to new restaurants upon registration", updated: "2 weeks ago" },
                      { title: "Payment Receipt", description: "Sent when a subscription payment is processed", updated: "1 week ago" },
                      { title: "Password Reset", description: "Sent when a user requests a password reset", updated: "3 days ago" },
                      { title: "Account Verification", description: "Used to verify new user accounts", updated: "5 days ago" },
                    ].map((template, index) => (
                      <Card key={index} className="border shadow-sm">
                        <CardHeader className="py-3 px-4">
                          <CardTitle className="text-base flex items-center justify-between">
                            {template.title}
                            <Badge variant="outline" className="font-normal">
                              Updated {template.updated}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardFooter className="py-2 px-4 border-t">
                          <p className="text-xs text-muted-foreground flex-1">{template.description}</p>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full max-w-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Configure automatic system alerts and notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { id: "critical-errors", title: "Critical System Errors", description: "Send alerts for critical system failures" },
                      { id: "performance-issues", title: "Performance Issues", description: "Alerts for system slowdowns and performance problems" },
                      { id: "security-alerts", title: "Security Alerts", description: "Notifications for suspicious activities or login attempts" },
                      { id: "maintenance-reminders", title: "Scheduled Maintenance", description: "Reminders before scheduled maintenance periods" },
                    ].map((alert) => (
                      <div key={alert.id} className="flex justify-between items-start pb-2 last:pb-0">
                        <div className="space-y-1">
                          <Label className="text-base font-medium">{alert.title}</Label>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <Switch id={alert.id} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button onClick={() => toast("Alert settings saved", { description: "Your system alert settings have been updated." })}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>
                  Advanced system maintenance controls.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-mode" className="flex items-center justify-between">
                      <span>Maintenance Mode</span>
                      <Switch id="maintenance-mode" />
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable to temporarily put the system in maintenance mode. All users will see a maintenance message.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="debug-mode" className="flex items-center justify-between">
                      <span>Debug Mode</span>
                      <Switch id="debug-mode" />
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable advanced logging and debugging information. May impact system performance.
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label>System Backup</Label>
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Run Manual Backup
                    </Button>
                    <Button variant="secondary">
                      <Download className="h-4 w-4 mr-2" />
                      Download Latest Backup
                    </Button>
                    <p className="text-xs text-muted-foreground">Last automated backup: 6 hours ago</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Automatic Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Select backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Once Daily</SelectItem>
                      <SelectItem value="weekly">Once Weekly</SelectItem>
                      <SelectItem value="monthly">Once Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label className="text-base">Danger Zone</Label>
                  <Card className="border-destructive/30 bg-destructive/10">
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <h4 className="font-medium text-sm">Reset All System Settings</h4>
                            <p className="text-xs text-muted-foreground">
                              Restore all settings to their default values. This cannot be undone.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="border-red-200 bg-background hover:bg-red-50">
                            Reset Settings
                          </Button>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <h4 className="font-medium text-sm">Purge System Cache</h4>
                            <p className="text-xs text-muted-foreground">
                              Clear all system caches. May temporarily affect performance.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="border-red-200 bg-background hover:bg-red-50">
                            Purge Cache
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={() => toast("Advanced settings saved", { description: "Your system settings have been updated." })}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Configure API access and integrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-access">Enable API Access</Label>
                    <Switch id="api-access" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow third-party applications to access your system via API.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>API Keys</Label>
                  <div className="space-y-3">
                    {[
                      { name: "Production Key", value: "••••••••••••••••••••••••••", status: "active" },
                      { name: "Development Key", value: "••••••••••••••••••••••••••", status: "active" },
                      { name: "Test Key", value: "••••••••••••••••••••••••••", status: "inactive" }
                    ].map((apiKey, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium">{apiKey.name}</h4>
                            {apiKey.status === "active" ? 
                              <Badge variant="success">Active</Badge> : 
                              <Badge variant="outline">Inactive</Badge>
                            }
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-secondary/30 px-2 py-1 rounded">{apiKey.value}</code>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Info className="h-3.5 w-3.5 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New API Key
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label>Rate Limiting</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select rate limit policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (100 requests/minute)</SelectItem>
                      <SelectItem value="moderate">Moderate (1000 requests/minute)</SelectItem>
                      <SelectItem value="high">High (5000 requests/minute)</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Set the maximum number of API requests allowed per minute.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset</Button>
                <Button onClick={() => toast("API settings saved", { description: "Your API configuration has been updated." })}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
