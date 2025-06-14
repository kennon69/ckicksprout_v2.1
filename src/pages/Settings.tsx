import React, { useState } from 'react';
import { Shield, Key, Globe, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { user, isPrivateMode } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'platforms' | 'api'>('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'platforms', label: 'Platforms', icon: Zap },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  const connectedPlatforms = [
    { name: 'Medium', connected: true, status: 'Active', lastSync: '2 hours ago' },
    { name: 'Pinterest', connected: true, status: 'Active', lastSync: '1 hour ago' },
    { name: 'Reddit', connected: true, status: 'Active', lastSync: '30 minutes ago' },
    { name: 'LinkedIn', connected: false, status: 'Disconnected', lastSync: 'Never' },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title="Settings" 
        subtitle={isPrivateMode ? "Private mode configuration and platform management" : "Account and platform management"}
      />
      
      <div className="p-6 space-y-6">
        {/* Private Mode Banner */}
        {isPrivateMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Private Mode Active</h3>
                <p className="text-sm text-green-700">
                  ClickSprout is running in private mode. Only admin access is allowed.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
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
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || 'Kennon'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    readOnly={isPrivateMode}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || 'kennon@kennonkart.com'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    readOnly={isPrivateMode}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Watermark Text
                  </label>
                  <input
                    type="text"
                    defaultValue="kennonkart.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                {isPrivateMode && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-900">Private Mode Security</h4>
                        <p className="text-sm text-green-700">
                          Access is restricted to admin users only. No public registration is available.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Access Control</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">Admin Access</span>
                        <p className="text-sm text-gray-600">Full platform access and management</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">API Protection</span>
                        <p className="text-sm text-gray-600">Secure token-based API access</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Connected Platforms</h3>
              
              <div className="space-y-4">
                {connectedPlatforms.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${platform.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{platform.name}</h4>
                        <p className="text-sm text-gray-600">
                          {platform.status} • Last sync: {platform.lastSync}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        platform.connected
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {platform.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">API Configuration</h3>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium text-yellow-900">API Keys Required</h4>
                      <p className="text-sm text-yellow-700">
                        Configure your platform API keys to enable automated posting and analytics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OpenAI API Key
                    </label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medium Integration Token
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Medium token"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pinterest API Key
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Pinterest API key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reddit Client ID
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Reddit client ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Save API Configuration
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};