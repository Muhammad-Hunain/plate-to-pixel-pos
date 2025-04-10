
import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangePickerProps {
  className?: string;
  initialDateFrom?: Date;
  initialDateTo?: Date;
  onUpdate?: (dateRange: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  initialDateFrom,
  initialDateTo,
  onUpdate,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialDateFrom,
    to: initialDateTo,
  });

  // Define preset options
  const presets = [
    {
      id: "today",
      name: "Today",
      dates: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      id: "yesterday",
      name: "Yesterday",
      dates: {
        from: addDays(new Date(), -1),
        to: addDays(new Date(), -1),
      },
    },
    {
      id: "last7days",
      name: "Last 7 days",
      dates: {
        from: addDays(new Date(), -6),
        to: new Date(),
      },
    },
    {
      id: "last30days",
      name: "Last 30 days",
      dates: {
        from: addDays(new Date(), -29),
        to: new Date(),
      },
    },
    {
      id: "thismonth",
      name: "This month",
      dates: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
    {
      id: "lastmonth",
      name: "Last month",
      dates: {
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
    },
    {
      id: "thisyear",
      name: "This year",
      dates: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
    {
      id: "lastyear",
      name: "Last year",
      dates: {
        from: new Date(new Date().getFullYear() - 1, 0, 1),
        to: new Date(new Date().getFullYear() - 1, 11, 31),
      },
    },
  ];

  const handleSelect = (preset: string) => {
    const selectedPreset = presets.find((p) => p.id === preset);
    if (selectedPreset) {
      setDate(selectedPreset.dates);
      if (onUpdate) {
        onUpdate(selectedPreset.dates);
      }
    }
  };

  React.useEffect(() => {
    if (initialDateFrom && initialDateTo && !date?.from && !date?.to) {
      setDate({
        from: initialDateFrom,
        to: initialDateTo,
      });
    }
  }, [initialDateFrom, initialDateTo, date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal hover-scale",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col sm:flex-row">
            <div className="border-r p-2">
              <Select onValueChange={handleSelect}>
                <SelectTrigger className="h-8 w-[150px] hover-scale">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((preset) => (
                    <SelectItem 
                      key={preset.id} 
                      value={preset.id}
                      className="hover-scale"
                    >
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                if (onUpdate) {
                  onUpdate(selectedDate);
                }
              }}
              numberOfMonths={2}
              className="p-3"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
