
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Column {
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
  className?: string;
}

interface ResponsiveTableProps {
  data: any[];
  columns: Column[];
  className?: string;
  emptyMessage?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  data,
  columns,
  className = "",
  emptyMessage = "No data available"
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-6 bg-muted/50 rounded-md">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`table-responsive-sm ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={column.accessorKey || index}
                className={column.className}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell 
                  key={`${rowIndex}-${column.accessorKey || colIndex}`}
                  className={column.className}
                >
                  {column.cell 
                    ? column.cell(row) 
                    : row[column.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { ResponsiveTable };
