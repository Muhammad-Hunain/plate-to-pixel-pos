
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Bell, CreditCard, Globe, Mail, Moon, Palette, 
  Shield, Sun, User, Wallet, Zap 
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const generalFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteDescription: z.string().min(10, {
    message: "Site description must be at least 10 characters.",
  }),
  supportEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  defaultCurrency: z.string({
    required_error: "Please select a default currency.",
  }),
  defaultLanguage: z.string({
    required_error: "Please select a default language.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

const defaultGeneralValues: Partial<GeneralFormValues> = {
  siteName: "POS System",
  siteDescription: "Modern point-of-sale system for restaurants",
  supportEmail: "support@possystem.com",
  defaultCurrency: "USD",
  defaultLanguage: "en",
  timezone: "UTC-5",
};

export default function SettingsPage() {
  const [appearance, setAppearance] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: defaultGeneralValues,
  });

  function onGeneralSubmit(data: GeneralFormValues) {
    toast.success("General settings saved successfully");
    console.log(data);
  }
  
  function onAppearanceSubmit() {
    toast.success("Appearance settings saved successfully");
  }
  
  function onNotificationsSubmit() {
    toast.success("Notification preferences saved successfully");
  }
  
  function onBillingSubmit() {
    toast.success("Billing settings saved successfully");
  }
  
  function onSecuritySubmit() {
    toast.success("Security settings saved successfully");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your platform preferences and configuration
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-5 h-auto">
            <TabsTrigger value="general" className="flex flex-col py-2 px-4 items-center gap-1">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex flex-col py-2 px-4 items-center gap-1">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col py-2 px-4 items-center gap-1">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex flex-col py-2 px-4 items-center gap-1">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col py-2 px-4 items-center gap-1">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general settings for your POS system platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <FormField
                          control={generalForm.control}
                          name="siteName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Site Name</FormLabel>
                              <FormControl>
                                <Input placeholder="POS System" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <FormField
                          control={generalForm.control}
                          name="siteDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Site Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Modern point-of-sale system for restaurants" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <FormField
                          control={generalForm.control}
                          name="supportEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Support Email</FormLabel>
                              <FormControl>
                                <Input placeholder="support@possystem.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                        <FormField
                          control={generalForm.control}
                          name="defaultCurrency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Currency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD ($)</SelectItem>
                                  <SelectItem value="EUR">EUR (€)</SelectItem>
                                  <SelectItem value="GBP">GBP (£)</SelectItem>
                                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="defaultLanguage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Language</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Spanish</SelectItem>
                                  <SelectItem value="fr">French</SelectItem>
                                  <SelectItem value="de">German</SelectItem>
                                  <SelectItem value="it">Italian</SelectItem>
                                  <SelectItem value="zh">Chinese</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="timezone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timezone</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select timezone" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="UTC-12">UTC-12</SelectItem>
                                  <SelectItem value="UTC-11">UTC-11</SelectItem>
                                  <SelectItem value="UTC-10">UTC-10</SelectItem>
                                  <SelectItem value="UTC-9">UTC-9</SelectItem>
                                  <SelectItem value="UTC-8">UTC-8</SelectItem>
                                  <SelectItem value="UTC-7">UTC-7</SelectItem>
                                  <SelectItem value="UTC-6">UTC-6</SelectItem>
                                  <SelectItem value="UTC-5">UTC-5</SelectItem>
                                  <SelectItem value="UTC-4">UTC-4</SelectItem>
                                  <SelectItem value="UTC-3">UTC-3</SelectItem>
                                  <SelectItem value="UTC-2">UTC-2</SelectItem>
                                  <SelectItem value="UTC-1">UTC-1</SelectItem>
                                  <SelectItem value="UTC">UTC</SelectItem>
                                  <SelectItem value="UTC+1">UTC+1</SelectItem>
                                  <SelectItem value="UTC+2">UTC+2</SelectItem>
                                  <SelectItem value="UTC+3">UTC+3</SelectItem>
                                  <SelectItem value="UTC+4">UTC+4</SelectItem>
                                  <SelectItem value="UTC+5">UTC+5</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-2">
                      <h3 className="text-lg font-medium">Platform Features</h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                        {[
                          { id: "online-ordering", label: "Online Ordering", description: "Allow customers to place orders online", defaultChecked: true },
                          { id: "reservations", label: "Reservations", description: "Enable table reservations feature", defaultChecked: true },
                          { id: "loyalty", label: "Loyalty Program", description: "Enable customer loyalty programs", defaultChecked: false },
                          { id: "analytics", label: "Advanced Analytics", description: "Enable detailed analytics and reports", defaultChecked: true },
                          { id: "inventory", label: "Inventory Management", description: "Enable inventory tracking features", defaultChecked: true },
                          { id: "marketing", label: "Marketing Tools", description: "Enable email marketing features", defaultChecked: false },
                        ].map((feature) => (
                          <div key={feature.id} className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                              <Label htmlFor={feature.id} className="font-medium">{feature.label}</Label>
                              <p className="text-[0.8rem] text-muted-foreground">{feature.description}</p>
                            </div>
                            <Switch id={feature.id} defaultChecked={feature.defaultChecked} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button type="submit">Save General Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the platform looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {e.preventDefault(); onAppearanceSubmit();}} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Theme Mode</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer flex items-center ${appearance === 'light' ? 'border-primary bg-primary/5' : 'border-border'}`}
                          onClick={() => setAppearance('light')}
                        >
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <Sun className="h-7 w-7 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Light Mode</p>
                            <p className="text-sm text-muted-foreground">Light background with dark text</p>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer flex items-center ${appearance === 'dark' ? 'border-primary bg-primary/5' : 'border-border'}`}
                          onClick={() => setAppearance('dark')}
                        >
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <Moon className="h-7 w-7 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-sm text-muted-foreground">Dark background with light text</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Colors</h3>
                      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary"></div>
                            <Input id="primary-color" defaultValue="#3b82f6" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="secondary-color">Secondary Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary"></div>
                            <Input id="secondary-color" defaultValue="#f3f4f6" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="accent-color">Accent Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-accent"></div>
                            <Input id="accent-color" defaultValue="#e5e7eb" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="text-color">Text Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-foreground"></div>
                            <Input id="text-color" defaultValue="#111827" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Branding</h3>
                      
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="logo">Logo Image</Label>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                              <img src="/placeholder.svg" alt="Logo placeholder" className="max-w-full max-h-full" />
                            </div>
                            <Button variant="outline" size="sm">Upload New</Button>
                            <Button variant="ghost" size="sm">Remove</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">Recommended size: 256x256px</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="favicon">Favicon</Label>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                              <img src="/favicon.ico" alt="Favicon" className="max-w-full max-h-full" />
                            </div>
                            <Button variant="outline" size="sm">Upload New</Button>
                            <Button variant="ghost" size="sm">Remove</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">Recommended size: 32x32px</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Layout</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="font-medium">Compact Mode</Label>
                            <p className="text-[0.8rem] text-muted-foreground">Reduce spacing to fit more content</p>
                          </div>
                          <Switch id="compact-mode" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="font-medium">Animated Transitions</Label>
                            <p className="text-[0.8rem] text-muted-foreground">Enable animated page transitions</p>
                          </div>
                          <Switch id="animated-transitions" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="font-medium">Reduced Motion</Label>
                            <p className="text-[0.8rem] text-muted-foreground">Minimize animations for accessibility</p>
                          </div>
                          <Switch id="reduced-motion" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit">Save Appearance Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {e.preventDefault(); onNotificationsSubmit();}} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications" className="font-medium">
                            Email Notifications
                          </Label>
                          <p className="text-[0.8rem] text-muted-foreground">
                            Receive email notifications for important events
                          </p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <div className="ml-6 space-y-3">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="new-restaurant">New restaurant registrations</Label>
                          <Switch id="new-restaurant" defaultChecked disabled={!emailNotifications} />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="billing-updates">Billing updates</Label>
                          <Switch id="billing-updates" defaultChecked disabled={!emailNotifications} />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="system-alerts">System alerts</Label>
                          <Switch id="system-alerts" defaultChecked disabled={!emailNotifications} />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications" className="font-medium">
                            Push Notifications
                          </Label>
                          <p className="text-[0.8rem] text-muted-foreground">
                            Receive push notifications in your browser
                          </p>
                        </div>
                        <Switch 
                          id="push-notifications" 
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                      
                      <div className="ml-6 space-y-3">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="push-new-users">New user registrations</Label>
                          <Switch id="push-new-users" defaultChecked disabled={!pushNotifications} />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="push-system-alerts">System alerts</Label>
                          <Switch id="push-system-alerts" defaultChecked disabled={!pushNotifications} />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Marketing Communications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails" className="font-medium">
                            Marketing Emails
                          </Label>
                          <p className="text-[0.8rem] text-muted-foreground">
                            Receive emails about new features and offers
                          </p>
                        </div>
                        <Switch 
                          id="marketing-emails" 
                          checked={marketingEmails}
                          onCheckedChange={setMarketingEmails}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit">Save Notification Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>
                  Manage your subscription plans and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {e.preventDefault(); onBillingSubmit();}} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Subscription Plans</h3>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold flex items-center">
                            <Zap className="h-4 w-4 mr-1 text-primary" />
                            Enterprise Plan
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Unlimited restaurants, support, and features
                          </p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Renews on <strong>April 15, 2025</strong>
                          </p>
                        </div>
                        <Button size="sm" variant="outline">Change Plan</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 09/2026</p>
                          </div>
                        </div>
                        
                        <Badge>Default</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <CreditCard className="h-4 w-4" />
                        <span>Add Payment Method</span>
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Billing Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Name</Label>
                        <Input id="billing-name" defaultValue="POS Admin Inc." />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing-email">Email</Label>
                        <Input id="billing-email" defaultValue="billing@posadmin.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Address</Label>
                        <Input id="billing-address" defaultValue="123 Main St." />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input id="billing-city" defaultValue="New York" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing-state">State / Province</Label>
                        <Input id="billing-state" defaultValue="NY" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">ZIP / Postal Code</Label>
                        <Input id="billing-zip" defaultValue="10001" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="billing-country">Country</Label>
                        <Select defaultValue="US">
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Billing History</h3>
                    
                    <div className="overflow-x-auto rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { date: "Apr 1, 2024", description: "Enterprise Plan - Monthly", amount: "$499.00", status: "Paid" },
                            { date: "Mar 1, 2024", description: "Enterprise Plan - Monthly", amount: "$499.00", status: "Paid" },
                            { date: "Feb 1, 2024", description: "Enterprise Plan - Monthly", amount: "$499.00", status: "Paid" },
                          ].map((invoice, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-3 text-sm">{invoice.date}</td>
                              <td className="px-4 py-3 text-sm">{invoice.description}</td>
                              <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                              <td className="px-4 py-3 text-sm">
                                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                  {invoice.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-3.5 w-3.5 mr-1" />
                                  PDF
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <Button type="submit">Save Billing Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {e.preventDefault(); onSecuritySubmit();}} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      
                      <Button className="w-fit">Update Password</Button>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">Session Management</h3>
                    
                    <div className="overflow-x-auto rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Device</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Location</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">IP Address</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { device: "Chrome on Windows", location: "New York, USA", ip: "192.168.1.1", lastActive: "Currently active" },
                            { device: "Safari on MacOS", location: "Los Angeles, USA", ip: "192.168.1.2", lastActive: "2 days ago" },
                            { device: "Firefox on Windows", location: "Chicago, USA", ip: "192.168.1.3", lastActive: "1 week ago" },
                          ].map((session, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-3 text-sm">{session.device}</td>
                              <td className="px-4 py-3 text-sm">{session.location}</td>
                              <td className="px-4 py-3 text-sm">{session.ip}</td>
                              <td className="px-4 py-3 text-sm">
                                {session.lastActive === "Currently active" ? (
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                    {session.lastActive}
                                  </Badge>
                                ) : (
                                  session.lastActive
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                  Revoke
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="text-lg font-medium">API Access</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="font-medium">API Access</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Enable API access for third-party integrations
                        </p>
                      </div>
                      <Switch id="api-access" defaultChecked />
                    </div>
                    
                    <div className="mt-4 grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <div className="flex">
                          <Input id="api-key" defaultValue="sk_test_4eC39HqLyjWDarjtT1zdp7dc" readOnly className="rounded-r-none" />
                          <Button variant="secondary" className="rounded-l-none">
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline">Regenerate Key</Button>
                        <Button variant="outline">View Documentation</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit">Save Security Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
