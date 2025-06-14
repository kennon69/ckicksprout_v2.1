import React from 'react';
import { DollarSign, TrendingUp, Target, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { LinkAnalytics, TrafficSource } from '../types';

interface RevenueAnalyticsProps {
  analytics: LinkAnalytics;
  linkTitle: string;
}

export const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({
  analytics,
  linkTitle,
}) => {
  const revenueGrowth = analytics.dailyStats.length > 1 
    ? ((analytics.dailyStats[analytics.dailyStats.length - 1].revenue - analytics.dailyStats[0].revenue) / analytics.dailyStats[0].revenue) * 100
    : 0;

  const topPerformingPlatform = Object.entries(analytics.platformBreakdown)
    .sort(([,a], [,b]) => b.revenue - a.revenue)[0];

  const conversionValue = analytics.totalRevenue / analytics.totalConversions || 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
          <p className="text-sm text-gray-600">
            Performance metrics for "{linkTitle}"
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900">
                ${analytics.totalRevenue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center">
            <span className={`text-sm font-medium ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
            </span>
            <span className="text-sm text-green-700 ml-2">vs. first day</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Conversions</p>
              <p className="text-2xl font-bold text-blue-900">
                {analytics.totalConversions.toLocaleString()}
              </p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-blue-600">
              {analytics.conversionRate.toFixed(1)}%
            </span>
            <span className="text-sm text-blue-700 ml-2">conversion rate</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Avg. Order Value</p>
              <p className="text-2xl font-bold text-purple-900">
                ${conversionValue.toFixed(0)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-purple-700">per conversion</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800">Top Platform</p>
              <p className="text-lg font-bold text-orange-900 capitalize">
                {topPerformingPlatform?.[0] || 'N/A'}
              </p>
            </div>
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-orange-600">
              ${topPerformingPlatform?.[1]?.revenue.toLocaleString() || 0}
            </span>
            <span className="text-sm text-orange-700 ml-2">revenue</span>
          </div>
        </motion.div>
      </div>

      {/* Traffic Sources */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-4">Revenue by Traffic Source</h4>
        <div className="space-y-3">
          {analytics.trafficSources.map((source, index) => (
            <div key={source.source} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500" style={{
                  backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                }} />
                <span className="font-medium text-gray-900">{source.source}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ${source.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {source.conversions} conversions
                  </div>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${source.percentage}%`,
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-12 text-right">
                  {source.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Performance */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Platform Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(analytics.platformBreakdown).map(([platform, metrics]) => (
            <div key={platform} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900 capitalize">{platform}</h5>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Revenue</div>
                  <div className="font-semibold text-green-600">
                    ${metrics.revenue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Conversions</div>
                  <div className="font-semibold text-gray-900">
                    {metrics.conversions}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Clicks</div>
                  <div className="font-semibold text-gray-900">
                    {metrics.clicks.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Posts</div>
                  <div className="font-semibold text-gray-900">
                    {metrics.posts}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Conversion Rate</span>
                  <span className="font-medium text-gray-900">
                    {((metrics.conversions / metrics.clicks) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};