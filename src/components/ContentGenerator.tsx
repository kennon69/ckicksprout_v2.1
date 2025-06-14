import React, { useState } from 'react';
import { Wand2, Copy, RefreshCw, Edit3, Eye, FileText, MessageSquare, Linkedin, Hash, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { GeneratedContent, ContentTone } from '../types';
import { useLinks } from '../hooks/useLinks';

interface ContentGeneratorProps {
  content: GeneratedContent;
  linkId: string;
  onContentUpdate: (content: GeneratedContent) => void;
}

const contentTones: ContentTone[] = [
  { value: 'professional', label: 'Professional', description: 'Formal, authoritative, business-focused' },
  { value: 'funny', label: 'Funny', description: 'Humorous, entertaining, viral-worthy' },
  { value: 'emotional', label: 'Emotional', description: 'Heartfelt, inspiring, personal connection' },
  { value: 'viral', label: 'Viral', description: 'Attention-grabbing, shareable, trending' },
];

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  content,
  linkId,
  onContentUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'blog' | 'pinterest' | 'reddit' | 'linkedin'>('blog');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { regenerateContent } = useLinks();

  const handleRegenerate = async (tone: ContentTone['value']) => {
    setIsRegenerating(true);
    setError(null);
    
    try {
      const newContent = await regenerateContent(linkId, tone);
      onContentUpdate(newContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate content');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const tabs = [
    { id: 'blog', label: 'Blog Article', icon: FileText, platform: 'Medium/LinkedIn' },
    { id: 'pinterest', label: 'Pinterest Pin', icon: Hash, platform: 'Pinterest' },
    { id: 'reddit', label: 'Reddit Post', icon: MessageSquare, platform: 'Reddit' },
    { id: 'linkedin', label: 'LinkedIn Post', icon: Linkedin, platform: 'LinkedIn' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Generated Content</h3>
          <p className="text-sm text-gray-600">
            Revenue-optimized content for maximum engagement and conversions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={content.tone}
            onChange={(e) => handleRegenerate(e.target.value as ContentTone['value'])}
            disabled={isRegenerating}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          >
            {contentTones.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label} - {tone.description}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => handleRegenerate(content.tone)}
            disabled={isRegenerating}
            className="inline-flex items-center px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 transition-colors duration-200"
          >
            {isRegenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            {isRegenerating ? 'Regenerating...' : 'Regenerate All'}
          </button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
        </motion.div>
      )}

      {/* Content Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Blog Article for Medium</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{content.blogArticle.wordCount} words</span>
                <button
                  onClick={() => handleCopy(content.blogArticle.content, 'blog')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 relative"
                >
                  {copySuccess === 'blog' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-lg text-gray-900 mb-3">
                {content.blogArticle.title}
              </h5>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                {content.blogArticle.content}
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Eye className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">SEO Optimization</span>
              </div>
              <p className="text-sm text-green-700">
                This article is optimized for search engines with strategic keyword placement, 
                engaging headlines, and conversion-focused CTAs to maximize organic traffic and sales.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'pinterest' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Pinterest Pin Content</h4>
              <button
                onClick={() => handleCopy(`${content.pinterestPin.title}\n\n${content.pinterestPin.description}`, 'pinterest')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {copySuccess === 'pinterest' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pin Title</label>
                <div className="text-gray-900 font-medium">{content.pinterestPin.title}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pin Description</label>
                <div className="text-gray-700">{content.pinterestPin.description}</div>
              </div>
            </div>
            
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Hash className="w-4 h-4 text-pink-600 mr-2" />
                <span className="text-sm font-medium text-pink-800">Pinterest Strategy</span>
              </div>
              <p className="text-sm text-pink-700">
                Optimized for Pinterest's algorithm with emoji usage, trending keywords, 
                and compelling CTAs to drive maximum clicks and saves.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reddit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Reddit Post Content</h4>
              <button
                onClick={() => handleCopy(`${content.redditPost.title}\n\n${content.redditPost.content}`, 'reddit')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {copySuccess === 'reddit' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <div className="text-gray-900 font-medium">{content.redditPost.title}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Content</label>
                <div className="text-gray-700 whitespace-pre-line">{content.redditPost.content}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Subreddits</label>
                <div className="flex flex-wrap gap-2">
                  {content.redditPost.suggestedSubreddits.map((subreddit, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {subreddit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MessageSquare className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-orange-800">Reddit Strategy</span>
              </div>
              <p className="text-sm text-orange-700">
                Crafted to feel authentic and valuable to Reddit communities while subtly 
                promoting your product. Follows Reddit's culture and etiquette for maximum engagement.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'linkedin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">LinkedIn Post Content</h4>
              <button
                onClick={() => handleCopy(`${content.linkedinPost.title}\n\n${content.linkedinPost.content}`, 'linkedin')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {copySuccess === 'linkedin' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <div className="text-gray-900 font-medium">{content.linkedinPost.title}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Content</label>
                <div className="text-gray-700 whitespace-pre-line">{content.linkedinPost.content}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                  {content.linkedinPost.tone}
                </span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Linkedin className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">LinkedIn Strategy</span>
              </div>
              <p className="text-sm text-blue-700">
                Professional tone optimized for LinkedIn's business audience. Includes industry insights 
                and thought leadership elements to establish authority and drive engagement.
              </p>
            </div>
          </div>
        )}

        {/* Hashtags Section */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Generated Hashtags</h4>
            <button
              onClick={() => handleCopy(content.hashtags.join(' '), 'hashtags')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {copySuccess === 'hashtags' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};