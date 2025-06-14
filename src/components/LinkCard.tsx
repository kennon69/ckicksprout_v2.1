import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLink, Eye, MousePointer, TrendingUp, Clock, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '../types';
import { format } from 'date-fns';

interface LinkCardProps {
  link: Link;
}

const statusConfig = {
  draft: { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100', label: 'Draft' },
  processing: { icon: Loader, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Processing' },
  ready: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Ready' },
  published: { icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100', label: 'Published' },
};

export const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  const StatusIcon = statusConfig[link.status].icon;
  const publishedPlatforms = link.platforms.filter(p => p.posted).length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[link.status].bg} ${statusConfig[link.status].color}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig[link.status].label}
            </div>
            {publishedPlatforms > 0 && (
              <div className="text-xs text-gray-500">
                Published to {publishedPlatforms} platform{publishedPlatforms > 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {link.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {link.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {link.analytics.totalViews.toLocaleString()} views
            </div>
            <div className="flex items-center">
              <MousePointer className="w-4 h-4 mr-1" />
              {link.analytics.totalClicks.toLocaleString()} clicks
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {link.analytics.ctr.toFixed(1)}% CTR
            </div>
          </div>
        </div>
        
        {link.thumbnail && (
          <img
            src={link.thumbnail}
            alt=""
            className="w-20 h-20 object-cover rounded-lg ml-4"
          />
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View original
          </a>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">
            {format(link.createdAt, 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <RouterLink
            to={`/links/${link.id}`}
            className="px-3 py-1 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View Details
          </RouterLink>
          <RouterLink
            to={`/links/${link.id}/edit`}
            className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            Edit
          </RouterLink>
        </div>
      </div>
    </motion.div>
  );
};