
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

type MenuCategory = {
  id: number;
  name: string;
  icon: React.ElementType;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: number;
  image: string;
};

interface MenuItemsProps {
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
}

export function MenuItems({ menuCategories, menuItems, onAddItem }: MenuItemsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter menu items by search query and/or selected category
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? 
      item.category === parseInt(selectedCategory) : true;
      
    return matchesSearch && matchesCategory;
  });
  
  // Group menu items by category
  const groupedMenuItems = menuCategories.map(category => {
    const items = filteredMenuItems.filter(item => item.category === category.id);
    return {
      ...category,
      items
    };
  }).filter(group => group.items.length > 0);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between pb-3">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Category Toggle Group */}
      <ToggleGroup 
        type="single" 
        value={selectedCategory || undefined}
        onValueChange={(value) => setSelectedCategory(value || null)}
        className="flex flex-wrap gap-2 pb-4 overflow-x-auto"
      >
        {menuCategories.map((category) => (
          <ToggleGroupItem 
            key={category.id}
            value={category.id.toString()}
            aria-label={category.name}
            className="flex items-center gap-1 px-3 py-1.5"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Menu Items by Category - Accordion Style */}
      <Accordion 
        type="multiple" 
        defaultValue={menuCategories.map(cat => `category-${cat.id}`)}
        className="space-y-2"
      >
        {groupedMenuItems.map((categoryGroup) => (
          <AccordionItem 
            key={`category-${categoryGroup.id}`}
            value={`category-${categoryGroup.id}`}
            className="border rounded-md overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <categoryGroup.icon className="h-5 w-5" />
                <span className="font-medium">{categoryGroup.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({categoryGroup.items.length} items)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 bg-muted/20">
                {categoryGroup.items.map((item) => (
                  <div
                    key={item.id}
                    className="pos-item bg-background border rounded-md p-3 hover:border-primary cursor-pointer transition-colors"
                    onClick={() => onAddItem(item)}
                  >
                    <div className="aspect-square rounded-md bg-muted mb-2 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-medium truncate">{item.name}</div>
                    <div className="text-sm font-bold">${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {groupedMenuItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No menu items found. Try a different search term.
          </div>
        )}
      </Accordion>
    </>
  );
}
