import React, { useState } from 'react';
import { TrendingUp, Eye, MousePointer, BarChart3, Calendar, Filter, DollarSign, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { useLinks } from '../hooks/useLinks';
import { format, subDays, startOfDay } from 'date-fns';

export const Analytics: React.FC = () => {
  const { links } = useLinks();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'clicks' | 'conversions' | 'revenue'>('revenue');

  // Calculate aggregate metrics
  const totalViews = links.reduce((sum, link) => sum + link.analytics.totalViews, 0);
  const totalClicks = links.reduce((sum, link) => sum + link.analytics.totalClicks, 0);
  const totalConversions = links.reduce((sum, link) => sum + link.analytics.totalConversions, 0);
  const totalRevenue = links.reduce((sum, link) => sum + link.analytics.totalRevenue, 0);
  const avgCTR = links.length > 0 ? links.reduce((sum, link) => sum + link.analytics.ctr, 0) / links.length : 0;
  const avgConversionRate = links.length > 0 ? links.reduce((sum, link) => sum + link.analytics.conversionRate, 0) / links.length : 0;

  // Generate time series data
  const getDaysInRange = (days: number) => {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      result.push(format(startOfDay(subDays(new Date(), i)), 'yyyy-MM-dd'));
    }
    return result;
  };

  const timeRangeMap = { '7d': 7, '30d': 30, '90d': 90 };
  const daysInRange = getDaysInRange(timeRangeMap[timeRange]);

  const chartData = daysInRange.map(date => {
    const dayData = { date, views: 0, clicks: 0, conversions: 0, revenue: 0 };
    
    links.forEach(link => {
      const linkDayData = link.analytics.dailyStats.find(stat => stat.date === date);
      if (linkDayData) {
        dayData.views += linkDayData.views;
        dayData.clicks += linkDayData.clicks;
        dayData.conversions += linkDayData.conversions;
        dayData.revenue += linkDayData.revenue;
      }
    });
    
    return dayData;
  });

  // Top performing links by revenue
  const topLinks = [...links]
    .sort((a, b) => {
      switch (selectedMetric) {
        case 'views':
          return b.analytics.totalViews - a.analytics.totalViews;
        case 'clicks':
          return b.analytics.totalClicks - a.analytics.totalClicks;
        case 'conversions':
          return b.analytics.totalConversions - a.analytics.totalConversions;
        case 'revenue':
          return b.analytics.totalRevenue - a.analytics.totalRevenue;
        default:
          return 0;
      }
    })
    .slice(0, 5);

  // Platform revenue breakdown
  const platformRevenue = links.reduce((acc, link) => {
    Object.entries(link.analytics.platformBreakdown).forEach(([platform, metrics]) => {
      if (!acc[platform]) {
        acc[platform] = { revenue: 0, conversions: 0, clicks: 0 };
      }
      acc[platform].revenue += metrics.revenue;
      acc[platform].conversions += metrics.conversions;
      acc[platform].clicks += metrics.clicks;
    });
    return acc;
  }, {} as Record<string, { revenue: number; conversions: number; clicks: number }>);

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+24%',
      changeType: 'increase' as const,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Total Conversions',
      value: totalConversions.toLocaleString(),
      icon: Target,
      change: '+18%',
      changeType: 'increase' as const,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Total Clicks',
      value: totalClicks.toLocaleString(),
      icon: MousePointer,
      change: '+12%',
      changeType: 'increase' as const,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Conversion Rate',
      value: `${avgConversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: '+3.2%',
      changeType: 'increase' as const,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title="Revenue Analytics" 
        subtitle="Track your traffic generation performance and revenue attribution"
      />
      
      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="revenue">Revenue</option>
                <option value="conversions">Conversions</option>
                <option value="clicks">Clicks</option>
                <option value="views">Views</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {links.length} active campaigns generating revenue
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last period</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
                <p className="text-sm text-gray-600">
                  {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} performance over time
                </p>
              </div>
            </div>
            <AnalyticsChart data={chartData} type="area" />
          </div>

          {/* Platform Revenue Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Revenue</h3>
            <div className="space-y-4">
              {Object.entries(platformRevenue)
                .sort(([,a], [,b]) => b.revenue - a.revenue)
                .map(([platform, metrics]) => {
                const percentage = (metrics.revenue / totalRevenue) * 100;
                return (
                  <div key={platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {platform}
                      </span>
                      <span className="text-sm text-gray-900 font-semibold">
                        ${metrics.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{metrics.conversions} conversions</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Performing Campaigns */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Campaigns</h3>
              <p className="text-sm text-gray-600">
                Ranked by {selectedMetric}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {topLinks.map((link, index) => {
              const metricValue = selectedMetric === 'views' ? link.analytics.totalViews :
                                selectedMetric === 'clicks' ? link.analytics.totalClicks :
                                selectedMetric === 'conversions' ? link.analytics.totalConversions :
                                link.analytics.totalRevenue;
              
              return (
                <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-1">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {link.platforms.filter(p => p.posted).length} platforms • {format(link.createdAt, 'MMM d')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {selectedMetric === 'revenue' ? '$' : ''}{metricValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedMetric}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};