
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { NotificationDemo } from "@/components/dashboard/NotificationDemo";

// Import the existing components
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
import BranchPerformanceChart from "@/components/dashboard/BranchPerformanceChart";
import UserActivityMap from "@/components/dashboard/UserActivityMap";
import RealtimeActivityFeed from "@/components/dashboard/RealtimeActivityFeed";
import SalesPerformanceChart from "@/components/dashboard/SalesPerformanceChart";
import DashboardActionButtons from "@/components/dashboard/DashboardActionButtons";

// Icons import
import { 
  Building, Users, DollarSign, CreditCard, TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with notification demo */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Admin overview of the entire platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <NotificationDemo />
            <DashboardActionButtons />
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedStatsCard
            title="Total Restaurants"
            value="124"
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: "+6%", positive: true }}
            trendLabel="from last month"
            delay={0}
          />
          
          <AnimatedStatsCard
            title="Total Users"
            value="3,721"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: "+12%", positive: true }}
            trendLabel="from last month"
            delay={100}
          />
          
          <AnimatedStatsCard
            title="Monthly Revenue"
            value="$48,294"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: "+8%", positive: true }}
            trendLabel="from last month"
            delay={200}
          />
          
          <AnimatedStatsCard
            title="Active Subscriptions"
            value="105"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: "+3%", positive: true }}
            trendLabel="from last month"
            delay={300}
          />
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedDashboardCard className="lg:col-span-2" delay={0} title="Sales Performance">
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesPerformanceChart />
                </CardContent>
              </AnimatedDashboardCard>
              
              <AnimatedDashboardCard delay={100} title="Growth Metrics">
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Users', 'Restaurants', 'Revenue'].map((metric, i) => (
                      <div key={metric} className="flex items-center">
                        <div className="w-full max-w-md">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{metric}</span>
                            <span className="text-sm text-muted-foreground">+{(12 + i * 4)}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${65 + i * 5}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedDashboardCard>
            </div>

            {/* Branch Performance and User Map */}
            <div className="grid gap-4 md:grid-cols-2">
              <AnimatedDashboardCard delay={200} title="Top Restaurants">
                <CardHeader>
                  <CardTitle>Top Restaurants</CardTitle>
                </CardHeader>
                <CardContent>
                  <BranchPerformanceChart 
                    data={[
                      { name: "Branch A", value: 35 },
                      { name: "Branch B", value: 27 },
                      { name: "Branch C", value: 18 },
                      { name: "Branch D", value: 15 },
                      { name: "Branch E", value: 5 }
                    ]}
                    title="Performance by Branch"
                  />
                </CardContent>
              </AnimatedDashboardCard>
              
              <AnimatedDashboardCard delay={300} title="User Distribution">
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserActivityMap />
                </CardContent>
              </AnimatedDashboardCard>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: 'New Signups (30d)', value: '243', icon: <TrendingUp />, change: '+18%' },
                    { title: 'Avg. Order Value', value: '$32.84', icon: <DollarSign />, change: '+2.4%' },
                    { title: 'Customer Retention', value: '68%', icon: <Users />, change: '+5%' },
                    { title: 'Premium Subscriptions', value: '42', icon: <CreditCard />, change: '+12%' }
                  ].map((item, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
                            <h4 className="text-2xl font-bold">{item.value}</h4>
                            <p className="text-xs text-green-500 mt-1">{item.change} from last month</p>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {item.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <RealtimeActivityFeed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
