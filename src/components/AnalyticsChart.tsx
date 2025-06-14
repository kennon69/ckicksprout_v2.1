import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DailyStats } from '../types';

interface AnalyticsChartProps {
  data: DailyStats[];
  type?: 'line' | 'area';
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  data, 
  type = 'area' 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">
            {formatDate(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="#27AE60" 
            strokeWidth={2}
            name="Views"
            dot={{ fill: '#27AE60', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#27AE60' }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#3498DB" 
            strokeWidth={2}
            name="Clicks"
            dot={{ fill: '#3498DB', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#3498DB' }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          stroke="#9ca3af"
          fontSize={12}
        />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="views"
          stackId="1"
          stroke="#27AE60"
          fill="#27AE60"
          fillOpacity={0.6}
          name="Views"
        />
        <Area
          type="monotone"
          dataKey="clicks"
          stackId="1"
          stroke="#3498DB"
          fill="#3498DB"
          fillOpacity={0.6}
          name="Clicks"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};