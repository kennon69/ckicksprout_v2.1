import React from 'react';
import { Check, Image, Video, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { MediaItem } from '../types';

interface MediaGalleryProps {
  media: MediaItem[];
  onToggleSelection: (id: string) => void;
  onDownload?: (item: MediaItem) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ 
  media, 
  onToggleSelection, 
  onDownload 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div 
            className={`
              relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200
              ${item.selected 
                ? 'ring-2 ring-green-500 shadow-lg' 
                : 'hover:shadow-md'
              }
            `}
            onClick={() => onToggleSelection(item.id)}
          >
            <div className="aspect-square bg-gray-100">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Selection indicator */}
            <div className={`
              absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
              ${item.selected 
                ? 'bg-green-500 text-white' 
                : 'bg-white bg-opacity-80 text-gray-400'
              }
            `}>
              {item.selected ? (
                <Check className="w-4 h-4" />
              ) : (
                <div className="w-3 h-3 border-2 border-current rounded-full" />
              )}
            </div>
            
            {/* Media type indicator */}
            <div className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded">
              {item.type === 'image' ? (
                <Image className="w-3 h-3 text-white" />
              ) : (
                <Video className="w-3 h-3 text-white" />
              )}
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {onDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(item);
                    }}
                    className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Download className="w-4 h-4 text-gray-700" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Dimensions */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {item.width} × {item.height}
          </div>
        </motion.div>
      ))}
    </div>
  );
};