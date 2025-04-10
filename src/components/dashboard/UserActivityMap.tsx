
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Globe, MapPin, Users } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Cell, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { region: "North America", users: 876, active: 720, growth: 12.5 },
  { region: "Europe", users: 654, active: 532, growth: 8.3 },
  { region: "Asia", users: 498, active: 387, growth: 15.2 },
  { region: "South America", users: 235, active: 189, growth: 5.1 },
  { region: "Africa", users: 156, active: 92, growth: 18.7 },
  { region: "Oceania", users: 124, active: 87, growth: 7.2 },
];

const COLORS = [
  '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'
];

export default function UserActivityMap() {
  return (
    <Card className="col-span-12 lg:col-span-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">User Activity by Region</CardTitle>
            <CardDescription>Active users distributed by geographic regions</CardDescription>
          </div>
          <Badge variant="outline" className="flex gap-1 items-center">
            <Globe className="h-3 w-3" />
            Global View
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={data}
              margin={{ top: 0, right: 50, bottom: 0, left: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                dataKey="region" 
                type="category" 
                scale="band" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                width={60}
              />
              <Tooltip />
              <Bar dataKey="users" barSize={20} fill="#8884d8" name="Total Users">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
              <Bar dataKey="active" barSize={10} fill="#82ca9d" name="Active Users" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="text-sm font-medium">Growth Trends</div>
          <div className="grid grid-cols-3 gap-4">
            {data.slice(0, 3).map((region, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <div className="flex-1 text-xs">{region.region}</div>
                <div className="text-xs font-semibold text-emerald-500">+{region.growth}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
