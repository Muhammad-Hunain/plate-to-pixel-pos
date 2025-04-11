
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { FileDown, FilePdf, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface ExportDropdownProps {
  onExportPDF?: () => void;
  onExportCSV?: () => void;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  align?: "center" | "end" | "start";
  exportFileName?: string;
  className?: string;
}

export default function ExportDropdown({
  onExportPDF,
  onExportCSV,
  buttonVariant = "outline",
  buttonSize = "default",
  align = "end",
  exportFileName = "export",
  className = "",
}: ExportDropdownProps) {
  
  // Default export handlers if none provided
  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      toast.success(`Exporting as PDF...`);
      // In a real implementation, this would generate a PDF file
    }
  };
  
  const handleExportCSV = () => {
    if (onExportCSV) {
      onExportCSV();
    } else {
      toast.success(`Exporting as CSV...`);
      // In a real implementation, this would generate a CSV file
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={`hover-scale ${className}`}>
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportPDF}>
          <FilePdf className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
