
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, FileText, Download, BarChart2, ListFilter, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format, subDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExportDropdown from "@/components/common/ExportDropdown";

interface DashboardActionButtonsProps {
  className?: string;
}

export default function DashboardActionButtons({ className }: DashboardActionButtonsProps) {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("30");
  const [region, setRegion] = useState("all");
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    toast.success(`Data updated for last ${value} days`);
  };
  
  const handleRegionChange = (value: string) => {
    setRegion(value);
    toast.success(`Viewing data for ${value === 'all' ? 'all regions' : value}`);
  };
  
  const handleExportData = (format: "pdf" | "csv" | "docx") => {
    toast.success(`Preparing ${format.toUpperCase()} export, download will start shortly`);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`Data successfully exported as ${format.toUpperCase()}`);
    }, 1500);
  };
  
  const handleReportGeneration = () => {
    toast.success("Generating comprehensive report");
    
    // Simulate report generation delay
    setTimeout(() => {
      toast.success("Report generated successfully");
    }, 2000);
  };
  
  const today = new Date();
  const startDate = format(subDays(today, parseInt(timeRange)), 'MMM d, yyyy');
  const endDate = format(today, 'MMM d, yyyy');

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="animate-fade-in">
            <Calendar className="mr-2 h-4 w-4" />
            {`Last ${timeRange} Days`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="space-y-2">
            <h4 className="font-medium">Select time range</h4>
            <p className="text-xs text-muted-foreground">{startDate} - {endDate}</p>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time Range</SelectLabel>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="14">Last 14 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="60">Last 60 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="animate-fade-in [animation-delay:100ms]"
        onClick={handleReportGeneration}
      >
        <FileText className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
      
      <ExportDropdown 
        onExport={handleExportData}
        buttonText="Export Data"
      />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="animate-fade-in [animation-delay:100ms]"
          >
            <ListFilter className="mr-2 h-4 w-4" />
            {region === 'all' ? 'All Regions' : region}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="space-y-2">
            <h4 className="font-medium">Select region</h4>
            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Regions</SelectLabel>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="Central">Central</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button 
        size="sm" 
        className="animate-fade-in [animation-delay:300ms]"
        onClick={() => navigate('/admin/reports')}
      >
        <BarChart2 className="mr-2 h-4 w-4" />
        View All Reports
      </Button>
    </div>
  );
}
