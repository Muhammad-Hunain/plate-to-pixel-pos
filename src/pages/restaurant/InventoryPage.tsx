
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Package, Search, Plus, Coffee } from "lucide-react";

// Placeholder for Inventory page - to be completed with full implementation
export default function InventoryPage() {
  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">
              Track your restaurant inventory and supplies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="hover-scale">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">Inventory Management Coming Soon</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                This page is under development. Soon you'll be able to track your restaurant inventory and supplies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
