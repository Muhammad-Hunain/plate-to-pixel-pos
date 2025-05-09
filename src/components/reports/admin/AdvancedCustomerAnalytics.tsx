
import React from 'react';
import CustomerRetentionChart from './CustomerRetentionChart';
import AcquisitionChannelsChart from './AcquisitionChannelsChart';
import CustomerLifetimeValueChart from './CustomerLifetimeValueChart';
import FeedbackSentimentAnalysis from './FeedbackSentimentAnalysis';
import CustomerEngagementOverview from './CustomerEngagementOverview';

interface AdvancedCustomerAnalyticsProps {
  retentionData: any[];
  acquisitionData: any[];
  lifetimeValueData: any[];
  sentimentData: any[];
  colors: string[];
}

const AdvancedCustomerAnalytics: React.FC<AdvancedCustomerAnalyticsProps> = ({
  retentionData,
  acquisitionData,
  lifetimeValueData,
  sentimentData,
  colors
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 w-full">
      <CustomerRetentionChart retentionData={retentionData} />
      <AcquisitionChannelsChart acquisitionData={acquisitionData} colors={colors} />
      <CustomerLifetimeValueChart lifetimeValueData={lifetimeValueData} colors={colors} />
      <FeedbackSentimentAnalysis sentimentData={sentimentData} />
      <div className="md:col-span-2">
        <CustomerEngagementOverview />
      </div>
    </div>
  );
};

export default AdvancedCustomerAnalytics;
