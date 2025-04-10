
import React, { useState, useEffect } from "react";
import { Search, Filter, ArrowDownAZ, X, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
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
  const [sortOrder, setSortOrder] = useState<"nameAsc" | "nameDesc" | "priceAsc" | "priceDesc" | null>(null);
  const [priceFilter, setPriceFilter] = useState<{min: number, max: number} | null>(null);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  
  // When menu loads, open all accordions by default
  useEffect(() => {
    setOpenAccordions(menuCategories.map(cat => `category-${cat.id}`));
  }, [menuCategories]);
  
  // Get price range for filters
  const priceRange = React.useMemo(() => {
    const prices = menuItems.map(item => item.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [menuItems]);
  
  // Filter menu items by search query, selected category, and price range
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? 
      item.category === parseInt(selectedCategory) : true;
    const matchesPriceRange = priceFilter ? 
      (item.price >= priceFilter.min && item.price <= priceFilter.max) : true;
      
    return matchesSearch && matchesCategory && matchesPriceRange;
  });
  
  // Sort menu items
  const sortedMenuItems = [...filteredMenuItems].sort((a, b) => {
    if (sortOrder === "nameAsc") return a.name.localeCompare(b.name);
    if (sortOrder === "nameDesc") return b.name.localeCompare(a.name);
    if (sortOrder === "priceAsc") return a.price - b.price;
    if (sortOrder === "priceDesc") return b.price - a.price;
    return 0;
  });
  
  // Group menu items by category
  const groupedMenuItems = menuCategories.map(category => {
    const items = sortedMenuItems.filter(item => item.category === category.id);
    return {
      ...category,
      items
    };
  }).filter(group => group.items.length > 0);
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceFilter(null);
    setSortOrder(null);
    toast("All filters cleared");
  };

  return (
    <>
      <div className="flex flex-col gap-4 pb-4">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 items-center">
            {/* Display active filters */}
            <div className="flex flex-wrap gap-1">
              {selectedCategory && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {menuCategories.find(c => c.id.toString() === selectedCategory)?.name}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedCategory(null)} 
                  />
                </Badge>
              )}
              {priceFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  ${priceFilter.min} - ${priceFilter.max}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setPriceFilter(null)} 
                  />
                </Badge>
              )}
              {sortOrder && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {sortOrder === "nameAsc" && "A-Z"}
                  {sortOrder === "nameDesc" && "Z-A"}
                  {sortOrder === "priceAsc" && "$ - $$$"}
                  {sortOrder === "priceDesc" && "$$$ - $"}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setSortOrder(null)} 
                  />
                </Badge>
              )}
            </div>
            
            {/* Sort Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowDownAZ className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuItem 
                  onClick={() => setSortOrder("nameAsc")}
                  className={sortOrder === "nameAsc" ? "bg-accent" : ""}
                >
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder("nameDesc")}
                  className={sortOrder === "nameDesc" ? "bg-accent" : ""}
                >
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder("priceAsc")}
                  className={sortOrder === "priceAsc" ? "bg-accent" : ""}
                >
                  Price (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder("priceDesc")}
                  className={sortOrder === "priceDesc" ? "bg-accent" : ""}
                >
                  Price (High to Low)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Filter Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="text-xs font-semibold mb-2">Price Range</div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant={priceFilter?.min === 0 && priceFilter?.max === 10 ? "default" : "outline"}
                      className="h-7 text-xs px-2"
                      onClick={() => setPriceFilter({ min: 0, max: 10 })}
                    >
                      Under $10
                    </Button>
                    <Button 
                      size="sm" 
                      variant={priceFilter?.min === 10 && priceFilter?.max === 15 ? "default" : "outline"}
                      className="h-7 text-xs px-2"
                      onClick={() => setPriceFilter({ min: 10, max: 15 })}
                    >
                      $10-$15
                    </Button>
                    <Button 
                      size="sm" 
                      variant={priceFilter?.min === 15 ? "default" : "outline"}
                      className="h-7 text-xs px-2"
                      onClick={() => setPriceFilter({ min: 15, max: priceRange.max })}
                    >
                      $15+
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Clear Filters */}
            {(searchQuery || selectedCategory || priceFilter || sortOrder) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        {/* Category Toggle Group */}
        <div className="overflow-auto pb-2">
          <ToggleGroup 
            type="single" 
            value={selectedCategory || undefined}
            onValueChange={(value) => setSelectedCategory(value || null)}
            className="flex flex-nowrap min-w-max gap-2"
          >
            {menuCategories.map((category) => (
              <ToggleGroupItem 
                key={category.id}
                value={category.id.toString()}
                aria-label={category.name}
                className="flex items-center gap-1 px-3 py-1.5 whitespace-nowrap"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      {/* Menu Items by Category - Accordion Style */}
      <Accordion 
        type="multiple" 
        value={openAccordions}
        onValueChange={setOpenAccordions}
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
                    className="pos-item bg-background border rounded-md p-3 hover:border-primary cursor-pointer transition-colors hover:shadow-sm"
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
            <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-2">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p>No menu items found.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
            <Button 
              variant="link" 
              onClick={clearFilters}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Accordion>
    </>
  );
}
