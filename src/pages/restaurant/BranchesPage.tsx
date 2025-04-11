import React, { useState } from 'react';
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  status: "active" | "maintenance" | "closed";
  notes?: string;
};

const BranchesPage = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSave = (formData) => {
    // Convert string status to the correct type
    const newBranch = {
      ...formData,
      status: formData.status as "active" | "maintenance" | "closed",
    };
    
    // Add the branch and update state
    setBranches([...branches, newBranch]);
    setIsFormOpen(false);
    toast({
      title: "Branch added",
      description: `${formData.name} has been successfully added.`,
    });
  };

  const handleEdit = (id: string, updatedBranch: Branch) => {
    setBranches(branches.map(branch => branch.id === id ? updatedBranch : branch));
    toast({
      title: "Branch updated",
      description: `${updatedBranch.name} has been successfully updated.`,
    });
  };

  const handleDelete = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id));
    toast({
      title: "Branch deleted",
      description: "Branch has been successfully deleted.",
    });
  };

  return (
    <RestaurantLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Branches</h1>
            <p className="text-muted-foreground">Manage your restaurant branches</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={() => setIsFormOpen(true)}>Add Branch</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Branch List</CardTitle>
            <CardDescription>View and manage your restaurant branches.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Zip Code</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell>{branch.name}</TableCell>
                      <TableCell>{branch.address}</TableCell>
                      <TableCell>{branch.city}</TableCell>
                      <TableCell>{branch.state}</TableCell>
                      <TableCell>{branch.zipCode}</TableCell>
                      <TableCell>{branch.phoneNumber}</TableCell>
                      <TableCell>{branch.email}</TableCell>
                      <TableCell>{branch.status}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(branch.id, branch)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete(branch.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {isFormOpen && <BranchForm onSave={handleSave} onClose={() => setIsFormOpen(false)} />}
      </div>
    </RestaurantLayout>
  );
};

type BranchFormProps = {
  onSave: (formData: any) => void;
  onClose: () => void;
};

const BranchForm: React.FC<BranchFormProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "maintenance" | "closed">("active");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id: Math.random().toString(36).substring(7),
      name,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      email,
      status,
      notes,
    };
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Add Branch</CardTitle>
          <CardDescription>Add a new restaurant branch to your list.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as "active" | "maintenance" | "closed")} className="w-full rounded-md border shadow-sm focus:border-primary focus:ring-primary">
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export { BranchesPage };
export default BranchesPage;
