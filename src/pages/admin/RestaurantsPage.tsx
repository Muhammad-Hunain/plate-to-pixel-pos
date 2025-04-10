import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Plus, Search, Store, MapPin, Star, Edit, Trash2, 
  Eye, MoreHorizontal, ArrowUpDown, Download, ListFilter, Check, SlidersHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";
import SubscriptionPlanBadge from "@/components/ui/SubscriptionPlanBadge";

const restaurantData = [
  { 
    id: 1, 
    name: "The Great Kitchen", 
    location: "New York, NY", 
    plan: "Premium", 
    status: "active", 
    rating: 4.8,
    employees: 24,
    joined: "Jan 10, 2023"
  },
  { 
    id: 2, 
    name: "Pizza Paradise", 
    location: "Chicago, IL", 
    plan: "Basic", 
    status: "active", 
    rating: 4.5,
    employees: 12,
    joined: "Mar 22, 2023"
  },
  { 
    id: 3, 
    name: "Sushi Express", 
    location: "Los Angeles, CA", 
    plan: "Standard", 
    status: "active", 
    rating: 4.7,
    employees: 18,
    joined: "Feb 15, 2023"
  },
  { 
    id: 4, 
    name: "Burger Zone", 
    location: "Miami, FL", 
    plan: "Premium", 
    status: "active", 
    rating: 4.6,
    employees: 22,
    joined: "Apr 5, 2023"
  },
  { 
    id: 5, 
    name: "Thai Delight", 
    location: "Seattle, WA", 
    plan: "Standard", 
    status: "inactive", 
    rating: 4.4,
    employees: 14,
    joined: "Jun 12, 2023"
  },
  { 
    id: 6, 
    name: "Mexican Fiesta", 
    location: "Austin, TX", 
    plan: "Basic", 
    status: "active", 
    rating: 4.3,
    employees: 10,
    joined: "Aug 30, 2023"
  },
  { 
    id: 7, 
    name: "Indian Spices", 
    location: "San Francisco, CA", 
    plan: "Premium", 
    status: "active", 
    rating: 4.9,
    employees: 20,
    joined: "Sep 17, 2023"
  },
];

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [planFilter, setPlanFilter] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  
  const filteredRestaurants = restaurantData
    .filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter.length === 0 || 
        statusFilter.includes(restaurant.status);
      
      const matchesPlan = planFilter.length === 0 || 
        planFilter.includes(restaurant.plan);
        
      const matchesRating = restaurant.rating >= minRating;
        
      return matchesSearch && matchesStatus && matchesPlan && matchesRating;
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name) * order;
      } else if (sortBy === "rating") {
        return (a.rating - b.rating) * order;
      } else if (sortBy === "employees") {
        return (a.employees - b.employees) * order;
      }
      return 0;
    });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteRestaurant = (id: number) => {
    setShowDeleteDialog(false);
    toast.success(`Restaurant "${selectedRestaurant?.name}" deleted successfully`);
  };

  const handleViewRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setShowViewDialog(true);
  };

  const handleEditRestaurant = (id: number) => {
    navigate(`/admin/restaurants/edit/${id}`);
  };
  
  const handleExportData = (format: string) => {
    toast.success(`Exporting restaurant data as ${format.toUpperCase()}...`);
    
    setTimeout(() => {
      toast.success(`Restaurant data exported as ${format.toUpperCase()} successfully`);
    }, 1500);
  };
  
  const handleToggleFilter = (filterType: string, value: string) => {
    if (filterType === 'status') {
      setStatusFilter(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value) 
          : [...prev, value]
      );
    } else if (filterType === 'plan') {
      setPlanFilter(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value) 
          : [...prev, value]
      );
    }
  };
  
  const resetFilters = () => {
    setStatusFilter([]);
    setPlanFilter([]);
    setMinRating(0);
    setShowFilterSheet(false);
    toast.success("Filters reset successfully");
  };
  
  const applyFilters = () => {
    setShowFilterSheet(false);
    toast.success("Filters applied successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
            <p className="text-muted-foreground">
              Manage restaurants on the platform
            </p>
          </div>
          <Button onClick={() => navigate("/admin/restaurants/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Restaurant
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <AnimatedStatsCard
            title="Total Restaurants"
            value={restaurantData.length}
            icon={<Store className="h-4 w-4" />}
            delay={0}
          />
          
          <AnimatedStatsCard
            title="Active Restaurants"
            value={restaurantData.filter(r => r.status === "active").length}
            icon={<Store className="h-4 w-4" />}
            trend={{
              value: "+2 this month",
              positive: true
            }}
            delay={1}
          />
          
          <AnimatedStatsCard
            title="Premium Plans"
            value={restaurantData.filter(r => r.plan === "Premium").length}
            icon={<Store className="h-4 w-4" />}
            trend={{
              value: "+1 this month",
              positive: true
            }}
            delay={2}
          />
          
          <AnimatedStatsCard
            title="Average Rating"
            value={(restaurantData.reduce((acc, r) => acc + r.rating, 0) / restaurantData.length).toFixed(1)}
            icon={<Star className="h-4 w-4" />}
            trend={{
              value: "+0.2 this month",
              positive: true
            }}
            delay={3}
          />
        </div>

        <div className="bg-background border rounded-lg animate-fade-in">
          <div className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilterSheet(true)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExportData('csv')}>
                    <FileText className="mr-2 h-4 w-4" /> Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportData('excel')}>
                    <FileText className="mr-2 h-4 w-4" /> Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportData('pdf')}>
                    <FileText className="mr-2 h-4 w-4" /> Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead className="min-w-[180px]">
                    <button 
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("name")}
                    >
                      Restaurant
                      <ArrowUpDown size={14} />
                    </button>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("rating")}
                    >
                      Rating
                      <ArrowUpDown size={14} />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("employees")}
                    >
                      Employees
                      <ArrowUpDown size={14} />
                    </button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id} className="animate-fade-in">
                    <TableCell className="font-medium">{restaurant.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Store className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{restaurant.name}</p>
                          <p className="text-xs text-muted-foreground">Joined {restaurant.joined}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{restaurant.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <SubscriptionPlanBadge plan={restaurant.plan} size="lg" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 fill-warning text-warning mr-1" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{restaurant.employees}</TableCell>
                    <TableCell>
                      <Badge variant={restaurant.status === "active" ? "success" : "secondary"}>
                        {restaurant.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewRestaurant(restaurant)}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRestaurant(restaurant.id)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive" 
                            onClick={() => {
                              setSelectedRestaurant(restaurant);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRestaurants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <div className="flex flex-col items-center">
                        <Store className="h-10 w-10 text-muted-foreground mb-2 opacity-50" />
                        <p className="text-muted-foreground">No restaurants found matching your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Restaurant Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about this restaurant.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRestaurant && (
            <div className="space-y-4 py-2">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedRestaurant.name}</h3>
                  <p className="text-muted-foreground">{selectedRestaurant.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Plan</p>
                  <SubscriptionPlanBadge plan={selectedRestaurant.plan} size="lg" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedRestaurant.status === "active" ? "success" : "secondary"}>
                    {selectedRestaurant.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                    <span>{selectedRestaurant.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employees</p>
                  <p>{selectedRestaurant.employees}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Joined</p>
                  <p>{selectedRestaurant.joined}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <p className="text-sm text-muted-foreground">No recent activity to display</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowViewDialog(false);
              selectedRestaurant && handleEditRestaurant(selectedRestaurant.id);
            }}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Restaurant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{selectedRestaurant?.name}</span> and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedRestaurant && handleDeleteRestaurant(selectedRestaurant.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent className="sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Filter Restaurants</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down the restaurant list
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Status</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="status-active" 
                    checked={statusFilter.includes('active')}
                    onCheckedChange={() => handleToggleFilter('status', 'active')}
                  />
                  <label htmlFor="status-active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="status-inactive" 
                    checked={statusFilter.includes('inactive')}
                    onCheckedChange={() => handleToggleFilter('status', 'inactive')}
                  />
                  <label htmlFor="status-inactive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Subscription Plan</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="plan-premium" 
                    checked={planFilter.includes('Premium')}
                    onCheckedChange={() => handleToggleFilter('plan', 'Premium')}
                  />
                  <label htmlFor="plan-premium" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Premium
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="plan-standard" 
                    checked={planFilter.includes('Standard')}
                    onCheckedChange={() => handleToggleFilter('plan', 'Standard')}
                  />
                  <label htmlFor="plan-standard" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Standard
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="plan-basic" 
                    checked={planFilter.includes('Basic')}
                    onCheckedChange={() => handleToggleFilter('plan', 'Basic')}
                  />
                  <label htmlFor="plan-basic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Basic
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="minRating" className="text-sm font-medium">
                  Minimum Rating
                </Label>
                <span className="text-sm text-muted-foreground">{minRating}</span>
              </div>
              <Input 
                id="minRating" 
                type="range"
                className="w-full"
                min={0}
                max={5}
                step={0.1}
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>5</span>
              </div>
            </div>
          </div>
          
          <SheetFooter className="pt-4">
            <SheetClose asChild>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}
