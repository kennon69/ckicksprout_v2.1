import React, { useState, useRef, useEffect } from 'react';
import { Download, RotateCw, Palette, Type, Move } from 'lucide-react';
import { motion } from 'framer-motion';
import { WatermarkSettings } from '../types';

interface WatermarkEditorProps {
  imageUrl: string;
  onSave: (watermarkedImageUrl: string) => void;
}

export const WatermarkEditor: React.FC<WatermarkEditorProps> = ({ 
  imageUrl, 
  onSave 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<WatermarkSettings>({
    enabled: true,
    opacity: 0.8,
    size: 24,
    position: 'bottom-right',
    text: 'kennonkart.com',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (settings.enabled) {
      renderWatermark();
    }
  }, [settings, imageUrl]);

  const renderWatermark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      if (settings.enabled) {
        // Configure watermark text
        ctx.globalAlpha = settings.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.font = `${settings.size}px Inter, Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Calculate position
        const padding = 20;
        let x, y;
        
        switch (settings.position) {
          case 'top-left':
            x = padding + ctx.measureText(settings.text).width / 2;
            y = padding + settings.size / 2;
            break;
          case 'top-right':
            x = canvas.width - padding - ctx.measureText(settings.text).width / 2;
            y = padding + settings.size / 2;
            break;
          case 'bottom-left':
            x = padding + ctx.measureText(settings.text).width / 2;
            y = canvas.height - padding - settings.size / 2;
            break;
          case 'bottom-right':
          default:
            x = canvas.width - padding - ctx.measureText(settings.text).width / 2;
            y = canvas.height - padding - settings.size / 2;
            break;
        }
        
        // Draw watermark with stroke for better visibility
        ctx.strokeText(settings.text, x, y);
        ctx.fillText(settings.text, x, y);
        
        ctx.globalAlpha = 1;
      }
    };
    
    img.src = imageUrl;
  };

  const handleSave = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const canvas = canvasRef.current;
    if (canvas) {
      const watermarkedImageUrl = canvas.toDataURL('image/png');
      onSave(watermarkedImageUrl);
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Watermark Editor</h3>
        <div className="flex items-center space-x-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings(prev => ({ ...prev, enabled: e.target.checked }))}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Watermark</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canvas Preview */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
          </div>
          
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isProcessing ? (
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isProcessing ? 'Processing...' : 'Save Watermarked Image'}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Watermark Text */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Type className="w-4 h-4 mr-2" />
              Watermark Text
            </label>
            <input
              type="text"
              value={settings.text}
              onChange={(e) => setSettings(prev => ({ ...prev, text: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter watermark text"
            />
          </div>

          {/* Position */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Move className="w-4 h-4 mr-2" />
              Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'top-left', label: 'Top Left' },
                { value: 'top-right', label: 'Top Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'bottom-right', label: 'Bottom Right' },
              ].map((position) => (
                <button
                  key={position.value}
                  onClick={() => setSettings(prev => ({ ...prev, position: position.value as any }))}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                    settings.position === position.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {position.label}
                </button>
              ))}
            </div>
          </div>

          {/* Opacity */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4 mr-2" />
              Opacity: {Math.round(settings.opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.opacity}
              onChange={(e) => setSettings(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Size */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Type className="w-4 h-4 mr-2" />
              Size: {settings.size}px
            </label>
            <input
              type="range"
              min="12"
              max="48"
              step="2"
              value={settings.size}
              onChange={(e) => setSettings(prev => ({ ...prev, size: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};