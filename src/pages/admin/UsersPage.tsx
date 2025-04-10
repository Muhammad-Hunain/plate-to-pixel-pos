
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, Ban, Check, CircleUser, Edit, MoreHorizontal, 
  Plus, Search, Shield, ShieldCheck, Trash2, User, UserPlus, Users 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock user data
const userData = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    restaurant: "N/A",
    status: "active",
    lastActive: "Today, 2:30 PM"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@pizza-paradise.com",
    role: "Restaurant Owner",
    restaurant: "Pizza Paradise",
    status: "active",
    lastActive: "Today, 10:15 AM"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@sushi-express.com",
    role: "Restaurant Owner",
    restaurant: "Sushi Express",
    status: "active",
    lastActive: "Yesterday, 4:45 PM"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@burger-zone.com",
    role: "Manager",
    restaurant: "Burger Zone",
    status: "active",
    lastActive: "Today, 1:20 PM"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@thai-delight.com",
    role: "Cashier",
    restaurant: "Thai Delight",
    status: "inactive",
    lastActive: "5 days ago"
  },
  {
    id: 6,
    name: "Jennifer Miller",
    email: "jennifer@mexican-fiesta.com",
    role: "Chef",
    restaurant: "Mexican Fiesta",
    status: "active",
    lastActive: "Today, 9:30 AM"
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@example.com",
    role: "Admin",
    restaurant: "N/A",
    status: "active",
    lastActive: "Yesterday, 11:45 AM"
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter and sort users
  const filteredUsers = userData
    .filter((user) => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name) * order;
      } else if (sortBy === "role") {
        return a.role.localeCompare(b.role) * order;
      } else if (sortBy === "restaurant") {
        return a.restaurant.localeCompare(b.restaurant) * order;
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

  const handleDeleteUser = (id: number) => {
    toast.success(`User #${id} deleted successfully`);
  };

  const handleEditUser = (id: number) => {
    toast.info(`Editing user #${id}`);
  };

  const handleToggleUserStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`User #${id} ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
  };

  // Count users by role
  const admins = userData.filter(u => u.role === "Admin").length;
  const owners = userData.filter(u => u.role === "Restaurant Owner").length;
  const staff = userData.filter(u => !["Admin", "Restaurant Owner"].includes(u.role)).length;
  const active = userData.filter(u => u.status === "active").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage users and their permissions
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{userData.length}</div>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{admins}</div>
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Restaurant Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{owners}</div>
                <CircleUser className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Staff Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{staff}</div>
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-background border rounded-lg">
          <div className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
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
                      User
                      <ArrowUpDown size={14} />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("role")}
                    >
                      Role
                      <ArrowUpDown size={14} />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("restaurant")}
                    >
                      Restaurant
                      <ArrowUpDown size={14} />
                    </button>
                  </TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {user.role === "Admin" ? (
                          <Shield className="h-3.5 w-3.5 text-primary" />
                        ) : user.role === "Restaurant Owner" ? (
                          <CircleUser className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.restaurant}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "success" : "secondary"}>
                        {user.status === "active" ? "Active" : "Inactive"}
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
                          <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleUserStatus(user.id, user.status)}
                          >
                            {user.status === "active" ? (
                              <>
                                <Ban className="h-4 w-4 mr-2" /> Deactivate
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" /> Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive" 
                            onClick={() => handleDeleteUser(user.id)}
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
