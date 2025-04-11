
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import AddBranchForm from "@/components/branches/AddBranchForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Define the Branch type
type Branch = {
  id: string;
  name: string;
  address: string;
  manager: string;
  contact: string;
  status: "active" | "maintenance" | "closed";
  openingTime: string;
  closingTime: string;
  taxRate: number;
  notes?: string;
};

// Initial branches data
const initialBranches: Branch[] = [
  {
    id: "1",
    name: "Downtown Branch",
    address: "123 Main St, Downtown",
    manager: "John Smith",
    contact: "(555) 123-4567",
    status: "active",
    openingTime: "08:00",
    closingTime: "22:00",
    taxRate: 8.5,
    notes: "Our flagship location in the heart of downtown"
  },
  {
    id: "2",
    name: "Westside Location",
    address: "456 West Ave, Westside",
    manager: "Sarah Johnson",
    contact: "(555) 987-6543",
    status: "active",
    openingTime: "07:00",
    closingTime: "21:00",
    taxRate: 7.25,
    notes: "Popular for breakfast service"
  },
  {
    id: "3",
    name: "Mall Outlet",
    address: "789 Shopping Center, Mall Level 2",
    manager: "Michael Brown",
    contact: "(555) 456-7890",
    status: "maintenance",
    openingTime: "10:00",
    closingTime: "21:00",
    taxRate: 9.0,
    notes: "Currently undergoing renovation"
  }
];

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddBranchDialog, setShowAddBranchDialog] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEditBranch = (formValues: any) => {
    // For fixing the type error with status
    const formattedBranch = {
      ...formValues,
      status: formValues.status as "active" | "maintenance" | "closed",
    };

    if (editingBranch) {
      setBranches(branches.map(branch => 
        branch.id === editingBranch.id ? { ...branch, ...formattedBranch } : branch
      ));
      toast.success(`${formValues.name} branch has been updated!`);
    } else {
      const newBranch = {
        id: `${branches.length + 1}`,
        ...formattedBranch
      };
      setBranches([...branches, newBranch]);
      toast.success(`${formValues.name} branch has been added!`);
    }
    setShowAddBranchDialog(false);
    setEditingBranch(null);
  };

  const handleDeleteBranch = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id));
    toast.success("Branch has been deleted!");
  };

  const getStatusColor = (status: Branch["status"]) => {
    switch (status) {
      case "active": return "success";
      case "maintenance": return "warning";
      case "closed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>
            <p className="text-muted-foreground">
              Manage your restaurant locations and branches
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddBranchDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Branch
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full max-w-md mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search branches..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map(branch => (
            <Card key={branch.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {branch.name}
                  </CardTitle>
                </div>
                <Badge variant={getStatusColor(branch.status)}>
                  {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Address:</div>
                  <div className="text-sm text-muted-foreground">{branch.address}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Manager:</div>
                    <div className="text-sm text-muted-foreground">{branch.manager}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Contact:</div>
                    <div className="text-sm text-muted-foreground">{branch.contact}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-sm font-medium">Opening:</div>
                    <div className="text-sm text-muted-foreground">{branch.openingTime}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Closing:</div>
                    <div className="text-sm text-muted-foreground">{branch.closingTime}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tax Rate:</div>
                    <div className="text-sm text-muted-foreground">{branch.taxRate}%</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingBranch(branch);
                      setShowAddBranchDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDeleteBranch(branch.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground opacity-50 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No branches found</h3>
            <p className="text-muted-foreground mt-2 mb-4">
              {searchQuery ? "Try adjusting your search query." : "Get started by adding your first branch location."}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </div>
        )}

        <Dialog open={showAddBranchDialog} onOpenChange={setShowAddBranchDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingBranch ? "Edit Branch" : "Add New Branch"}</DialogTitle>
            </DialogHeader>
            <AddBranchForm 
              onSubmit={handleAddEditBranch} 
              defaultValues={editingBranch || undefined} 
              title={editingBranch ? "Edit Branch Details" : "Add New Branch Location"} 
              submitLabel={editingBranch ? "Update Branch" : "Create Branch"}
            />
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
