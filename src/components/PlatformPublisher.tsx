import React, { useState } from 'react';
import { Send, Clock, CheckCircle, AlertCircle, ExternalLink, DollarSign, TrendingUp, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Platform, PlatformConfig } from '../types';
import { useLinks } from '../hooks/useLinks';

interface PlatformPublisherProps {
  platforms: Platform[];
  linkId: string;
  onPublish: (platforms: string[]) => void;
  onSchedule: (platforms: string[], scheduleTime: Date) => void;
}

const platformConfigs: Record<string, PlatformConfig> = {
  reddit: {
    name: 'Reddit',
    icon: '🔴',
    color: 'bg-orange-500',
    description: 'High-engagement communities with viral potential',
    contentType: 'post',
    imageSpecs: { width: 1200, height: 630, aspectRatio: '1.9:1' },
  },
  medium: {
    name: 'Medium',
    icon: '📝',
    color: 'bg-gray-800',
    description: 'Professional articles for thought leadership',
    contentType: 'article',
    imageSpecs: { width: 1280, height: 720, aspectRatio: '16:9' },
  },
  pinterest: {
    name: 'Pinterest',
    icon: '📌',
    color: 'bg-red-500',
    description: 'Visual discovery with high conversion rates',
    contentType: 'pin',
    imageSpecs: { width: 1000, height: 1500, aspectRatio: '2:3' },
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700',
    description: 'Professional network for B2B reach',
    contentType: 'update',
    imageSpecs: { width: 1200, height: 627, aspectRatio: '1.91:1' },
  },
};

export const PlatformPublisher: React.FC<PlatformPublisherProps> = ({
  platforms,
  linkId,
  onPublish,
  onSchedule,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    platforms.filter(p => p.enabled && !p.posted).map(p => p.name)
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string[]>([]);
  const { publishToPlatforms } = useLinks();

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) return;
    
    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccess([]);
    
    try {
      if (scheduleMode && scheduleTime) {
        await onSchedule(selectedPlatforms, new Date(scheduleTime));
      } else {
        await publishToPlatforms(linkId, selectedPlatforms);
        setPublishSuccess(selectedPlatforms);
        onPublish(selectedPlatforms);
      }
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : 'Failed to publish content');
    } finally {
      setIsPublishing(false);
    }
  };

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const getStatusIcon = (platform: Platform) => {
    if (platform.posted) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (platform.scheduledAt) return <Clock className="w-5 h-5 text-blue-500" />;
    if (!platform.enabled) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    return null;
  };

  const getStatusText = (platform: Platform) => {
    if (platform.posted) return 'Published';
    if (platform.scheduledAt) return 'Scheduled';
    if (!platform.enabled) return 'Disabled';
    return 'Ready';
  };

  const totalPotentialRevenue = selectedPlatforms.reduce((total, platformName) => {
    const platform = platforms.find(p => p.name === platformName);
    return total + (platform?.metrics?.revenue || 0);
  }, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Platform Publisher</h3>
          <p className="text-sm text-gray-600">
            Automate content syndication for maximum traffic and revenue
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={scheduleMode}
              onChange={(e) => setScheduleMode(e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">Schedule</span>
          </label>
          
          {scheduleMode && (
            <input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          )}
        </div>
      </div>

      {/* Error/Success Messages */}
      {publishError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700">{publishError}</span>
        </motion.div>
      )}

      {publishSuccess.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">
            Successfully published to {publishSuccess.join(', ')}!
          </span>
        </motion.div>
      )}

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {platforms.map((platform) => {
          const config = platformConfigs[platform.name];
          const isSelected = selectedPlatforms.includes(platform.name);
          const canSelect = platform.enabled && !platform.posted;
          
          return (
            <motion.div
              key={platform.name}
              whileHover={{ scale: canSelect ? 1.02 : 1 }}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${isSelected && canSelect
                  ? 'border-green-500 bg-green-50'
                  : canSelect
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                }
              `}
              onClick={() => canSelect && togglePlatform(platform.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.color} text-white text-lg`}>
                    {config.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{config.name}</h4>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(platform)}
                  <span className="text-xs text-gray-500">{getStatusText(platform)}</span>
                </div>
              </div>
              
              {/* Platform Metrics */}
              {platform.metrics && (
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {platform.metrics.views.toLocaleString()}
                    </div>
                    <div className="text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {platform.metrics.clicks.toLocaleString()}
                    </div>
                    <div className="text-gray-500">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">
                      ${platform.metrics.revenue?.toLocaleString() || 0}
                    </div>
                    <div className="text-gray-500">Revenue</div>
                  </div>
                </div>
              )}
              
              {/* Post Link */}
              {platform.posted && platform.postUrl && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <a
                    href={platform.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Post
                  </a>
                </div>
              )}
              
              {/* Image Specs */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Optimal: {config.imageSpecs.width}×{config.imageSpecs.height} ({config.imageSpecs.aspectRatio})
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Projection */}
      {selectedPlatforms.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Revenue Projection</h4>
                <p className="text-sm text-gray-600">
                  Based on historical performance data
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                ${(selectedPlatforms.length * 1500).toFixed(0)}
              </div>
              <div className="text-sm text-gray-500">Estimated 30-day revenue</div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
        </div>
        
        <button
          onClick={handlePublish}
          disabled={selectedPlatforms.length === 0 || isPublishing}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {isPublishing ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              {scheduleMode ? <Clock className="w-5 h-5 mr-2" /> : <Send className="w-5 h-5 mr-2" />}
              {scheduleMode ? 'Schedule Posts' : 'Publish Now'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};