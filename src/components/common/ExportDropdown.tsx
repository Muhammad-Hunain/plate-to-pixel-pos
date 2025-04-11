
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FileDown, FileText, FileSpreadsheet, File } from "lucide-react";

interface ExportDropdownProps {
  onExport: (format: "pdf" | "csv" | "docx") => void;
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
          <File className="h-4 w-4 mr-2" /> 
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport("csv")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" /> 
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport("docx")}>
          <FileText className="h-4 w-4 mr-2" /> 
          Export as DOCX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
