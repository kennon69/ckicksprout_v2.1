import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Wand2, Hash, Type, FileText, Send, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { MediaGallery } from '../components/MediaGallery';
import { WatermarkEditor } from '../components/WatermarkEditor';
import { ContentGenerator } from '../components/ContentGenerator';
import { PlatformPublisher } from '../components/PlatformPublisher';
import { useLinks } from '../hooks/useLinks';

export const LinkEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { links, updateLink } = useLinks();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'watermark' | 'publish'>('content');
  const [showWatermarkEditor, setShowWatermarkEditor] = useState(false);
  const [selectedImageForWatermark, setSelectedImageForWatermark] = useState<string>('');
  
  const link = links.find(l => l.id === id);
  const [formData, setFormData] = useState({
    title: link?.title || '',
    description: link?.description || '',
    hashtags: link?.hashtags?.join(', ') || '',
  });

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

  const handleSave = () => {
    updateLink(link.id, {
      title: formData.title,
      description: formData.description,
      hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
    navigate(`/links/${link.id}`);
  };

  const handleToggleMediaSelection = (mediaId: string) => {
    const updatedMedia = link.media.map(item =>
      item.id === mediaId ? { ...item, selected: !item.selected } : item
    );
    updateLink(link.id, { media: updatedMedia });
  };

  const handleWatermarkImage = (imageUrl: string) => {
    setSelectedImageForWatermark(imageUrl);
    setShowWatermarkEditor(true);
  };

  const handleSaveWatermarkedImage = (watermarkedImageUrl: string) => {
    console.log('Watermarked image saved:', watermarkedImageUrl);
    setShowWatermarkEditor(false);
    setSelectedImageForWatermark('');
  };

  const handleContentUpdate = (content: any) => {
    updateLink(link.id, { generatedContent: content });
  };

  const handlePublish = async (platforms: string[]) => {
    console.log('Publishing to platforms:', platforms);
  };

  const handleSchedule = async (platforms: string[], scheduleTime: Date) => {
    console.log('Scheduling posts for:', platforms, 'at:', scheduleTime);
  };

  const tabs = [
    { id: 'content', label: 'AI Content', icon: FileText, description: 'Generated content for all platforms' },
    { id: 'media', label: 'Media', icon: Type, description: 'Select and optimize images' },
    { id: 'watermark', label: 'Watermark', icon: Wand2, description: 'Brand your images' },
    { id: 'publish', label: 'Publish', icon: Send, description: 'Launch your campaign' },
  ];

  const potentialRevenue = link.platforms
    .filter(p => p.enabled && !p.posted)
    .reduce((total, platform) => {
      // Estimate potential revenue based on platform
      const estimates = { reddit: 5000, medium: 3000, pinterest: 8000, linkedin: 2000 };
      return total + (estimates[platform.name] || 0);
    }, 0);

  return (
    <div className="flex-1 overflow-y-auto">
      <Header 
        title="Traffic Campaign Editor" 
        subtitle="Customize and launch your AI-generated promotion campaign"
      />
      
      <div className="p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/links/${link.id}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Link
            </Link>
            
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div>{tab.label}</div>
                    <div className="text-xs text-gray-500">{tab.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {potentialRevenue > 0 && (
              <div className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  ${(potentialRevenue * 0.15).toFixed(0)} potential revenue
                </span>
              </div>
            )}
            
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'content' && (
            <ContentGenerator
              content={link.generatedContent}
              linkId={link.id}
              onContentUpdate={handleContentUpdate}
            />
          )}

          {activeTab === 'media' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Media Optimization</h3>
                  <p className="text-sm text-gray-600">
                    Select and optimize images for maximum engagement across platforms
                  </p>
                </div>
              </div>
              <MediaGallery
                media={link.media}
                onToggleSelection={handleToggleMediaSelection}
                onDownload={(item) => handleWatermarkImage(item.url)}
              />
            </div>
          )}

          {activeTab === 'watermark' && (
            <div className="space-y-6">
              {!showWatermarkEditor ? (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wand2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Brand Your Images
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add watermarks to protect your content and build brand recognition
                    </p>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Select Images to Watermark
                    </button>
                  </div>
                </div>
              ) : (
                <WatermarkEditor
                  imageUrl={selectedImageForWatermark}
                  onSave={handleSaveWatermarkedImage}
                />
              )}
            </div>
          )}

          {activeTab === 'publish' && (
            <PlatformPublisher
              platforms={link.platforms}
              linkId={link.id}
              onPublish={handlePublish}
              onSchedule={handleSchedule}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};