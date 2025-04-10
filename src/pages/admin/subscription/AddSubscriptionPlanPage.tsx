
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Check, Plus, Sparkles, Package, Calendar, Gem } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Define form schema using Zod
const subscriptionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a valid number.",
  }),
  billingCycle: z.enum(["monthly", "quarterly", "yearly", "lifetime"]),
  features: z.array(z.string()).min(1, {
    message: "Add at least one feature.",
  }).default([]),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  trialDays: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Trial days must be a valid number.",
  }),
  maxUsers: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
    message: "Maximum users must be a valid number.",
  }),
  maxRestaurants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
    message: "Maximum restaurants must be a valid number.",
  }),
  color: z.string().default("#8884d8"),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

export default function AddSubscriptionPlanPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      billingCycle: "monthly",
      features: [],
      isPopular: false,
      isActive: true,
      trialDays: "0",
      maxUsers: "10",
      maxRestaurants: "1",
      color: "#8884d8",
    },
  });

  // Add feature handler
  const addFeature = () => {
    if (featureInput.trim().length === 0) return;
    const newFeatures = [...features, featureInput.trim()];
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
    setFeatureInput("");
  };

  // Remove feature handler
  const removeFeature = (featureToRemove: string) => {
    const newFeatures = features.filter((feature) => feature !== featureToRemove);
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  function onSubmit(data: SubscriptionFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast.success("Subscription plan added successfully!");
      navigate("/admin/settings");
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
              onClick={() => navigate("/admin/settings")}
              className="animate-fade-in hover-scale"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Add Subscription Plan</h1>
              <p className="text-muted-foreground animate-fade-in [animation-delay:100ms]">
                Create a new subscription plan for your customers
              </p>
            </div>
          </div>
        </div>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="animate-fade-in [animation-delay:150ms]">Plan Details</CardTitle>
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
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Package className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input className="pl-10 hover-scale" placeholder="e.g. Basic, Premium, Pro" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:250ms]">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-2.5 text-muted-foreground">$</div>
                            <Input className="pl-8 hover-scale" placeholder="19.99" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="billingCycle"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:300ms]">
                        <FormLabel>Billing Cycle</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <SelectTrigger className="pl-10 hover-scale">
                                <SelectValue placeholder="Select billing cycle" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly" className="hover-scale">Monthly</SelectItem>
                            <SelectItem value="quarterly" className="hover-scale">Quarterly</SelectItem>
                            <SelectItem value="yearly" className="hover-scale">Yearly</SelectItem>
                            <SelectItem value="lifetime" className="hover-scale">Lifetime</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trialDays"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:350ms]">
                        <FormLabel>Trial Days</FormLabel>
                        <FormControl>
                          <Input className="hover-scale" placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>Number of free trial days (0 for no trial)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxUsers"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:400ms]">
                        <FormLabel>Maximum Users</FormLabel>
                        <FormControl>
                          <Input className="hover-scale" placeholder="10" {...field} />
                        </FormControl>
                        <FormDescription>Maximum number of users allowed in this plan</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxRestaurants"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:450ms]">
                        <FormLabel>Maximum Restaurants</FormLabel>
                        <FormControl>
                          <Input className="hover-scale" placeholder="1" {...field} />
                        </FormControl>
                        <FormDescription>Maximum restaurants allowed in this plan</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in [animation-delay:500ms]">
                        <FormLabel>Theme Color</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-10 w-10 rounded-md" 
                              style={{ backgroundColor: field.value }}
                            ></div>
                            <Input 
                              type="color" 
                              className="w-16 h-10 p-1 hover-scale" 
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Color used to represent this subscription plan</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2 animate-fade-in [animation-delay:550ms]">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what's included in this plan" 
                              className="min-h-[120px] hover-scale"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-3 animate-fade-in [animation-delay:600ms]">
                    <FormLabel>Plan Features</FormLabel>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Sparkles className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-10 hover-scale"
                          placeholder="Add a feature..."
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addFeature();
                            }
                          }}
                        />
                      </div>
                      <Button type="button" onClick={addFeature} className="hover-scale">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    {features.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No features added yet. Add features to describe what's included in the plan.</p>
                    ) : (
                      <div className="border rounded-md p-3">
                        <ul className="space-y-2">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{feature}</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 ml-auto hover:text-destructive"
                                onClick={() => removeFeature(feature)}
                              >
                                <span className="sr-only">Remove feature</span>
                                ×
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {form.formState.errors.features && (
                      <p className="text-sm text-destructive">{form.formState.errors.features.message}</p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="isPopular"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm animate-fade-in [animation-delay:650ms]">
                        <div className="space-y-0.5">
                          <FormLabel>Mark as Popular</FormLabel>
                          <FormDescription>
                            Highlight this plan as a popular choice
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

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm animate-fade-in [animation-delay:700ms]">
                        <div className="space-y-0.5">
                          <FormLabel>Plan Status</FormLabel>
                          <FormDescription>
                            Enable or disable this subscription plan
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

                <div className="mt-6">
                  <FormLabel>Preview</FormLabel>
                  <div className="mt-2 border rounded-lg p-4 shadow-sm bg-muted/20">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{form.getValues("name") || "Plan Name"}</h3>
                        <div className="text-2xl font-bold">
                          ${form.getValues("price") || "XX"}/
                          <span className="text-sm text-muted-foreground">
                            {form.getValues("billingCycle") === "monthly" ? "mo" : 
                             form.getValues("billingCycle") === "yearly" ? "yr" : 
                             form.getValues("billingCycle") === "quarterly" ? "qtr" : "lifetime"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{form.getValues("description") || "Plan description"}</p>
                      </div>
                      {form.getValues("isPopular") && (
                        <Badge className="bg-primary">
                          <Gem className="h-3.5 w-3.5 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium">Features:</h4>
                      <ul className="mt-2 space-y-1">
                        {features.length > 0 ? features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>{feature}</span>
                          </li>
                        )) : (
                          <li className="text-sm text-muted-foreground">Add features to see them here</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 animate-fade-in [animation-delay:750ms]">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/settings")}
                    className="hover-scale"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="min-w-32 hover-scale"
                  >
                    {isSubmitting ? "Creating..." : "Create Plan"}
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
