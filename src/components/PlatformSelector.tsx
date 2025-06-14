import React from 'react';
import { MessageCircle, FileText, Camera, Twitter, Linkedin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Platform } from '../types';

interface PlatformSelectorProps {
  platforms: Platform[];
  onTogglePlatform: (platformName: string) => void;
}

const platformConfig = {
  reddit: {
    name: 'Reddit',
    icon: MessageCircle,
    color: 'bg-orange-500',
    description: 'Share to relevant subreddits',
  },
  medium: {
    name: 'Medium',
    icon: FileText,
    color: 'bg-gray-800',
    description: 'Publish as an article',
  },
  pinterest: {
    name: 'Pinterest',
    icon: Camera,
    color: 'bg-red-500',
    description: 'Pin to relevant boards',
  },
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-blue-500',
    description: 'Tweet with media',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    description: 'Share professionally',
  },
};

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platforms,
  onTogglePlatform,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Platforms
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const config = platformConfig[platform.name];
          const Icon = config.icon;
          
          return (
            <motion.div
              key={platform.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${platform.enabled
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => onTogglePlatform(platform.name)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {config.name}
                    </h4>
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                      ${platform.enabled
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                      }
                    `}>
                      {platform.enabled && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {config.description}
                  </p>
                  
                  {platform.posted && platform.postUrl && (
                    <div className="mt-2">
                      <a
                        href={platform.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-green-600 hover:text-green-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        View Post
                      </a>
                    </div>
                  )}
                  
                  {platform.metrics && (
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{platform.metrics.views} views</span>
                      <span>{platform.metrics.clicks} clicks</span>
                      <span>{platform.metrics.engagement}% engagement</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};