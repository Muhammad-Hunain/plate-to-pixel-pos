
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange
}) => {
  const [hour, setHour] = useState(() => {
    if (!value) return "12";
    const parts = value.split(":");
    const hourVal = parseInt(parts[0]);
    return hourVal > 12 ? (hourVal - 12).toString().padStart(2, '0') : hourVal.toString().padStart(2, '0');
  });
  
  const [minute, setMinute] = useState(() => {
    if (!value) return "00";
    const parts = value.split(":");
    return parts[1]?.split(" ")[0] || "00";
  });
  
  const [period, setPeriod] = useState(() => {
    if (!value) return "AM";
    return value.includes("PM") ? "PM" : "AM";
  });

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHour = e.target.value;
    if (newHour === "") {
      setHour("");
    } else {
      let hourNum = parseInt(newHour);
      if (isNaN(hourNum) || hourNum < 1) hourNum = 1;
      if (hourNum > 12) hourNum = 12;
      setHour(hourNum.toString().padStart(2, '0'));
      updateTime(hourNum.toString().padStart(2, '0'), minute, period);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinute = e.target.value;
    if (newMinute === "") {
      setMinute("");
    } else {
      let minNum = parseInt(newMinute);
      if (isNaN(minNum) || minNum < 0) minNum = 0;
      if (minNum > 59) minNum = 59;
      setMinute(minNum.toString().padStart(2, '0'));
      updateTime(hour, minNum.toString().padStart(2, '0'), period);
    }
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    updateTime(hour, minute, newPeriod);
  };

  const updateTime = (h: string, m: string, p: string) => {
    let hourNum = parseInt(h);
    if (p === "PM" && hourNum !== 12) hourNum += 12;
    if (p === "AM" && hourNum === 12) hourNum = 0;
    const timeString = `${hourNum.toString().padStart(2, '0')}:${m} ${p}`;
    onChange(timeString);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        inputMode="numeric"
        value={hour}
        onChange={handleHourChange}
        maxLength={2}
        className="w-[40px] text-center px-0"
      />
      <span className="text-center">:</span>
      <Input
        type="text"
        inputMode="numeric"
        value={minute}
        onChange={handleMinuteChange}
        maxLength={2}
        className="w-[40px] text-center px-0"
      />
      <Select value={period} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder={period} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeInput;
