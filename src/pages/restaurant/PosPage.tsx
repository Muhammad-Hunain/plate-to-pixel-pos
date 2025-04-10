
import { useState, useRef } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useReactToPrint } from 'react-to-print';

export default function PosPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const receiptRef = useRef(null);
  
  // Fix for printing functionality
  const handlePrint = useReactToPrint({
    documentTitle: `Receipt-${selectedOrder?.id || 'New'}`,
    content: () => receiptRef.current
  });

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Point of Sale</h1>
            <p className="text-muted-foreground">
              Process orders, manage tables, and print receipts
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Replace the button onClick handler */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (receiptRef.current) {
                  handlePrint();
                }
              }}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        </div>
        
        <div ref={receiptRef}>
          {/* Receipt content will go here */}
          <div className="bg-white p-6 rounded-md border">
            <h2 className="text-xl font-bold mb-4">Receipt Preview</h2>
            <p className="text-muted-foreground">
              Select an order to see the receipt details here.
            </p>
          </div>
        </div>
        
        {/* POS content - this is a placeholder for the actual POS system */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-card rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Orders</h2>
              <p className="text-muted-foreground text-sm">No active orders</p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="bg-card rounded-md p-4 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Menu Items</h2>
              <p className="text-muted-foreground text-sm">Select items to add to the order</p>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
