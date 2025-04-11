import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { MoreVertical, FileDown, Printer, Eye, RefreshCcw, X, Copy, Plus, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the Branch interface
interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  status: "active" | "maintenance" | "closed";
  createdAt: string;
  notes?: string;
}

// Mock data for branches
const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Downtown Branch",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "91234",
    phone: "(555) 123-4567",
    email: "downtown@example.com",
    status: "active",
    createdAt: "2023-01-01T00:00:00",
    notes: "Flagship location",
  },
  {
    id: "2",
    name: "Uptown Branch",
    address: "456 Elm St",
    city: "Anytown",
    state: "CA",
    zipCode: "91235",
    phone: "(555) 234-5678",
    email: "uptown@example.com",
    status: "active",
    createdAt: "2023-02-15T00:00:00",
    notes: "Near the park",
  },
  {
    id: "3",
    name: "Westside Branch",
    address: "789 Oak St",
    city: "Anytown",
    state: "CA",
    zipCode: "91236",
    phone: "(555) 345-6789",
    email: "westside@example.com",
    status: "maintenance",
    createdAt: "2023-03-20T00:00:00",
    notes: "Under renovation",
  },
];

// Define the Zod schema for branch validation
const branchSchema = z.object({
  name: z.string().min(3, { message: "Branch name must be at least 3 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(3, { message: "City must be at least 3 characters." }),
  state: z.string().length(2, { message: "State must be exactly 2 characters." }),
  zipCode: z.string().regex(/^\d{5}(?:-\d{4})?$/, { message: "Invalid ZIP code." }),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: "Invalid phone number. Use format (555) 123-4567." }),
  email: z.string().email({ message: "Invalid email address." }),
  status: z.enum(["active", "maintenance", "closed"], {
    required_error: "Please select a branch status.",
  }),
  notes: z.string().optional(),
});

// Define the BranchForm type based on the schema
type BranchFormValues = z.infer<typeof branchSchema>;

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [isAddBranchDialogOpen, setIsAddBranchDialogOpen] = useState(false);
  const [isEditBranchDialogOpen, setIsEditBranchDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize the form with useForm hook
  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      status: "active",
      notes: "",
    },
  });

  // Function to handle adding a new branch
  const addBranch = (data: any) => {
    const newBranch = {
      ...data,
      id: String(branches.length + 1),
      status: data.status as "active" | "maintenance" | "closed", // Ensure status is properly typed
      createdAt: new Date().toISOString(),
    };
    
    setBranches([...branches, newBranch]);
    setIsAddBranchDialogOpen(false);
    toast.success("New branch added successfully!");
  };

  // Function to handle editing an existing branch
  const editBranch = (data: any) => {
    if (!selectedBranch) return;

    const updatedBranches = branches.map((branch) =>
      branch.id === selectedBranch.id ? { ...branch, ...data } : branch
    );

    setBranches(updatedBranches);
    setIsEditBranchDialogOpen(false);
    setSelectedBranch(null);
    toast.success("Branch updated successfully!");
  };

  // Function to handle deleting a branch
  const deleteBranch = (branchId: string) => {
    setBranches(branches.filter((branch) => branch.id !== branchId));
    toast.success("Branch deleted successfully!");
  };

  // Function to open the edit branch dialog
  const openEditBranchDialog = (branch: Branch) => {
    setSelectedBranch(branch);
    form.reset(branch);
    setIsEditBranchDialogOpen(true);
  };

  // Function to close the add branch dialog
  const closeAddBranchDialog = () => {
    setIsAddBranchDialogOpen(false);
    form.reset();
  };

  // Function to close the edit branch dialog
  const closeEditBranchDialog = () => {
    setIsEditBranchDialogOpen(false);
    setSelectedBranch(null);
    form.reset();
  };

  // Function to handle copying branch details
  const copyBranchDetails = (branch: Branch) => {
    const details = `
      Branch Name: ${branch.name}
      Address: ${branch.address}, ${branch.city}, ${branch.state} ${branch.zipCode}
      Phone: ${branch.phone}
      Email: ${branch.email}
    `;
    navigator.clipboard.writeText(details);
    toast.success("Branch details copied to clipboard!");
  };

  // Function to handle printing branch details
  const printBranchDetails = (branch: Branch) => {
    toast.success(`Printing details for ${branch.name}...`);
  };

  // Function to handle exporting branch data
  const exportBranchData = () => {
    toast.success("Branch data exported successfully!");
  };

  // Filter branches based on search term
  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.phone.includes(searchTerm) ||
    branch.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RestaurantLayout>
      <div className="container space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>
            <p className="text-muted-foreground">
              Manage restaurant branches and locations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsAddBranchDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
            <Button variant="outline" className="hover-scale" onClick={exportBranchData}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Branch List</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search branches..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranches.map((branch) => (
                  <TableRow key={branch.id} className="hover-scale-subtle">
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell>
                      {branch.address}, {branch.city}, {branch.state} {branch.zipCode}
                    </TableCell>
                    <TableCell>
                      {branch.phone}
                      <br />
                      {branch.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={branch.status === "active" ? "default" : branch.status === "maintenance" ? "outline" : "destructive"}>
                        {branch.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditBranchDialog(branch)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Branch
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyBranchDetails(branch)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => printBranchDetails(branch)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteBranch(branch.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Branch
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Branch Dialog */}
        <Dialog open={isAddBranchDialogOpen} onOpenChange={setIsAddBranchDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
              <DialogDescription>
                Create a new restaurant branch to expand your business.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addBranch)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter branch name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="90210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes or information about the branch"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={closeAddBranchDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Branch</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Branch Dialog */}
        <Dialog open={isEditBranchDialogOpen} onOpenChange={setIsEditBranchDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Branch</DialogTitle>
              <DialogDescription>
                Edit an existing restaurant branch to update its information.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(editBranch)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter branch name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="90210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes or information about the branch"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={closeEditBranchDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Branch</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
