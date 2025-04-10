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
  Eye, MoreHorizontal, ArrowUpDown 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";

// Mock data for restaurants
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

  // Filter and sort restaurants
  const filteredRestaurants = restaurantData
    .filter((restaurant) => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteRestaurant = (id: number) => {
    // In a real app, this would call an API to delete the restaurant
    toast.success(`Restaurant #${id} deleted successfully`);
  };

  const handleViewRestaurant = (id: number) => {
    // In a real app, this would navigate to the restaurant details page
    toast.info(`Viewing restaurant #${id}`);
  };

  const handleEditRestaurant = (id: number) => {
    // In a real app, this would navigate to the restaurant edit page
    toast.info(`Editing restaurant #${id}`);
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
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
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
                      <Badge variant={restaurant.plan === "Premium" ? "default" : "outline"}>
                        {restaurant.plan}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => handleViewRestaurant(restaurant.id)}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRestaurant(restaurant.id)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive" 
                            onClick={() => handleDeleteRestaurant(restaurant.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
