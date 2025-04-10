
// Fix for printing functionality
import { useReactToPrint } from 'react-to-print';

// Replace the hook usage
const handlePrint = useReactToPrint({
  documentTitle: `Receipt-${selectedOrder?.id || 'New'}`,
  // Remove the 'content' property and use a ref instead
  onBeforeGetContent: () => {
    // Logic before printing
    return Promise.resolve();
  },
});

// Replace the button onClick handler
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
