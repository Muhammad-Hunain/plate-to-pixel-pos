
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
import { ArrowLeft, User, AtSign, Shield, Building2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

// Mock restaurant data for the dropdown
const restaurants = [
  { id: "1", name: "Pizza Paradise" },
  { id: "2", name: "Burger Zone" },
  { id: "3", name: "Sushi Express" },
  { id: "4", name: "Thai Delight" },
  { id: "5", name: "Mexican Fiesta" },
];

// Mock user data
const userData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Admin",
    status: "active",
    subscription: "Premium",
    joinedDate: "2023-01-15",
    lastActive: "2023-06-10",
    restaurantId: null,
    isActive: true,
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    role: "Restaurant Owner",
    status: "active",
    subscription: "Basic",
    joinedDate: "2023-02-20",
    lastActive: "2023-06-09",
    restaurantId: "1",
    isActive: true,
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Manager",
    status: "inactive",
    subscription: "Standard",
    joinedDate: "2022-11-05",
    lastActive: "2023-05-28",
    restaurantId: "2",
    isActive: false,
  },
];

// Define form schema using Zod
const userSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["Admin", "Restaurant Owner", "Manager", "Chef", "Cashier"], {
    required_error: "Please select a role.",
  }),
  restaurantId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Manager",
      restaurantId: null,
      isActive: true,
    },
  });

  // Fetch user data
  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      const foundUser = userData.find(u => u.id.toString() === id);
      if (foundUser) {
        setUser(foundUser);
        // Reset form with found user data
        form.reset({
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role as any,
          restaurantId: foundUser.restaurantId,
          isActive: foundUser.isActive,
        });
      }
      setIsLoading(false);
    }, 1000);
  }, [id, form]);

  // Watch role to conditionally show restaurant selector
  const selectedRole = form.watch("role");
  const showRestaurantField = selectedRole !== "Admin";

  function onSubmit(data: UserFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast.success("User updated successfully!");
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
              <h1 className="text-3xl font-bold tracking-tight animate-fade-in">
                {isLoading ? <Skeleton className="h-9 w-32" /> : `Edit User: ${user?.name || ''}`}
              </h1>
              <p className="text-muted-foreground animate-fade-in [animation-delay:100ms]">
                Update user information and permissions
              </p>
            </div>
          </div>
        </div>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="animate-fade-in [animation-delay:150ms]">User Information</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                </div>
              </div>
            ) : (
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
                              <Input className="pl-10 hover-scale" placeholder="Enter full name" {...field} />
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
                              <Input className="pl-10 hover-scale" type="email" placeholder="email@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in [animation-delay:300ms]">
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
                          <FormItem className="animate-fade-in [animation-delay:350ms]">
                            <FormLabel>Assigned Restaurant</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value || undefined}
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm animate-fade-in [animation-delay:400ms]">
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

                  <div className="flex justify-end space-x-4 animate-fade-in [animation-delay:450ms]">
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
                      {isSubmitting ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
