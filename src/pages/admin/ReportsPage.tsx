import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Import refactored components
import StatsCards from "@/components/reports/admin/StatsCards";
import DateRangeSelector from "@/components/reports/admin/DateRangeSelector";
import RevenueCharts from "@/components/reports/admin/RevenueCharts";
import SalesChart from "@/components/reports/admin/SalesChart";
import DemographicsChart from "@/components/reports/admin/DemographicsChart";
import RecentTransactions from "@/components/reports/admin/RecentTransactions";
import AllTransactions from "@/components/reports/admin/AllTransactions";

// Mock data for revenue
const revenueData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

// Sales by category data
const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// Demographics data
const radialBarData = [
  {
    name: "18-24",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "30-34",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "35-39",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "40+",
    uv: 6.35,
    pv: 4300,
    fill: "#a4de6c",
  },
];

// Mock transactions data
const transactionsData = [
  {
    id: "TX001",
    customer: "John Smith",
    date: "2025-04-10",
    time: "14:30",
    amount: 42.50,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emma Wilson",
  },
  {
    id: "TX002",
    customer: "Sarah Johnson",
    date: "2025-04-10",
    time: "15:45",
    amount: 28.75,
    status: "completed",
    type: "takeaway",
    branch: "Uptown",
    staff: "James Davis",
  },
  {
    id: "TX003",
    customer: "Michael Brown",
    date: "2025-04-10",
    time: "16:20",
    amount: 67.30,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emma Wilson",
  },
  {
    id: "TX004",
    customer: "Emma Wilson",
    date: "2025-04-10",
    time: "17:05",
    amount: 22.95,
    status: "completed",
    type: "delivery",
    branch: "Westside",
    staff: "Thomas Lee",
  },
  {
    id: "TX005",
    customer: "David Lee",
    date: "2025-04-10",
    time: "18:15",
    amount: 54.80,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emily Taylor",
  },
  {
    id: "TX006",
    customer: "Lisa Chen",
    date: "2025-04-10",
    time: "19:00",
    amount: 36.25,
    status: "completed",
    type: "takeaway",
    branch: "Uptown",
    staff: "James Davis",
  },
  {
    id: "TX007",
    customer: "Robert Wilson",
    date: "2025-04-10",
    time: "19:45",
    amount: 48.75,
    status: "completed",
    type: "dine-in",
    branch: "Westside",
    staff: "Thomas Lee",
  },
  {
    id: "TX008",
    customer: "Jennifer Lopez",
    date: "2025-04-10",
    time: "20:30",
    amount: 31.50,
    status: "completed",
    type: "delivery",
    branch: "Downtown",
    staff: "Emily Taylor",
  },
  {
    id: "TX009",
    customer: "Daniel Smith",
    date: "2025-04-10",
    time: "21:15",
    amount: 72.40,
    status: "completed",
    type: "dine-in",
    branch: "Uptown",
    staff: "James Davis",
  },
  {
    id: "TX010",
    customer: "Michelle Wang",
    date: "2025-04-10",
    time: "21:45",
    amount: 26.95,
    status: "completed",
    type: "takeaway",
    branch: "Westside",
    staff: "Thomas Lee",
  },
  {
    id: "TX011",
    customer: "Kevin Johnson",
    date: "2025-04-10",
    time: "22:00",
    amount: 45.60,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emma Wilson",
  },
  {
    id: "TX012",
    customer: "Amanda Taylor",
    date: "2025-04-10",
    time: "22:30",
    amount: 33.85,
    status: "completed",
    type: "delivery",
    branch: "Uptown",
    staff: "James Davis",
  },
];

const ReportsPage = () => {
  // State variables for filtering
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 10)
  });
  const [branchFilter, setBranchFilter] = useState("all");
  const [currentTab, setCurrentTab] = useState("revenue");
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Detailed insights and analytics for your platform
            </p>
          </div>
          <DateRangeSelector 
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            branchFilter={branchFilter}
            onBranchFilterChange={setBranchFilter}
          />
        </div>
        
        <StatsCards />

        <Tabs 
          value={currentTab} 
          onValueChange={setCurrentTab} 
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          {/* Revenue Tab Content */}
          <TabsContent value="revenue" className="space-y-6">
            <RevenueCharts revenueData={revenueData} pieData={pieData} />
            <RecentTransactions 
              transactions={transactionsData} 
              onViewAll={() => setShowAllTransactions(true)} 
            />
          </TabsContent>

          {/* Sales Tab Content */}
          <TabsContent value="sales" className="space-y-6">
            <SalesChart revenueData={revenueData} />
          </TabsContent>

          {/* Demographics Tab Content */}
          <TabsContent value="demographics">
            <DemographicsChart radialBarData={radialBarData} />
          </TabsContent>
        </Tabs>

        {/* Full Transactions View */}
        {showAllTransactions && (
          <AllTransactions 
            transactions={transactionsData}
            onClose={() => setShowAllTransactions(false)}
            branchFilter={branchFilter}
            setBranchFilter={setBranchFilter}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
