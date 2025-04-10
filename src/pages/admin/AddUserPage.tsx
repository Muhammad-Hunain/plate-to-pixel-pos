
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, User, AtSign, Key, Shield, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";

// Mock restaurant data for the dropdown
const restaurants = [
  { id: "1", name: "Pizza Paradise" },
  { id: "2", name: "Burger Zone" },
  { id: "3", name: "Sushi Express" },
  { id: "4", name: "Thai Delight" },
  { id: "5", name: "Mexican Fiesta" },
];

// Define form schema using Zod
const userSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["Admin", "Restaurant Owner", "Manager", "Chef", "Cashier"], {
    required_error: "Please select a role.",
  }),
  restaurantId: z.string().optional(),
  isActive: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function AddUserPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Manager",
      isActive: true,
    },
  });

  // Watch role to conditionally show restaurant selector
  const selectedRole = form.watch("role");
  const showRestaurantField = selectedRole !== "Admin";

  function onSubmit(data: UserFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast.success("User added successfully!");
      navigate("/admin/users");
    }, 1500);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/admin/users")}
              className="animate-fade-in hover-scale"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Add New User</h1>
              <p className="text-muted-foreground animate-fade-in [animation-delay:100ms]">
                Create a new user account in the system
              </p>
            </div>
          </div>
        </div>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="animate-fade-in [animation-delay:150ms]">User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:200ms]">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input className="pl-10 hover-scale focus-within:hover-scale" placeholder="Enter full name" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:250ms]">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input className="pl-10 hover-scale focus-within:hover-scale" type="email" placeholder="email@example.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:300ms]">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              className="pl-10 hover-scale focus-within:hover-scale" 
                              type="password" 
                              placeholder="Create a secure password" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Must be at least 8 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:350ms]">
                        <FormLabel>User Role</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <div className="relative">
                              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <SelectTrigger className="pl-10 hover-scale">
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Admin" className="hover-scale">Admin</SelectItem>
                            <SelectItem value="Restaurant Owner" className="hover-scale">Restaurant Owner</SelectItem>
                            <SelectItem value="Manager" className="hover-scale">Manager</SelectItem>
                            <SelectItem value="Chef" className="hover-scale">Chef</SelectItem>
                            <SelectItem value="Cashier" className="hover-scale">Cashier</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Determines user permissions in the system
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {showRestaurantField && (
                    <FormField
                      control={form.control}
                      name="restaurantId"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in [animation-delay:400ms]">
                          <FormLabel>Assigned Restaurant</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <SelectTrigger className="pl-10 hover-scale">
                                  <SelectValue placeholder="Select a restaurant" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              {restaurants.map((restaurant) => (
                                <SelectItem key={restaurant.id} value={restaurant.id} className="hover-scale">
                                  {restaurant.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Restaurant this user will be associated with
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm animate-fade-in [animation-delay:450ms]">
                        <div className="space-y-0.5">
                          <FormLabel>Account Status</FormLabel>
                          <FormDescription>
                            Activate or deactivate user account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="hover-scale"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 animate-fade-in [animation-delay:500ms]">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/users")}
                    className="hover-scale"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="min-w-32 hover-scale"
                  >
                    {isSubmitting ? "Adding..." : "Add User"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
