
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload, ImageIcon } from "lucide-react";

// Sample categories for the form
const menuCategories = [
  { id: "1", name: "Starters" },
  { id: "2", name: "Main Course" },
  { id: "3", name: "Sandwiches" },
  { id: "4", name: "Desserts" },
  { id: "5", name: "Drinks" },
  { id: "6", name: "Specials" },
  { id: "7", name: "Beverages" },
];

// Sample branches for the form
const branches = [
  { id: "1", name: "Downtown Location" },
  { id: "2", name: "Uptown Location" },
  { id: "3", name: "West Side Branch" },
  { id: "4", name: "Airport Location" },
];

interface MenuItemFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  preparationTime: string;
  imageUrl: string;
  branches: string[];
}

interface AddMenuItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MenuItemFormData) => void;
  defaultValues?: Partial<MenuItemFormData>;
}

export function AddMenuItemForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: AddMenuItemFormProps) {
  const [formData, setFormData] = useState<MenuItemFormData>({
    name: defaultValues?.name || "",
    description: defaultValues?.description || "",
    price: defaultValues?.price || 0,
    category: defaultValues?.category || "",
    available: defaultValues?.available ?? true,
    preparationTime: defaultValues?.preparationTime || "10",
    imageUrl: defaultValues?.imageUrl || "",
    branches: defaultValues?.branches || []
  });

  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.imageUrl || null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server or cloud storage
      // Here we're just creating a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, imageUrl: previewUrl }));
      toast.success("Image uploaded successfully");
    }
  };

  const toggleBranch = (branchId: string) => {
    setFormData(prev => {
      const branches = prev.branches.includes(branchId)
        ? prev.branches.filter(id => id !== branchId)
        : [...prev.branches, branchId];
      return { ...prev, branches };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || formData.price <= 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
          <DialogDescription>
            {defaultValues 
              ? "Update the details of this menu item." 
              : "Enter the details for the new menu item."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column - Item details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Item name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleNumberInputChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
                <Input
                  id="preparationTime"
                  name="preparationTime"
                  type="number"
                  min="1"
                  value={formData.preparationTime}
                  onChange={handleInputChange}
                  placeholder="10"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="available" className="cursor-pointer">
                  Available for Order
                </Label>
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, available: checked }))
                  }
                />
              </div>
            </div>

            {/* Right column - Image and description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Item Image</Label>
                <div className="border border-dashed rounded-md p-3 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview}
                        alt="Item preview"
                        className="mx-auto max-h-[140px] rounded-md object-cover"
                      />
                      <Button 
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="mt-2"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, imageUrl: "" }));
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop or click to upload
                      </p>
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Button 
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="flex items-center"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe this menu item..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Branches selection */}
          <div className="space-y-2">
            <Label>Available at Branches</Label>
            <div className="grid grid-cols-2 gap-2">
              {branches.map(branch => (
                <div key={branch.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`branch-${branch.id}`}
                    checked={formData.branches.includes(branch.id)}
                    onCheckedChange={() => toggleBranch(branch.id)}
                  />
                  <Label htmlFor={`branch-${branch.id}`} className="text-sm">{branch.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
