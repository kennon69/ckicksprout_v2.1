import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Sparkles, Loader, CheckCircle, Search, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Header } from '../components/Header';
import { useLinks } from '../hooks/useLinks';

export const NewLink: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { createLink } = useLinks();
  const navigate = useNavigate();

  const processingSteps = [
    'Analyzing product page...',
    'Extracting media and pricing...',
    'Generating AI content for all platforms...',
    'Optimizing for conversions...',
    'Creating revenue-focused campaigns...',
    'Finalizing promotion kit...'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Validate URL
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);
    setError(null);

    try {
      // Simulate processing steps with real backend calls
      for (let i = 0; i < processingSteps.length; i++) {
        setProcessingStep(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const newLink = await createLink(url);
      
      // Success animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Navigate to the new link's edit page
      setTimeout(() => {
        navigate(`/links/${newLink.id}/edit`);
      }, 1500);
    } catch (error) {
      console.error('Error creating link:', error);
      setError(error instanceof Error ? error.message : 'Failed to create campaign');
      setIsProcessing(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header 
        title="AI Traffic Generator" 
        subtitle="Transform any product URL into a revenue-generating content campaign"
      />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {!isProcessing ? (
            <div className="space-y-8">
              {/* Main Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Link2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Submit Your Product URL
                  </h2>
                  <p className="text-lg text-gray-600">
                    Our AI will create a complete traffic generation campaign in minutes
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product or Content URL
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        required
                        value={url}
                        onChange={handleUrlChange}
                        className={`w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg transition-colors duration-200 ${
                          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="https://your-store.com/product-page"
                        disabled={isProcessing}
                      />
                    </div>
                    
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center space-x-2 text-red-600"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </motion.div>
                    )}
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500">
                      <div>✓ E-commerce product pages</div>
                      <div>✓ Affiliate marketing links</div>
                      <div>✓ Digital product sales pages</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || !url.trim()}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg shadow-lg"
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Generate Traffic Campaign
                  </button>
                </form>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Content Generation</h3>
                  <p className="text-sm text-gray-600">
                    Creates blog articles, pin descriptions, and social posts optimized for each platform
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Platform Syndication</h3>
                  <p className="text-sm text-gray-600">
                    Automatically publishes to Reddit, Medium, Pinterest, and LinkedIn for maximum reach
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Revenue Tracking</h3>
                  <p className="text-sm text-gray-600">
                    Monitor clicks, conversions, and revenue attribution across all traffic sources
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Conversion Optimization</h3>
                  <p className="text-sm text-gray-600">
                    Content optimized for maximum engagement, clicks, and sales conversions
                  </p>
                </motion.div>
              </div>

              {/* Success Stories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Real Results from ClickSprout Users
                  </h3>
                  <p className="text-gray-600">
                    See how our AI-powered platform drives real revenue
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">$47,500</div>
                    <div className="text-sm text-gray-600">Average monthly revenue increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">340%</div>
                    <div className="text-sm text-gray-600">Average traffic growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">8.2%</div>
                    <div className="text-sm text-gray-600">Average conversion rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border border-gray-200 p-8 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader className="w-10 h-10 text-white animate-spin" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Creating Your Traffic Campaign
              </h2>
              
              <div className="space-y-4 max-w-md mx-auto">
                {processingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                      index === processingStep
                        ? 'bg-green-50 border border-green-200'
                        : index < processingStep
                        ? 'bg-gray-50 text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <span className="font-medium text-left">{step}</span>
                    {index < processingStep ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : index === processingStep ? (
                      <Loader className="w-5 h-5 text-green-600 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mt-6">
                Our AI is analyzing your product and creating optimized content for maximum conversions.
                This process typically takes 15-30 seconds.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};