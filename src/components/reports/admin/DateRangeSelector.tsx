
import React from 'react';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface DateRangeSelectorProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  branchFilter: string;
  onBranchFilterChange: (value: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onDateRangeChange,
  branchFilter,
  onBranchFilterChange
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <DateRangePicker 
        className="w-[260px]"
        initialDateFrom={dateRange?.from}
        initialDateTo={dateRange?.to}
        onUpdate={onDateRangeChange}
      />
      <Select value={branchFilter} onValueChange={onBranchFilterChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>
          <SelectItem value="Downtown">Downtown</SelectItem>
          <SelectItem value="Uptown">Uptown</SelectItem>
          <SelectItem value="Westside">Westside</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">
        <FileDown className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default DateRangeSelector;
