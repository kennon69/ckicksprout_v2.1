import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  Link2, 
  BarChart3, 
  Settings, 
  Zap,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'New Campaign', href: '/new-link', icon: Plus },
  { name: 'My Campaigns', href: '/links', icon: Link2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, isPrivateMode } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="text-xl font-bold text-gray-900">ClickSprout</span>
            {isPrivateMode && (
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Private Mode</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className={`
                mr-3 h-5 w-5 transition-colors duration-200
                ${isActive ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 w-1 h-6 bg-green-500 rounded-l-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {isPrivateMode ? 'Private Access' : user?.plan || 'Admin'}
            </p>
          </div>
        </div>
        
        {isPrivateMode && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">
                Secure Admin Access
              </span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Private mode active - No public access
            </p>
          </div>
        )}
      </div>
    </div>
  );
};