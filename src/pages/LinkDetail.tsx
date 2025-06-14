import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Share, ExternalLink, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { MediaGallery } from '../components/MediaGallery';
import { PlatformSelector } from '../components/PlatformSelector';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { RevenueAnalytics } from '../components/RevenueAnalytics';
import { useLinks } from '../hooks/useLinks';
import { format } from 'date-fns';

export const LinkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { links, updateLink } = useLinks();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'content' | 'media' | 'platforms' | 'analytics'>('overview');
  
  const link = links.find(l => l.id === id);

  if (!link) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Link not found</h2>
          <p className="text-gray-600 mb-4">The link you're looking for doesn't exist.</p>
          <Link
            to="/links"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Links
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleMediaSelection = (mediaId: string) => {
    const updatedMedia = link.media.map(item =>
      item.id === mediaId ? { ...item, selected: !item.selected } : item
    );
    updateLink(link.id, { media: updatedMedia });
  };

  const handleTogglePlatform = (platformName: string) => {
    const updatedPlatforms = link.platforms.map(platform =>
      platform.name === platformName ? { ...platform, enabled: !platform.enabled } : platform
    );
    updateLink(link.id, { platforms: updatedPlatforms });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'content', label: 'AI Content', icon: Share },
    { id: 'media', label: 'Media', icon: ExternalLink },
    { id: 'platforms', label: 'Platforms', icon: Calendar },
    { id: 'analytics', label: 'Revenue', icon: DollarSign },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title={link.title}
        subtitle={`Campaign created ${format(link.createdAt, 'MMM d, yyyy')} • $${link.analytics.totalRevenue.toLocaleString()} revenue generated`}
      />
      
      <div className="p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/links"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Links
            </Link>
            
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTab === tab.id
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <Link
            to={`/links/${link.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Campaign
          </Link>
        </div>

        {/* Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Product Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original URL
                      </label>
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 break-all"
                      >
                        {link.originalUrl}
                      </a>
                    </div>
                    
                    {link.scrapedData.price && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                        </label>
                        <p className="text-2xl font-bold text-green-600">{link.scrapedData.price}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Features
                      </label>
                      <ul className="list-disc list-inside space-y-1">
                        {link.scrapedData.features.map((feature, index) => (
                          <li key={index} className="text-gray-600">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Generated Hashtags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {link.hashtags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                {link.analytics.dailyStats.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Performance</h3>
                    <AnalyticsChart data={link.analytics.dailyStats} />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Revenue Stats */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${link.analytics.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Conversions</span>
                      <span className="font-semibold text-gray-900">
                        {link.analytics.totalConversions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-semibold text-gray-900">
                        {link.analytics.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avg. Order Value</span>
                      <span className="font-semibold text-gray-900">
                        ${(link.analytics.totalRevenue / link.analytics.totalConversions || 0).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Platform Status */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Status</h3>
                  <div className="space-y-3">
                    {link.platforms.map((platform) => (
                      <div key={platform.name} className="flex items-center justify-between">
                        <span className="text-gray-600 capitalize">{platform.name}</span>
                        <div className="flex items-center space-x-2">
                          {platform.posted ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              Published
                            </span>
                          ) : platform.enabled ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              Ready
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              Disabled
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                {link.thumbnail && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                    <img
                      src={link.thumbnail}
                      alt=""
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'content' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Content</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Blog Article ({link.generatedContent.blogArticle.wordCount} words)</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-lg mb-3">{link.generatedContent.blogArticle.title}</h5>
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                      {link.generatedContent.blogArticle.content}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pinterest Pin</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">{link.generatedContent.pinterestPin.title}</h5>
                    <p className="text-gray-700">{link.generatedContent.pinterestPin.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Reddit Post</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">{link.generatedContent.redditPost.title}</h5>
                    <p className="text-gray-700 whitespace-pre-line">{link.generatedContent.redditPost.content}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {link.generatedContent.redditPost.suggestedSubreddits.map((subreddit, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          {subreddit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'media' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Media Gallery</h3>
                  <p className="text-sm text-gray-600">
                    {link.media.filter(m => m.selected).length} of {link.media.length} items selected
                  </p>
                </div>
              </div>
              <MediaGallery
                media={link.media}
                onToggleSelection={handleToggleMediaSelection}
              />
            </div>
          )}

          {selectedTab === 'platforms' && (
            <PlatformSelector
              platforms={link.platforms}
              onTogglePlatform={handleTogglePlatform}
            />
          )}

          {selectedTab === 'analytics' && (
            <RevenueAnalytics
              analytics={link.analytics}
              linkTitle={link.title}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};