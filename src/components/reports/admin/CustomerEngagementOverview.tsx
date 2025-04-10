
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CustomerEngagementOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
        <CardDescription>Key customer interaction metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">App Engagement</span>
            <span className="text-sm text-muted-foreground">78%</span>
          </div>
          <Progress value={78} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Percentage of customers actively using the platform
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Loyalty Program</span>
            <span className="text-sm text-muted-foreground">62%</span>
          </div>
          <Progress value={62} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Percentage of customers enrolled in the loyalty program
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Newsletter Subscribers</span>
            <span className="text-sm text-muted-foreground">45%</span>
          </div>
          <Progress value={45} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Percentage of customers subscribed to newsletters
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Social Media Followers</span>
            <span className="text-sm text-muted-foreground">53%</span>
          </div>
          <Progress value={53} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Percentage of customers following on social media
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerEngagementOverview;
