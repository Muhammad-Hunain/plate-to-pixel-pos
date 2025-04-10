
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, Ban, Check, CircleUser, Edit, MoreHorizontal, 
  Plus, Search, Shield, ShieldCheck, Trash2, User, UserPlus, Users,
  Download, FileText, SlidersHorizontal, Eye, Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";
import SubscriptionPlanBadge from "@/components/subscription/SubscriptionPlanBadge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// User data type definition
type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Restaurant Owner" | "Manager" | "Chef" | "Cashier";
  status: "active" | "inactive" | "pending";
  subscription: string;
  joinedDate: string;
  lastActive: string;
  restaurant?: string; // Added restaurant field
};

// Mock restaurant data for the dropdown
const restaurants = [
  { id: "1", name: "Pizza Paradise" },
  { id: "2", name: "Burger Zone" },
  { id: "3", name: "Sushi Express" },
  { id: "4", name: "Thai Delight" },
  { id: "5", name: "Mexican Fiesta" },
];

// Sample user data updated with restaurant information
const userData: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Admin",
    status: "active",
    subscription: "Premium",
    joinedDate: "2023-01-15",
    lastActive: "2023-06-10",
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
    restaurant: "Pizza Paradise",
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
    restaurant: "Burger Zone",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "Chef",
    status: "pending",
    subscription: "Pro",
    joinedDate: "2023-04-12",
    lastActive: "2023-06-08",
    restaurant: "Sushi Express",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Cashier",
    status: "active",
    subscription: "Growth",
    joinedDate: "2023-03-18",
    lastActive: "2023-06-11",
    restaurant: "Thai Delight",
  },
];

const UsersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [subscriptionFilter, setSubscriptionFilter] = useState<string[]>([]);
  const [restaurantFilter, setRestaurantFilter] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: 'ascending' | 'descending';
  }>({ key: null, direction: 'ascending' });

  // Filter users based on search term and filters
  const filteredUsers = userData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(user.status);
    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
    const matchesSubscription = subscriptionFilter.length === 0 || subscriptionFilter.includes(user.subscription);
    const matchesRestaurant = restaurantFilter.length === 0 || 
      (user.restaurant && restaurantFilter.includes(user.restaurant));
    
    return matchesSearch && matchesStatus && matchesRole && matchesSubscription && matchesRestaurant;
  });

  // Sort the filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    // Handle special case for restaurant which might be undefined
    if (sortConfig.key === 'restaurant') {
      const aValue = a.restaurant || '';
      const bValue = b.restaurant || '';
      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // Handle regular string comparisons
    if (typeof a[sortConfig.key] === 'string' && typeof b[sortConfig.key] === 'string') {
      return sortConfig.direction === 'ascending'
        ? (a[sortConfig.key] as string).localeCompare(b[sortConfig.key] as string)
        : (b[sortConfig.key] as string).localeCompare(a[sortConfig.key] as string);
    }
    
    return 0;
  });

  // Request sort handler
  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Toggle user selection for bulk actions
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Toggle all users selection
  const toggleAllSelection = () => {
    if (selectedUsers.length === sortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(sortedUsers.map(user => user.id));
    }
  };

  // Delete user function
  const handleDeleteUser = (userId: number) => {
    // In a real app, this would call an API
    toast.success(`User ${userId} deleted successfully`);
    setUserToDelete(null);
    setIsDeleteDialogOpen(false);
    // Remove from selected users if it was selected
    setSelectedUsers(prev => prev.filter(id => id !== userId));
  };

  // Bulk delete users
  const handleBulkDeleteUsers = () => {
    // In a real app, this would call an API
    toast.success(`${selectedUsers.length} users deleted successfully`);
    setSelectedUsers([]);
  };

  // Handle filter changes
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleSubscriptionFilterChange = (subscription: string) => {
    setSubscriptionFilter(prev =>
      prev.includes(subscription)
        ? prev.filter(s => s !== subscription)
        : [...prev, subscription]
    );
  };

  const handleRestaurantFilterChange = (restaurant: string) => {
    setRestaurantFilter(prev =>
      prev.includes(restaurant)
        ? prev.filter(r => r !== restaurant)
        : [...prev, restaurant]
    );
  };

  // Apply filters
  const applyFilters = () => {
    setIsFilterSheetOpen(false);
    toast.success("Filters applied successfully");
  };

  // Reset filters
  const resetFilters = () => {
    setStatusFilter([]);
    setRoleFilter([]);
    setSubscriptionFilter([]);
    setRestaurantFilter([]);
    setIsFilterSheetOpen(false);
    toast.success("Filters reset successfully");
  };

  // Export users data
  const exportUsers = (format: string) => {
    // In a real app, this would generate and download a file
    toast.success(`Users data exported as ${format}`);
  };

  // View user details
  const viewUserDetails = (userId: number) => {
    const user = userData.find(u => u.id === userId);
    toast.info(`Viewing details for ${user?.name}`);
    // In a real app, this would navigate to user details page
  };

  // Edit user
  const editUser = (userId: number) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "pending":
        return <Badge variant="warning" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <div className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>{role}</span>
          </div>
        );
      case "Restaurant Owner":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">{role}</Badge>;
      case "Manager":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">{role}</Badge>;
      case "Chef":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">{role}</Badge>;
      case "Cashier":
        return <Badge variant="outline" className="bg-green-100 text-green-800">{role}</Badge>;
      default:
        return role;
    }
  };

  // Animation classes for table rows
  const getRowAnimationClass = (index: number) => {
    return `animate-fade-in [animation-delay:${index * 50}ms]`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header and Stats Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage users and their permissions
            </p>
          </div>
          <Button 
            onClick={() => navigate('/admin/users/add')} 
            className="hover-scale"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedStatsCard 
            title="Total Users" 
            value="1,234" 
            trend={{
              value: "+12%",
              positive: true
            }}
            icon={<Users className="h-4 w-4" />} 
            delay={0}
          />
          <AnimatedStatsCard 
            title="Active Users" 
            value="986" 
            trend={{
              value: "+5%",
              positive: true
            }}
            icon={<Check className="h-4 w-4" />} 
            delay={1}
          />
          <AnimatedStatsCard 
            title="New This Month" 
            value="128" 
            trend={{
              value: "+22%",
              positive: true
            }}
            icon={<UserPlus className="h-4 w-4" />} 
            delay={2}
          />
          <AnimatedStatsCard 
            title="Premium Users" 
            value="345" 
            trend={{
              value: "+8%",
              positive: true
            }}
            icon={<ShieldCheck className="h-4 w-4" />} 
            delay={3}
          />
        </div>

        {/* Users Table */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>All Users</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                {selectedUsers.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="mr-2 hover-scale"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete ({selectedUsers.length})
                  </Button>
                )}

                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="hover-scale">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => exportUsers("CSV")}>
                        <FileText className="h-4 w-4 mr-2" />Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportUsers("Excel")}>
                        <FileText className="h-4 w-4 mr-2" />Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportUsers("PDF")}>
                        <FileText className="h-4 w-4 mr-2" />Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsFilterSheetOpen(true)}
                    className="hover-scale"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8 w-[200px] h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Table className="border rounded-md overflow-hidden">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0} 
                      onCheckedChange={() => toggleAllSelection()}
                      aria-label="Select all users"
                    />
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => requestSort('name')}
                    >
                      <span>User</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => requestSort('role')}
                    >
                      <span>Role</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => requestSort('status')}
                    >
                      <span>Status</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => requestSort('restaurant')}
                    >
                      <span>Restaurant</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => requestSort('subscription')}
                    >
                      <span>Subscription</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => requestSort('joinedDate')}
                    >
                      <span>Joined</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.length > 0 ? (
                  sortedUsers.map((user, index) => (
                    <TableRow key={user.id} className={getRowAnimationClass(index)}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedUsers.includes(user.id)} 
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          aria-label={`Select ${user.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        {user.restaurant ? (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{user.restaurant}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <SubscriptionPlanBadge plan={user.subscription} size="sm" />
                      </TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions for {user.name}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => viewUserDetails(user.id)} className="hover-scale">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editUser(user.id)} className="hover-scale">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive hover-scale"
                              onClick={() => {
                                setUserToDelete(user.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center">
                        <CircleUser className="h-10 w-10 text-muted-foreground mb-2" />
                        <h3 className="font-medium mb-1">No users found</h3>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="hover-scale" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="hover-scale">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="hover-scale">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="hover-scale">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="hover-scale" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        {/* Delete User Alert Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="animate-scale-in">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedUsers.length > 1 && userToDelete === null
                  ? `This will delete ${selectedUsers.length} selected users. This action cannot be undone.`
                  : "This will permanently delete this user and remove their data from our servers. This action cannot be undone."
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover-scale">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover-scale"
                onClick={() => {
                  if (userToDelete) {
                    handleDeleteUser(userToDelete);
                  } else {
                    handleBulkDeleteUsers();
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Filter Sheet */}
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetContent className="w-[300px] sm:w-[400px] animate-slide-in-right">
            <SheetHeader>
              <SheetTitle>Filter Users</SheetTitle>
              <SheetDescription>
                Apply filters to narrow down the user list
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Status</h3>
                <div className="space-y-2">
                  {["active", "inactive", "pending"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={statusFilter.includes(status)}
                        onCheckedChange={() => handleStatusFilterChange(status)}
                      />
                      <Label htmlFor={`status-${status}`} className="capitalize">{status}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Role</h3>
                <div className="space-y-2">
                  {["Admin", "Restaurant Owner", "Manager", "Chef", "Cashier"].map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`role-${role}`} 
                        checked={roleFilter.includes(role)}
                        onCheckedChange={() => handleRoleFilterChange(role)}
                      />
                      <Label htmlFor={`role-${role}`}>{role}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Restaurant</h3>
                <div className="space-y-2">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`restaurant-${restaurant.id}`} 
                        checked={restaurantFilter.includes(restaurant.name)}
                        onCheckedChange={() => handleRestaurantFilterChange(restaurant.name)}
                      />
                      <Label htmlFor={`restaurant-${restaurant.id}`}>{restaurant.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Subscription</h3>
                <div className="space-y-2">
                  {["Premium", "Standard", "Basic", "Pro", "Growth"].map((sub) => (
                    <div key={sub} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`subscription-${sub}`} 
                        checked={subscriptionFilter.includes(sub)}
                        onCheckedChange={() => handleSubscriptionFilterChange(sub)}
                      />
                      <Label htmlFor={`subscription-${sub}`} className="flex items-center space-x-2">
                        <SubscriptionPlanBadge plan={sub} size="sm" />
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={resetFilters} className="hover-scale">Reset Filters</Button>
              <Button onClick={applyFilters} className="hover-scale">Apply Filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
