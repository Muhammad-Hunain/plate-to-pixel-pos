
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Settings, 
  Save, 
  Store, 
  Clock, 
  CreditCard, 
  Bell, 
  Shield, 
  Users, 
  Palette,
  Globe,
  Percent,
  DollarSign,
  Building,
  Image,
  Phone,
  Mail,
  Link,
  Check,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RestaurantSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [apiKeysVisible, setApiKeysVisible] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  
  const generalForm = useForm({
    defaultValues: {
      restaurantName: "Urban Bites",
      description: "Modern cuisine with a homely touch. We specialize in fusion dishes that blend global flavors.",
      phone: "(555) 123-4567",
      email: "info@urbanbites.com",
      website: "https://urbanbites.com",
      logo: "",
      coverImage: "",
      address: "123 Foodie Lane, Culinary District",
      city: "Metropolis",
      state: "NY",
      zipCode: "10001",
    },
  });
  
  const saveSettings = async () => {
    setSavingSettings(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSavingSettings(false);
    toast.success("Settings saved successfully!");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
            <p className="text-muted-foreground">
              Configure your restaurant profile and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="hover-scale" onClick={saveSettings} disabled={savingSettings}>
              <Save className="mr-2 h-4 w-4" />
              {savingSettings ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-auto pb-2">
            <TabsList className="inline-flex h-auto p-1">
              <TabsTrigger value="general" className="flex items-center">
                <Store className="mr-2 h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="branches" className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>Branches</span>
              </TabsTrigger>
              <TabsTrigger value="hours" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Hours</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Payments</span>
              </TabsTrigger>
              <TabsTrigger value="tax" className="flex items-center">
                <Percent className="mr-2 h-4 w-4" />
                <span>Tax & Currency</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Users & Roles</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center">
                <Link className="mr-2 h-4 w-4" />
                <span>Integrations</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Profile</CardTitle>
                <CardDescription>
                  Basic information about your restaurant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/3 space-y-4">
                        <FormField
                          control={generalForm.control}
                          name="restaurantName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Restaurant Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                This will be displayed on receipts, orders, and customer-facing interfaces.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="Write a brief description of your restaurant"
                                  className="min-h-[100px]"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={generalForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} type="tel" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input {...field} type="url" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/3 space-y-4">
                        <div>
                          <Label>Restaurant Logo</Label>
                          <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-all">
                            <div className="mb-4">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src="/placeholder.svg" alt="Logo" />
                                <AvatarFallback>UB</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="text-center">
                              <Button variant="outline" size="sm">
                                <Image className="mr-2 h-4 w-4" />
                                Upload Logo
                              </Button>
                              <p className="text-xs text-muted-foreground mt-2">
                                PNG, JPG up to 2MB
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Cover Image</Label>
                          <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-all">
                            <div className="w-full h-32 bg-muted rounded flex items-center justify-center mb-4">
                              <Image className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <Button variant="outline" size="sm">
                              Upload Cover Image
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">
                              Recommended: 1280x320px
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Address Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={generalForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <FormField
                            control={generalForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP/Postal Code</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branches" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Branch Management</CardTitle>
                  <CardDescription>
                    Manage your restaurant locations
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Building className="mr-2 h-4 w-4" />
                  Add Branch
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Branch Name</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Address</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Phone</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                          <th className="py-3 px-4 text-center font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">Downtown</td>
                          <td className="py-3 px-4">123 Foodie Lane, Metropolis</td>
                          <td className="py-3 px-4">(555) 123-4567</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-500">Active</Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button variant="outline" size="sm">Edit</Button>
                          </td>
                        </tr>
                        <tr className="border-t hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">Uptown</td>
                          <td className="py-3 px-4">456 Cuisine Ave, Metropolis</td>
                          <td className="py-3 px-4">(555) 234-5678</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-500">Active</Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button variant="outline" size="sm">Edit</Button>
                          </td>
                        </tr>
                        <tr className="border-t hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">Westside</td>
                          <td className="py-3 px-4">789 Flavor Blvd, Metropolis</td>
                          <td className="py-3 px-4">(555) 345-6789</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">Under Construction</Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button variant="outline" size="sm">Edit</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
                <CardDescription>
                  Set opening and closing times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="branch-select">Select Branch</Label>
                    <Select defaultValue="downtown">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="uptown">Uptown</SelectItem>
                        <SelectItem value="westside">Westside</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-2">
                            <Switch id={`${day.toLowerCase()}-active`} defaultChecked={day !== 'Sunday'} />
                            <Label htmlFor={`${day.toLowerCase()}-active`} className="w-24">{day}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="grid grid-cols-2 gap-2">
                              <Select defaultValue={day !== 'Sunday' ? "9:00" : ""}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Opening" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <SelectItem key={i} value={`${i}:00`}>{`${i}:00`}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Select defaultValue={day !== 'Sunday' ? "22:00" : ""}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Closing" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <SelectItem key={i} value={`${i}:00`}>{`${i}:00`}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {day !== 'Sunday' && (
                              <Badge variant="outline" className="whitespace-nowrap">
                                Open
                              </Badge>
                            )}
                            {day === 'Sunday' && (
                              <Badge variant="outline" className="whitespace-nowrap bg-muted text-muted-foreground">
                                Closed
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="special-hours" />
                    <div>
                      <Label htmlFor="special-hours">Special Hours</Label>
                      <p className="text-sm text-muted-foreground">Add exceptions for holidays or special events</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="ml-auto">Save Hours</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Configure accepted payment methods and gateways
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">Credit/Debit Cards</h4>
                          <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                      <Switch defaultChecked id="card-payments" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <DollarSign className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">Cash Payments</h4>
                          <p className="text-sm text-muted-foreground">Accept cash at checkout</p>
                        </div>
                      </div>
                      <Switch defaultChecked id="cash-payments" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <Globe className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">Online Payments</h4>
                          <p className="text-sm text-muted-foreground">Accept payments through third-party services</p>
                        </div>
                      </div>
                      <Switch defaultChecked id="online-payments" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Gateway Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="gateway-provider">Payment Gateway Provider</Label>
                        <Select defaultValue="stripe">
                          <SelectTrigger id="gateway-provider" className="w-full">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stripe">Stripe</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="api-key">API Key</Label>
                        <div className="flex items-center space-x-2">
                          <Input 
                            id="api-key" 
                            type={apiKeysVisible ? "text" : "password"} 
                            value="sk_test_4eC39HqLyjWDarjtT1zdp7dc" 
                            className="font-mono"
                            readOnly 
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setApiKeysVisible(!apiKeysVisible)}
                          >
                            {apiKeysVisible ? "Hide" : "Show"}
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input 
                          id="webhook-url" 
                          value="https://urbanbites.com/api/payments/webhook" 
                          className="font-mono"
                          readOnly 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">Connection Status</h3>
                      <p className="text-sm text-muted-foreground">Your payment gateway integration status</p>
                    </div>
                    <Badge className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-end space-x-2">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Configuration</CardTitle>
                <CardDescription>
                  Set up sales tax and VAT details for your restaurant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tax-number">Tax Registration Number</Label>
                      <Input id="tax-number" placeholder="Enter your tax number" />
                    </div>
                    
                    <div>
                      <Label htmlFor="tax-name">Tax Name</Label>
                      <Input id="tax-name" defaultValue="Sales Tax" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Tax Rates</h3>
                    
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Rate</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Applied To</th>
                            <th className="py-3 px-4 text-center font-medium text-muted-foreground">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t hover:bg-muted/50">
                            <td className="py-3 px-4">Standard Tax</td>
                            <td className="py-3 px-4">8.5%</td>
                            <td className="py-3 px-4">All menu items</td>
                            <td className="py-3 px-4 text-center">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                          <tr className="border-t hover:bg-muted/50">
                            <td className="py-3 px-4">Reduced Tax</td>
                            <td className="py-3 px-4">5.0%</td>
                            <td className="py-3 px-4">Takeaway food</td>
                            <td className="py-3 px-4 text-center">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Tax Rate
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Currency Settings</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currency">Primary Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD - US Dollar</SelectItem>
                            <SelectItem value="eur">EUR - Euro</SelectItem>
                            <SelectItem value="gbp">GBP - British Pound</SelectItem>
                            <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="format">Number Format</Label>
                        <Select defaultValue="period">
                          <SelectTrigger id="format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="period">1,234.56</SelectItem>
                            <SelectItem value="comma">1.234,56</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="show-currency-symbol" defaultChecked />
                      <Label htmlFor="show-currency-symbol">Display currency symbol on prices</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-new-order" className="font-medium">New Orders</Label>
                          <p className="text-sm text-muted-foreground">Receive an email when a new order is placed</p>
                        </div>
                        <Switch id="notify-new-order" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-low-inventory" className="font-medium">Low Inventory Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified when stock items are running low</p>
                        </div>
                        <Switch id="notify-low-inventory" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-reservations" className="font-medium">Reservation Updates</Label>
                          <p className="text-sm text-muted-foreground">Alerts for new, modified or cancelled reservations</p>
                        </div>
                        <Switch id="notify-reservations" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-daily-summary" className="font-medium">Daily Summary</Label>
                          <p className="text-sm text-muted-foreground">Receive a daily summary of sales and activities</p>
                        </div>
                        <Switch id="notify-daily-summary" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">In-App Notifications</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-kitchen-updates" className="font-medium">Kitchen Updates</Label>
                          <p className="text-sm text-muted-foreground">Get notified when kitchen status changes</p>
                        </div>
                        <Switch id="notify-kitchen-updates" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-staff-activity" className="font-medium">Staff Activity</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts about staff clock in/out</p>
                        </div>
                        <Switch id="notify-staff-activity" />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label htmlFor="notify-system-updates" className="font-medium">System Updates</Label>
                          <p className="text-sm text-muted-foreground">Get notified about system maintenance and updates</p>
                        </div>
                        <Switch id="notify-system-updates" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="email-recipients">Notification Recipients</Label>
                    <Textarea 
                      id="email-recipients" 
                      placeholder="Enter email addresses separated by commas"
                      defaultValue="manager@urbanbites.com, owner@urbanbites.com"
                      className="h-20"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      These email addresses will receive all notification emails
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="ml-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User & Role Management</CardTitle>
                  <CardDescription>
                    Manage user permissions and access levels
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">User</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Role</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Branch</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-center font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-sm text-muted-foreground">john@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">Owner</td>
                        <td className="py-3 px-4">All Locations</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500">Active</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Sara Johnson</p>
                              <p className="text-sm text-muted-foreground">sara@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">Manager</td>
                        <td className="py-3 px-4">Downtown</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500">Active</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>MR</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Miguel Rodriguez</p>
                              <p className="text-sm text-muted-foreground">miguel@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">Chef</td>
                        <td className="py-3 px-4">Uptown</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-muted text-muted-foreground">Inactive</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Role Permissions</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="owner">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-5 w-5 text-primary" />
                          <span className="font-medium">Owner</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 space-y-2 text-sm">
                          <p className="text-muted-foreground">Full access to all system features and settings</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">admin.all</Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="manager">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Users className="mr-2 h-5 w-5 text-primary" />
                          <span className="font-medium">Manager</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 space-y-2 text-sm">
                          <p className="text-muted-foreground">Branch management with limited system settings access</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">menu.view</Badge>
                            <Badge variant="secondary">menu.edit</Badge>
                            <Badge variant="secondary">orders.view</Badge>
                            <Badge variant="secondary">orders.edit</Badge>
                            <Badge variant="secondary">employees.view</Badge>
                            <Badge variant="secondary">employees.edit</Badge>
                            <Badge variant="secondary">reports.view</Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="chef">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <Utensils className="mr-2 h-5 w-5 text-primary" />
                          <span className="font-medium">Chef</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 space-y-2 text-sm">
                          <p className="text-muted-foreground">Kitchen management with limited ordering access</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">kitchen.view</Badge>
                            <Badge variant="secondary">kitchen.edit</Badge>
                            <Badge variant="secondary">inventory.view</Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="cashier">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5 text-primary" />
                          <span className="font-medium">Cashier</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 space-y-2 text-sm">
                          <p className="text-muted-foreground">POS system access with order management</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">pos.view</Badge>
                            <Badge variant="secondary">pos.edit</Badge>
                            <Badge variant="secondary">orders.view</Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Custom Role
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand & Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your restaurant dashboard and customer-facing interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Brand Colors</h3>
                      
                      <div>
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 rounded-md bg-primary border" />
                          <Input id="primary-color" defaultValue="#9b87f5" className="font-mono" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 rounded-md bg-[#7E69AB] border" />
                          <Input id="secondary-color" defaultValue="#7E69AB" className="font-mono" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 rounded-md bg-[#D6BCFA] border" />
                          <Input id="accent-color" defaultValue="#D6BCFA" className="font-mono" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Preview</h3>
                      
                      <div className="border rounded-md p-4 space-y-4">
                        <div className="h-16 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                          Header Area
                        </div>
                        <div className="flex space-x-4">
                          <div className="w-1/3 h-32 bg-[#7E69AB] rounded-md flex items-center justify-center text-white">
                            Sidebar
                          </div>
                          <div className="w-2/3 h-32 bg-muted rounded-md flex items-center justify-center border">
                            Content Area
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="bg-primary text-white px-4 py-2 rounded-md">
                            Primary Button
                          </div>
                          <div className="border px-4 py-2 rounded-md">
                            Secondary Button
                          </div>
                          <div className="bg-[#D6BCFA] px-4 py-2 rounded-md">
                            Accent Button
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Receipt & Invoice Customization</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="receipt-header">Receipt Header</Label>
                        <Textarea 
                          id="receipt-header" 
                          placeholder="Enter text to appear at the top of receipts"
                          defaultValue="Thank you for dining at Urban Bites!"
                          className="h-20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="receipt-footer">Receipt Footer</Label>
                        <Textarea 
                          id="receipt-footer" 
                          placeholder="Enter text to appear at the bottom of receipts"
                          defaultValue="We appreciate your business. Please come again!"
                          className="h-20"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="show-logo-receipt" defaultChecked />
                      <Label htmlFor="show-logo-receipt">Show logo on receipts</Label>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">View Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="default-view">Default Dashboard View</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="default-view">
                            <SelectValue placeholder="Select default view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily Overview</SelectItem>
                            <SelectItem value="orders">Orders</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="items-per-page">Items Per Page</Label>
                        <Select defaultValue="20">
                          <SelectTrigger id="items-per-page">
                            <SelectValue placeholder="Select items per page" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="ml-auto">Save Appearance Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Third-party Integrations</CardTitle>
                <CardDescription>
                  Connect your restaurant to external services and platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 rounded-md bg-[#25D366] text-white flex items-center justify-center">
                            <span className="text-lg font-bold">D</span>
                          </div>
                          <div>
                            <h3 className="font-medium">DoorDash</h3>
                            <p className="text-sm text-muted-foreground">Accept delivery orders through DoorDash</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500">Connected</Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pl-16">
                        <Progress value={85} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Order completion rate: 85%</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 rounded-md bg-[#EA4335] text-white flex items-center justify-center">
                            <span className="text-lg font-bold">G</span>
                          </div>
                          <div>
                            <h3 className="font-medium">Google My Business</h3>
                            <p className="text-sm text-muted-foreground">Sync menu and information with Google listing</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Not Connected</Badge>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 rounded-md bg-[#1ED760] text-white flex items-center justify-center">
                            <span className="text-lg font-bold">Q</span>
                          </div>
                          <div>
                            <h3 className="font-medium">QuickBooks</h3>
                            <p className="text-sm text-muted-foreground">Sync sales data with your accounting system</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500">Connected</Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pl-16">
                        <div className="text-xs text-muted-foreground">Last synced: Today at 6:30 AM</div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Browse More Integrations
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Custom API Integration</h3>
                    
                    <div className="border rounded-md p-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="api-url">API Endpoint URL</Label>
                          <Input id="api-url" placeholder="Enter your API endpoint URL" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="api-key">API Key</Label>
                            <Input id="api-key" type="password" placeholder="••••••••••••••••" />
                          </div>
                          
                          <div>
                            <Label htmlFor="api-secret">API Secret</Label>
                            <Input id="api-secret" type="password" placeholder="••••••••••••••••" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="webhook-url">Webhook URL (Callback URL)</Label>
                          <div className="flex items-center space-x-2">
                            <Input id="webhook-url" value="https://urbanbites.com/api/webhook" readOnly />
                            <Button variant="ghost" size="sm">Copy</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-end space-x-2">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Integration Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Utensils({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}
