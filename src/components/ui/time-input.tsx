
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface TimeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="time"
        className={cn(
          "w-full", // Make the width consistent
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

TimeInput.displayName = "TimeInput";

export { TimeInput };
