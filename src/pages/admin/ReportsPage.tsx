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
import CustomerAnalyticsCharts from "@/components/reports/admin/CustomerAnalyticsCharts";
import DemographicsChart from "@/components/reports/admin/DemographicsChart";
import RecentTransactions from "@/components/reports/admin/RecentTransactions";
import AllTransactions from "@/components/reports/admin/AllTransactions";
import AdvancedCustomerAnalytics from "@/components/reports/admin/AdvancedCustomerAnalytics";

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

// Customer analytics data
const customerFrequencyData = [
  { name: "1 visit", value: 42 },
  { name: "2-3 visits", value: 28 },
  { name: "4-6 visits", value: 16 },
  { name: "7+ visits", value: 14 },
];

const trafficByHourData = [
  { hour: "6-8", customers: 45 },
  { hour: "8-10", customers: 92 },
  { hour: "10-12", customers: 136 },
  { hour: "12-14", customers: 185 },
  { hour: "14-16", customers: 121 },
  { hour: "16-18", customers: 95 },
  { hour: "18-20", customers: 158 },
  { hour: "20-22", customers: 112 },
  { hour: "22-24", customers: 48 },
];

const customerTrendsData = [
  { month: "Jan", new: 120, returning: 80 },
  { month: "Feb", new: 140, returning: 110 },
  { month: "Mar", new: 130, returning: 120 },
  { month: "Apr", new: 170, returning: 130 },
  { month: "May", new: 160, returning: 170 },
  { month: "Jun", new: 190, returning: 190 },
  { month: "Jul", new: 210, returning: 210 },
];

const customerSatisfactionData = [
  { month: "Jan", satisfaction: 92 },
  { month: "Feb", satisfaction: 93 },
  { month: "Mar", satisfaction: 91 },
  { month: "Apr", satisfaction: 95 },
  { month: "May", satisfaction: 94 },
  { month: "Jun", satisfaction: 97 },
  { month: "Jul", satisfaction: 96 },
];

const popularItemsData = [
  { name: "Classic Burger", value: 420 },
  { name: "Cheese Pizza", value: 380 },
  { name: "Caesar Salad", value: 210 },
  { name: "Chicken Wings", value: 190 },
  { name: "Fries", value: 360 },
];

const averageOrderValueData = [
  { day: "Mon", value: 25.4 },
  { day: "Tue", value: 28.6 },
  { day: "Wed", value: 27.2 },
  { day: "Thu", value: 30.1 },
  { day: "Fri", value: 35.8 },
  { day: "Sat", value: 38.2 },
  { day: "Sun", value: 32.5 },
];

// Customer retention data
const retentionData = [
  { month: "Jan", retention: 78 },
  { month: "Feb", retention: 76 },
  { month: "Mar", retention: 80 },
  { month: "Apr", retention: 82 },
  { month: "May", retention: 85 },
  { month: "Jun", retention: 84 },
  { month: "Jul", retention: 86 },
];

// Customer acquisition channels
const acquisitionData = [
  { name: "Direct", value: 35 },
  { name: "Social Media", value: 25 },
  { name: "Search", value: 20 },
  { name: "Referral", value: 15 },
  { name: "Email", value: 5 },
];

// Customer lifetime value by segment
const lifetimeValueData = [
  { segment: "Premium", value: 1250 },
  { segment: "Standard", value: 680 },
  { segment: "Basic", value: 320 },
  { segment: "Occasional", value: 150 },
];

// Feedback sentiment analysis
const sentimentData = [
  { name: "Positive", value: 65 },
  { name: "Neutral", value: 25 },
  { name: "Negative", value: 10 },
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

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

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
            <TabsTrigger value="customers">Customers</TabsTrigger>
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

          {/* Customers Tab Content */}
          <TabsContent value="customers" className="space-y-6">
            <CustomerAnalyticsCharts 
              customerTrendsData={customerTrendsData}
              customerFrequencyData={customerFrequencyData}
              trafficByHourData={trafficByHourData}
              customerSatisfactionData={customerSatisfactionData}
              popularItemsData={popularItemsData}
              averageOrderValueData={averageOrderValueData}
            />
            
            <AdvancedCustomerAnalytics 
              retentionData={retentionData}
              acquisitionData={acquisitionData}
              lifetimeValueData={lifetimeValueData}
              sentimentData={sentimentData}
              colors={COLORS}
            />
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
