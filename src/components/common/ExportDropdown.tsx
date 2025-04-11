
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Download, FileDown } from "lucide-react";

interface ExportDropdownProps {
  onExport: (format: "pdf" | "csv") => void;
  buttonText?: string;
}

export default function ExportDropdown({ onExport, buttonText = "Export" }: ExportDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onExport("pdf")}>
          <Download className="h-4 w-4 mr-2" /> 
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport("csv")}>
          <Download className="h-4 w-4 mr-2" /> 
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
