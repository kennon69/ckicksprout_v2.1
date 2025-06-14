import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Eye, MousePointer, DollarSign, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { LinkCard } from '../components/LinkCard';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { useLinks } from '../hooks/useLinks';

export const Dashboard: React.FC = () => {
  const { links, loading } = useLinks();
  
  const recentLinks = links.slice(0, 3);
  const totalViews = links.reduce((sum, link) => sum + link.analytics.totalViews, 0);
  const totalClicks = links.reduce((sum, link) => sum + link.analytics.totalClicks, 0);
  const totalRevenue = links.reduce((sum, link) => sum + link.analytics.totalRevenue, 0);
  const totalConversions = links.reduce((sum, link) => sum + link.analytics.totalConversions, 0);
  const avgConversionRate = links.length > 0 ? links.reduce((sum, link) => sum + link.analytics.conversionRate, 0) / links.length : 0;

  // Aggregate daily stats for chart
  const chartData = links.reduce((acc: any[], link) => {
    link.analytics.dailyStats.forEach(stat => {
      const existingDay = acc.find(d => d.date === stat.date);
      if (existingDay) {
        existingDay.views += stat.views;
        existingDay.clicks += stat.clicks;
        existingDay.conversions += stat.conversions;
        existingDay.revenue += stat.revenue;
      } else {
        acc.push({ ...stat });
      }
    });
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
      name: 'Conversions',
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
        title="Traffic Dashboard" 
        subtitle="AI-powered traffic generation and revenue optimization platform"
      />
      
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Revenue Generator</h2>
            <p className="text-sm text-gray-600">Transform any product URL into a traffic-generating campaign</p>
          </div>
          <Link
            to="/new-link"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Generate Traffic
          </Link>
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
                <span className="text-sm text-gray-500 ml-2">from last week</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Performance</h3>
                <p className="text-sm text-gray-600">Daily revenue and conversion tracking</p>
              </div>
            </div>
            <AnalyticsChart data={chartData} type="area" />
          </div>
        )}

        {/* Recent Campaigns */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
              <p className="text-sm text-gray-600">Your latest traffic generation campaigns</p>
            </div>
            <Link
              to="/links"
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View all campaigns
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : recentLinks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentLinks.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Generating Traffic</h3>
              <p className="text-gray-600 mb-4">Create your first AI-powered traffic campaign and start driving revenue</p>
              <Link
                to="/new-link"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                <Zap className="w-5 h-5 mr-2" />
                Generate Your First Campaign
              </Link>
            </div>
          )}
        </div>

        {/* Platform Performance Summary */}
        {links.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Platform Performance</h3>
                <p className="text-sm text-gray-600">Revenue generated across all platforms</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Reddit', 'Pinterest', 'Medium', 'LinkedIn'].map((platform) => {
                const platformRevenue = links.reduce((sum, link) => {
                  const platformData = link.analytics.platformBreakdown[platform.toLowerCase()];
                  return sum + (platformData?.revenue || 0);
                }, 0);
                
                return (
                  <div key={platform} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ${platformRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">{platform}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};