
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Progress } from "@/components/ui/progress";

interface FeedbackSentimentAnalysisProps {
  sentimentData: Array<{
    name: string;
    value: number;
  }>;
}

const FeedbackSentimentAnalysis: React.FC<FeedbackSentimentAnalysisProps> = ({ sentimentData }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Feedback Sentiment</CardTitle>
        <CardDescription>Analysis of customer feedback and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="cell-0" fill="#4ade80" />
                  <Cell key="cell-1" fill="#94a3b8" />
                  <Cell key="cell-2" fill="#f87171" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#4ade80] mr-2" />
                  <span className="font-medium">Positive</span>
                </div>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2 bg-gray-100" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#94a3b8] mr-2" />
                  <span className="font-medium">Neutral</span>
                </div>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2 bg-gray-100" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#f87171] mr-2" />
                  <span className="font-medium">Negative</span>
                </div>
                <span>10%</span>
              </div>
              <Progress value={10} className="h-2 bg-gray-100" />
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Overall sentiment is positive with customer satisfaction increasing by 5% compared to previous month. Key areas of improvement: wait times and service speed.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSentimentAnalysis;
