
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImagePlus, X } from "lucide-react";

interface MenuItemImageUploadProps {
  form: any; // This would ideally be typed with the specific form type
}

const MenuItemImageUpload: React.FC<MenuItemImageUploadProps> = ({ form }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    form.setValue("image", file);
    
    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const removeImage = () => {
    form.setValue("image", null);
    setPreviewUrl(null);
  };

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Item Image</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {!previewUrl ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
                  onClick={() => document.getElementById('item-image-upload')?.click()}>
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload an image
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF up to 5MB
                  </p>
                  <Input 
                    id="item-image-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Menu item preview" 
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MenuItemImageUpload;
