
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, Filter, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type FilterOption = {
  id: string;
  label: string;
  value: string;
};

interface FilterMenuProps {
  options?: {
    categories?: FilterOption[];
    status?: FilterOption[];
    types?: FilterOption[];
    dateRange?: boolean;
    search?: boolean;
    toggles?: Array<{
      id: string;
      label: string;
    }>;
    custom?: React.ReactNode;
  };
  onFilterChange: (filters: Record<string, any>) => void;
  className?: string;
}

export function FilterMenu({ 
  options = {}, 
  onFilterChange,
  className
}: FilterMenuProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const handleFilterToggle = (key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (!newFilters[key]) {
      newFilters[key] = [value];
    } else if (newFilters[key].includes(value)) {
      newFilters[key] = newFilters[key].filter((v: string) => v !== value);
      if (newFilters[key].length === 0) {
        delete newFilters[key];
      }
    } else {
      newFilters[key] = [...newFilters[key], value];
    }
    
    setFilters(newFilters);
    updateActiveFilters(newFilters, searchQuery, dateRange);
    onFilterChange({ ...newFilters, search: searchQuery, dateRange });
  };
  
  const handleToggleChange = (key: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[key] = true;
    } else {
      delete newFilters[key];
    }
    
    setFilters(newFilters);
    updateActiveFilters(newFilters, searchQuery, dateRange);
    onFilterChange({ ...newFilters, search: searchQuery, dateRange });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    updateActiveFilters(filters, query, dateRange);
    onFilterChange({ ...filters, search: query, dateRange });
  };
  
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    updateActiveFilters(filters, searchQuery, range);
    onFilterChange({ ...filters, search: searchQuery, dateRange: range });
  };
  
  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setDateRange(undefined);
    setActiveFilters([]);
    onFilterChange({});
  };
  
  const updateActiveFilters = (
    currentFilters: Record<string, any>,
    query: string,
    range: DateRange | undefined
  ) => {
    const active: string[] = [];
    
    // Add filter categories
    Object.keys(currentFilters).forEach(key => {
      if (Array.isArray(currentFilters[key])) {
        currentFilters[key].forEach((value: string) => {
          const option = 
            (options.categories?.find(cat => cat.value === value)) ||
            (options.status?.find(s => s.value === value)) ||
            (options.types?.find(t => t.value === value));
          
          if (option) {
            active.push(`${key}: ${option.label}`);
          }
        });
      } else if (typeof currentFilters[key] === 'boolean' && currentFilters[key]) {
        const toggle = options.toggles?.find(t => t.id === key);
        if (toggle) {
          active.push(toggle.label);
        }
      }
    });
    
    // Add search query
    if (query) {
      active.push(`Search: ${query}`);
    }
    
    // Add date range
    if (range?.from) {
      if (range.to) {
        active.push(`Date: ${format(range.from, 'MMM dd')} - ${format(range.to, 'MMM dd')}`);
      } else {
        active.push(`Date: ${format(range.from, 'MMM dd')}`);
      }
    }
    
    setActiveFilters(active);
  };

  const removeFilter = (filter: string) => {
    // Extract filter type and value
    const [type, value] = filter.split(': ');
    
    if (type === 'Search') {
      setSearchQuery("");
      updateActiveFilters(filters, "", dateRange);
      onFilterChange({ ...filters, search: "", dateRange });
      return;
    }
    
    if (type === 'Date') {
      setDateRange(undefined);
      updateActiveFilters(filters, searchQuery, undefined);
      onFilterChange({ ...filters, search: searchQuery, dateRange: undefined });
      return;
    }
    
    // Handle category/status/type filters
    const newFilters = { ...filters };
    Object.keys(newFilters).forEach(key => {
      if (Array.isArray(newFilters[key])) {
        const matchingOption = 
          [...(options.categories || []), ...(options.status || []), ...(options.types || [])]
          .find(opt => opt.label === value);
          
        if (matchingOption) {
          newFilters[key] = newFilters[key].filter((v: string) => v !== matchingOption.value);
          if (newFilters[key].length === 0) {
            delete newFilters[key];
          }
        }
      }
    });
    
    // Handle toggle filters
    options.toggles?.forEach(toggle => {
      if (toggle.label === filter) {
        delete newFilters[toggle.id];
      }
    });
    
    setFilters(newFilters);
    updateActiveFilters(newFilters, searchQuery, dateRange);
    onFilterChange({ ...newFilters, search: searchQuery, dateRange });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {options.search && (
        <div className="relative">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[200px]"
          />
        </div>
      )}
      
      {options.categories && options.categories.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Category
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {options.categories.map(category => (
              <DropdownMenuItem
                key={category.id}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleFilterToggle('category', category.value)}
              >
                {category.label}
                {filters.category?.includes(category.value) && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {options.status && options.status.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {options.status.map(status => (
              <DropdownMenuItem
                key={status.id}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleFilterToggle('status', status.value)}
              >
                {status.label}
                {filters.status?.includes(status.value) && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {options.types && options.types.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Type
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {options.types.map(type => (
              <DropdownMenuItem
                key={type.id}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleFilterToggle('type', type.value)}
              >
                {type.label}
                {filters.type?.includes(type.value) && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {options.dateRange && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d")
                )
              ) : (
                "Date Range"
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
      
      {options.toggles && options.toggles.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              More Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {options.toggles.map(toggle => (
              <div key={toggle.id} className="flex items-center justify-between p-2">
                <Label htmlFor={toggle.id} className="cursor-pointer">
                  {toggle.label}
                </Label>
                <Switch
                  id={toggle.id}
                  checked={!!filters[toggle.id]}
                  onCheckedChange={(checked) => handleToggleChange(toggle.id, checked)}
                />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {options.custom && options.custom}
      
      {activeFilters.length > 0 && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleClearFilters}
          className="text-muted-foreground"
        >
          Clear filters
        </Button>
      )}
      
      <div className="flex flex-wrap gap-2 mt-2 w-full">
        {activeFilters.map(filter => (
          <Badge key={filter} variant="secondary" className="flex items-center gap-1">
            {filter}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removeFilter(filter)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
