
import { useState } from "react";
import { AddMenuItemForm } from "@/components/menu/AddMenuItemForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

interface MenuItemDialogProps {
  onAddItem?: (data: MenuItemFormData) => void;
  triggerButtonText?: string;
  hideButton?: boolean;
}

export function MenuItemDialog({ 
  onAddItem, 
  triggerButtonText = "Add Menu Item",
  hideButton = false
}: MenuItemDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: MenuItemFormData) => {
    onAddItem?.(data);
    setOpen(false);
  };

  return (
    <>
      {!hideButton && (
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {triggerButtonText}
        </Button>
      )}
      
      <AddMenuItemForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
