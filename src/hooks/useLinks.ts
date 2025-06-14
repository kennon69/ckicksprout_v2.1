import { useState, useEffect } from 'react';
import { Link, MediaItem, Platform, ScrapedData, GeneratedContent } from '../types';
import { apiService } from '../services/api';

// Enhanced mock data for traffic generation platform
const mockLinks: Link[] = [
  {
    id: '1',
    userId: 'kennon-admin', // Updated for private mode
    originalUrl: 'https://kennonkart.com/products/wireless-earbuds-pro',
    title: 'Revolutionary Wireless Earbuds That Will Transform Your Audio Experience',
    description: 'Discover premium sound quality with our latest wireless earbuds featuring noise cancellation, 30-hour battery life, and crystal-clear audio that rivals $300+ competitors.',
    hashtags: ['#WirelessEarbuds', '#AudioTech', '#NoiseCancel', '#PremiumSound', '#TechDeals'],
    thumbnail: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    media: [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'image',
        width: 800,
        height: 600,
        selected: true,
        optimizedVersions: {
          pinterest: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1500',
          medium: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720',
          reddit: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
          linkedin: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200&h=627',
        },
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'image',
        width: 800,
        height: 600,
        selected: false,
      },
    ],
    scrapedData: {
      title: 'Wireless Earbuds Pro - Premium Audio Experience',
      metaDescription: 'Experience premium sound quality with advanced noise cancellation technology',
      price: '$79.99',
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'IPX7 waterproof rating',
        'Touch controls',
        'Fast charging (15min = 3hrs)',
      ],
      productDetails: 'Premium wireless earbuds with advanced audio technology, perfect for music lovers and professionals.',
      images: [
        'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg',
      ],
      videos: [],
    },
    generatedContent: {
      blogArticle: {
        title: 'Why These $79 Wireless Earbuds Outperform $300+ Competitors',
        content: `In today's crowded audio market, finding wireless earbuds that deliver premium sound without the premium price tag seems impossible. That's exactly what makes the Wireless Earbuds Pro so remarkable.

After testing dozens of wireless earbuds ranging from $50 to $400, I can confidently say these $79 earbuds punch well above their weight class. Here's why they're disrupting the entire audio industry.

**Unmatched Sound Quality**
The first thing you'll notice is the crystal-clear audio reproduction. Thanks to advanced 10mm drivers and custom-tuned sound profiles, these earbuds deliver rich bass, crisp mids, and sparkling highs that rival earbuds costing 4x more.

**Industry-Leading Battery Life**
With 30 hours of total playback time (6 hours per earbud + 24 hours from the case), you'll never worry about running out of power. The fast-charging feature gives you 3 hours of playback from just 15 minutes of charging.

**Active Noise Cancellation That Actually Works**
Unlike cheaper alternatives that claim "noise cancellation," these earbuds feature true ANC technology that blocks out 95% of ambient noise. Perfect for flights, commutes, or focusing in noisy environments.

**Built for Real Life**
IPX7 waterproof rating means you can wear them during workouts, in the rain, or even accidentally drop them in water. The secure fit ensures they stay put during any activity.

**The Bottom Line**
At $79, these earbuds offer features typically found in $200-300+ models. Whether you're an audiophile, fitness enthusiast, or just want reliable wireless audio, these earbuds deliver exceptional value.

Ready to upgrade your audio experience? Check them out before this limited-time pricing ends.`,
        wordCount: 287,
      },
      pinterestPin: {
        title: '🎧 $79 Wireless Earbuds That Beat $300+ Competitors!',
        description: 'Discover the wireless earbuds that are disrupting the audio industry! ✨ 30-hour battery life, active noise cancellation, and premium sound quality at an unbeatable price. Perfect for music lovers, fitness enthusiasts, and professionals. #WirelessEarbuds #AudioTech #TechDeals #PremiumSound',
      },
      redditPost: {
        title: 'Found wireless earbuds that actually compete with AirPods Pro for 1/4 the price',
        content: `I've been through probably 15+ pairs of wireless earbuds in the past 2 years (occupational hazard of being a tech reviewer), and I just found something that genuinely surprised me.

These $79 earbuds have:
- Better battery life than AirPods Pro (30hrs vs 24hrs)
- Comparable ANC (seriously, I A/B tested them)
- More secure fit for workouts
- IPX7 rating (vs IPX4 for AirPods)

The sound quality isn't quite AirPods Pro level, but it's 90% there for 25% of the price. For most people, the difference won't matter.

Been using them for 3 weeks now and they've become my daily drivers. AMA if you want specifics on sound signature, build quality, etc.

Edit: Since people are asking, here's where I got them: [link]`,
        suggestedSubreddits: ['r/headphones', 'r/BuyItForLife', 'r/frugal', 'r/technology', 'r/audiophile'],
      },
      linkedinPost: {
        title: 'The Audio Innovation That\'s Changing Everything',
        content: `As someone who spends 8+ hours a day in virtual meetings, audio quality isn't just a preference—it's essential for productivity.

I recently discovered wireless earbuds that are revolutionizing the market by delivering premium features at an accessible price point. Here's what caught my attention:

🔋 30-hour battery life eliminates charging anxiety
🎯 Active noise cancellation improves focus in open offices  
💧 IPX7 rating handles any work environment
⚡ Fast charging means never missing important calls

What impressed me most? The company prioritized functionality over flashy marketing, resulting in a product that simply works better.

In a market dominated by $200-300 options, finding professional-grade audio at $79 feels like discovering a competitive advantage.

Sometimes the best innovations come from companies willing to challenge industry norms rather than follow them.

#Innovation #Productivity #AudioTechnology #WorkFromHome`,
        tone: 'professional',
      },
      hashtags: ['#WirelessEarbuds', '#AudioTech', '#NoiseCancel', '#PremiumSound', '#TechDeals', '#ProductivityHack', '#WorkFromHome'],
      tone: 'professional',
    },
    status: 'ready',
    platforms: [
      { 
        name: 'reddit', 
        enabled: true, 
        posted: true, 
        postUrl: 'https://reddit.com/r/headphones/post123',
        postId: 'reddit_123',
        metrics: { views: 15420, clicks: 1247, engagement: 8.1, conversions: 89, revenue: 7031 },
        content: {
          title: 'Found wireless earbuds that actually compete with AirPods Pro for 1/4 the price',
          description: 'Detailed review and comparison with premium alternatives',
        }
      },
      { 
        name: 'medium', 
        enabled: true, 
        posted: true, 
        postUrl: 'https://medium.com/@kennon/wireless-earbuds-review',
        postId: 'medium_456',
        metrics: { views: 8930, clicks: 672, engagement: 7.5, conversions: 45, revenue: 3555 },
        content: {
          title: 'Why These $79 Wireless Earbuds Outperform $300+ Competitors',
          description: 'In-depth analysis of features and value proposition',
        }
      },
      { 
        name: 'pinterest', 
        enabled: true, 
        posted: true,
        postUrl: 'https://pinterest.com/kennonkart/wireless-earbuds-deal',
        postId: 'pin_789',
        metrics: { views: 23150, clicks: 1854, engagement: 8.0, conversions: 124, revenue: 9916 },
        content: {
          title: '🎧 $79 Wireless Earbuds That Beat $300+ Competitors!',
          description: 'Premium features at unbeatable price',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        }
      },
      { 
        name: 'linkedin', 
        enabled: true, 
        posted: false,
        content: {
          title: 'The Audio Innovation That\'s Changing Everything',
          description: 'Professional perspective on productivity-enhancing audio technology',
        }
      },
    ],
    analytics: {
      totalViews: 47500,
      totalClicks: 3773,
      totalConversions: 258,
      totalRevenue: 20502,
      ctr: 7.9,
      conversionRate: 6.8,
      platformBreakdown: {
        reddit: { views: 15420, clicks: 1247, conversions: 89, revenue: 7031, posts: 1 },
        medium: { views: 8930, clicks: 672, conversions: 45, revenue: 3555, posts: 1 },
        pinterest: { views: 23150, clicks: 1854, conversions: 124, revenue: 9916, posts: 1 },
        linkedin: { views: 0, clicks: 0, conversions: 0, revenue: 0, posts: 0 },
      },
      dailyStats: [
        { date: '2024-01-15', views: 5200, clicks: 416, conversions: 28, revenue: 2212 },
        { date: '2024-01-16', views: 7800, clicks: 624, conversions: 42, revenue: 3318 },
        { date: '2024-01-17', views: 9200, clicks: 736, conversions: 51, revenue: 4029 },
        { date: '2024-01-18', views: 12400, clicks: 992, conversions: 68, revenue: 5372 },
        { date: '2024-01-19', views: 8900, clicks: 712, conversions: 49, revenue: 3871 },
        { date: '2024-01-20', views: 4000, clicks: 293, conversions: 20, revenue: 1700 },
      ],
      trafficSources: [
        { source: 'Pinterest', clicks: 1854, conversions: 124, revenue: 9916, percentage: 49.1 },
        { source: 'Reddit', clicks: 1247, conversions: 89, revenue: 7031, percentage: 33.0 },
        { source: 'Medium', clicks: 672, conversions: 45, revenue: 3555, percentage: 17.9 },
      ],
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load initial links
    const loadLinks = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLinks(mockLinks);
        setError(null);
      } catch (err) {
        setError('Failed to load links');
        console.error('Error loading links:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadLinks();
  }, []);

  const createLink = async (url: string): Promise<Link> => {
    setLoading(true);
    setError(null);
    
    try {
      // Step 1: Analyze URL
      const scrapedData = await apiService.analyzeUrl(url);
      
      // Step 2: Generate AI content
      const generatedContent = await apiService.generateContent(scrapedData);
      
      // Step 3: Create link object
      const newLink: Link = {
        id: Date.now().toString(),
        userId: 'kennon-admin',
        originalUrl: url,
        title: generatedContent.blogArticle.title,
        description: scrapedData.metaDescription || generatedContent.pinterestPin.description,
        hashtags: generatedContent.hashtags,
        thumbnail: scrapedData.images[0] || 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        media: scrapedData.images.map((imageUrl, index) => ({
          id: `img_${index}`,
          url: imageUrl,
          type: 'image' as const,
          width: 800,
          height: 600,
          selected: index === 0,
          optimizedVersions: {
            pinterest: `${imageUrl}?w=1000&h=1500`,
            medium: `${imageUrl}?w=1280&h=720`,
            reddit: `${imageUrl}?w=400&h=300`,
            linkedin: `${imageUrl}?w=1200&h=627`,
          },
        })),
        scrapedData,
        generatedContent,
        status: 'ready',
        platforms: [
          { name: 'reddit', enabled: true, posted: false },
          { name: 'medium', enabled: true, posted: false },
          { name: 'pinterest', enabled: true, posted: false },
          { name: 'linkedin', enabled: true, posted: false },
        ],
        analytics: {
          totalViews: 0,
          totalClicks: 0,
          totalConversions: 0,
          totalRevenue: 0,
          ctr: 0,
          conversionRate: 0,
          platformBreakdown: {},
          dailyStats: [],
          trafficSources: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setLinks(prev => [newLink, ...prev]);
      return newLink;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create link';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateLink = (id: string, updates: Partial<Link>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, ...updates, updatedAt: new Date() } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const publishToPlatforms = async (linkId: string, platforms: string[]) => {
    const link = links.find(l => l.id === linkId);
    if (!link) throw new Error('Link not found');

    try {
      const publishPromises = platforms.map(async (platformName) => {
        const platform = link.platforms.find(p => p.name === platformName);
        if (!platform || platform.posted) return null;

        const content = link.generatedContent;
        const result = await apiService.publishToPlatform(platformName, content, linkId);
        
        return {
          platformName,
          ...result
        };
      });

      const results = await Promise.all(publishPromises);
      
      // Update link with published status
      const updatedPlatforms = link.platforms.map(platform => {
        const result = results.find(r => r?.platformName === platform.name);
        if (result) {
          return {
            ...platform,
            posted: true,
            postUrl: result.postUrl,
            postId: result.postId,
            metrics: {
              views: 0,
              clicks: 0,
              engagement: 0,
              conversions: 0,
              revenue: 0
            }
          };
        }
        return platform;
      });

      updateLink(linkId, {
        status: 'published',
        platforms: updatedPlatforms,
      });

      return results.filter(Boolean);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish to platforms';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const regenerateContent = async (linkId: string, tone: string) => {
    const link = links.find(l => l.id === linkId);
    if (!link) throw new Error('Link not found');

    try {
      const newContent = await apiService.generateContent(link.scrapedData, tone);
      updateLink(linkId, { generatedContent: newContent });
      return newContent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to regenerate content';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    links,
    loading,
    error,
    createLink,
    updateLink,
    deleteLink,
    publishToPlatforms,
    regenerateContent,
  };
};