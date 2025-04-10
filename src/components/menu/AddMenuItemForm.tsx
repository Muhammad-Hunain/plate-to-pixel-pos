
import React, { useState } from 'react';
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
import { toast } from "sonner";
import { Upload, Image as ImageIcon, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface AddMenuItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: MenuItemFormData) => void;
}

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

const SAMPLE_CATEGORIES = [
  { id: 'starters', name: 'Starters' },
  { id: 'main', name: 'Main Course' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'specials', name: 'Specials' },
];

const SAMPLE_BRANCHES = [
  { id: 'branch-1', name: 'Downtown Branch' },
  { id: 'branch-2', name: 'Uptown Branch' },
  { id: 'branch-3', name: 'Central Branch' },
];

export function AddMenuItemForm({ open, onOpenChange, onSubmit }: AddMenuItemFormProps) {
  const [formData, setFormData] = useState<MenuItemFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true,
    preparationTime: '',
    imageUrl: '',
    branches: ['branch-1'],
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should not exceed 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };
  
  const handleChange = (field: keyof MenuItemFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    // Simple validation
    if (!formData.name.trim()) {
      toast.error('Item name is required');
      return;
    }
    
    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }
    
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }
    
    if (!formData.imageUrl) {
      toast.error('Please upload an image for the menu item');
      return;
    }
    
    // Submit the form data
    onSubmit?.(formData);
    
    // Close the dialog
    onOpenChange(false);
    
    // Show success message
    toast.success(`Menu item "${formData.name}" has been created`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
          <DialogDescription>
            Add details about your new menu item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Left column - Basic details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Margherita Pizza" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                type="number"
                placeholder="9.99" 
                value={formData.price.toString()}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preparation-time">Preparation Time (minutes)</Label>
              <Input 
                id="preparation-time" 
                placeholder="e.g., 15" 
                value={formData.preparationTime}
                onChange={(e) => handleChange('preparationTime', e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => handleChange('available', checked)}
              />
              <Label htmlFor="available">Item is available</Label>
            </div>
          </div>
          
          {/* Right column - Description and Image */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the menu item..." 
                className="min-h-[80px]"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Item Image</Label>
              {imagePreview ? (
                <div className="relative aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={imagePreview} 
                    alt="Menu item preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border rounded-md p-4 text-center">
                  <div className="mb-2 flex justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload an image of your menu item
                  </p>
                  <Label 
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Browse...
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
            
            <div className="space-y-2">
              <Label htmlFor="branches">Available at Branches</Label>
              <div className="flex flex-wrap gap-2 border rounded-md p-2">
                {SAMPLE_BRANCHES.map(branch => {
                  const isSelected = formData.branches.includes(branch.id);
                  return (
                    <div 
                      key={branch.id}
                      className={`px-3 py-1 text-xs rounded-full cursor-pointer
                        ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                      `}
                      onClick={() => {
                        if (isSelected) {
                          handleChange('branches', formData.branches.filter(id => id !== branch.id));
                        } else {
                          handleChange('branches', [...formData.branches, branch.id]);
                        }
                      }}
                    >
                      {branch.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
