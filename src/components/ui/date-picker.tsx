
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

interface DatePickerProps {
  mode: "single" | "range" | "multiple"
  selected?: Date | Date[] | DateRange | undefined
  onSelect: (date: Date | Date[] | DateRange | undefined) => void
  placeholderText?: string
  className?: string
}

export function DatePicker({
  mode,
  selected,
  onSelect,
  placeholderText = "Pick a date",
  className
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected instanceof Date ? format(selected, "PPP") : placeholderText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {mode === "single" && (
          <Calendar
            mode="single"
            selected={selected as Date}
            onSelect={onSelect as (date: Date | undefined) => void}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        )}
        {mode === "range" && (
          <Calendar
            mode="range"
            selected={selected as DateRange}
            onSelect={onSelect as (date: DateRange | undefined) => void}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        )}
        {mode === "multiple" && (
          <Calendar
            mode="multiple"
            selected={selected as Date[]}
            onSelect={onSelect as (date: Date[] | undefined) => void}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
