export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  connectedPlatforms: ConnectedPlatform[];
}

export interface ConnectedPlatform {
  platform: 'medium' | 'pinterest' | 'reddit' | 'linkedin';
  connected: boolean;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  connectedAt?: Date;
}

export interface Link {
  id: string;
  userId: string;
  originalUrl: string;
  title: string;
  description: string;
  hashtags: string[];
  thumbnail?: string;
  media: MediaItem[];
  scrapedData: ScrapedData;
  generatedContent: GeneratedContent;
  status: 'draft' | 'processing' | 'ready' | 'published';
  platforms: Platform[];
  analytics: LinkAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScrapedData {
  title: string;
  metaDescription: string;
  price?: string;
  features: string[];
  productDetails: string;
  images: string[];
  videos: string[];
}

export interface GeneratedContent {
  blogArticle: {
    title: string;
    content: string;
    wordCount: number;
  };
  pinterestPin: {
    title: string;
    description: string;
  };
  redditPost: {
    title: string;
    content: string;
    suggestedSubreddits: string[];
  };
  linkedinPost: {
    title: string;
    content: string;
    tone: 'professional' | 'casual' | 'engaging';
  };
  hashtags: string[];
  tone: 'funny' | 'professional' | 'emotional' | 'viral';
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  width: number;
  height: number;
  selected: boolean;
  watermarked?: boolean;
  optimizedVersions?: {
    pinterest?: string; // 1000x1500
    medium?: string; // 1280x720
    reddit?: string; // thumbnail
    linkedin?: string; // 1200x627
  };
}

export interface Platform {
  name: 'reddit' | 'medium' | 'pinterest' | 'twitter' | 'linkedin';
  enabled: boolean;
  posted: boolean;
  postUrl?: string;
  postId?: string;
  scheduledAt?: Date;
  metrics?: {
    views: number;
    clicks: number;
    engagement: number;
    conversions: number;
    revenue?: number;
  };
  content?: {
    title: string;
    description: string;
    image?: string;
  };
}

export interface LinkAnalytics {
  totalViews: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  ctr: number;
  conversionRate: number;
  platformBreakdown: Record<string, PlatformMetrics>;
  dailyStats: DailyStats[];
  trafficSources: TrafficSource[];
}

export interface PlatformMetrics {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  posts: number;
}

export interface TrafficSource {
  source: string;
  clicks: number;
  conversions: number;
  revenue: number;
  percentage: number;
}

export interface DailyStats {
  date: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface WatermarkSettings {
  enabled: boolean;
  opacity: number;
  size: number;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  text: string;
}

export interface ContentTone {
  value: 'funny' | 'professional' | 'emotional' | 'viral';
  label: string;
  description: string;
}

export interface PlatformConfig {
  name: string;
  icon: any;
  color: string;
  description: string;
  contentType: 'article' | 'pin' | 'post' | 'update';
  imageSpecs: {
    width: number;
    height: number;
    aspectRatio: string;
  };
}

export interface AutoPostSettings {
  enabled: boolean;
  platforms: string[];
  scheduleDelay: number; // minutes
  includeAffiliate: boolean;
  customCTA: string;
}