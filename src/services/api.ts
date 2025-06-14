// API service for ClickSprout backend functionality
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

class APIService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(ADMIN_KEY && { 'x-admin-key': ADMIN_KEY }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // URL Analysis and Content Generation
  async analyzeUrl(url: string) {
    try {
      // Simulate URL analysis with real-world data extraction
      const response = await this.simulateUrlAnalysis(url);
      return response;
    } catch (error) {
      console.error('URL analysis failed:', error);
      throw new Error('Failed to analyze URL. Please check the URL and try again.');
    }
  }

  private async simulateUrlAnalysis(url: string) {
    // Simulate realistic processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract domain for realistic content generation
    const domain = new URL(url).hostname;
    const isEcommerce = domain.includes('shop') || domain.includes('store') || 
                       domain.includes('cart') || url.includes('product');
    
    return {
      title: isEcommerce ? 
        'Premium Product That\'s Taking the Market by Storm' : 
        'Amazing Content That Everyone\'s Talking About',
      description: isEcommerce ?
        'Discover this incredible product that\'s revolutionizing the industry with its innovative features and unbeatable value.' :
        'This content has been generating massive engagement and driving real results for creators worldwide.',
      price: isEcommerce ? '$49.99' : null,
      features: isEcommerce ? [
        'Premium Quality Materials',
        'Fast & Free Shipping',
        '30-Day Money Back Guarantee',
        '24/7 Customer Support',
        'Eco-Friendly Packaging'
      ] : [
        'High-Quality Content',
        'Proven Results',
        'Expert Insights',
        'Actionable Tips'
      ],
      images: [
        'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      videos: []
    };
  }

  // AI Content Generation
  async generateContent(data: any, tone: string = 'professional') {
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const isProduct = !!data.price;
      
      return {
        blogArticle: {
          title: isProduct ? 
            `Why This ${data.price} Product Is Worth Every Penny (Honest Review)` :
            `The Ultimate Guide to ${data.title}`,
          content: this.generateBlogContent(data, tone, isProduct),
          wordCount: 450
        },
        pinterestPin: {
          title: isProduct ?
            `🔥 Amazing ${data.price} Find That Everyone's Buying!` :
            `✨ ${data.title} - Must See!`,
          description: isProduct ?
            `This incredible product is flying off the shelves! ✨ Premium quality, unbeatable price, and amazing reviews. Perfect for anyone looking for value and quality. #ProductReview #MustHave #QualityFinds #Shopping` :
            `Don't miss this amazing content that's taking the internet by storm! 🚀 Get inspired and discover something new today. #Inspiration #MustRead #Trending #Discover`
        },
        redditPost: {
          title: isProduct ?
            `Found an amazing product for ${data.price} that actually lives up to the hype` :
            `This content completely changed my perspective - thought you'd find it interesting`,
          content: this.generateRedditContent(data, isProduct),
          suggestedSubreddits: isProduct ?
            ['r/ProductReviews', 'r/BuyItForLife', 'r/deals', 'r/frugal'] :
            ['r/InterestingAsFuck', 'r/todayilearned', 'r/LifeProTips', 'r/coolguides']
        },
        linkedinPost: {
          title: isProduct ?
            'Innovation in Product Design: A Case Study' :
            'Insights That Are Reshaping Industry Standards',
          content: this.generateLinkedInContent(data, isProduct),
          tone: tone
        },
        hashtags: isProduct ?
          ['#ProductReview', '#Innovation', '#Quality', '#Value', '#MustHave', '#Shopping'] :
          ['#Innovation', '#Insights', '#Learning', '#Growth', '#Trending', '#MustRead'],
        tone: tone
      };
    } catch (error) {
      console.error('Content generation failed:', error);
      throw new Error('Failed to generate content. Please try again.');
    }
  }

  private generateBlogContent(data: any, tone: string, isProduct: boolean): string {
    if (isProduct) {
      return `In today's crowded marketplace, finding products that truly deliver on their promises is becoming increasingly rare. That's exactly what makes this ${data.price} find so remarkable.

**What Makes This Product Special**

After extensive testing and research, here's what sets this product apart from the competition:

${data.features.map((feature: string) => `• ${feature}`).join('\n')}

**Real-World Performance**

The build quality immediately stands out. From the moment you unbox it, you can tell this isn't just another mass-produced item. The attention to detail and premium materials justify the ${data.price} price point.

**Value Proposition**

What impressed me most is how this product delivers premium features typically found in much more expensive alternatives. At ${data.price}, it offers exceptional value for money.

**The Bottom Line**

If you're looking for a product that combines quality, functionality, and affordability, this is definitely worth considering. The positive reviews and customer satisfaction speak for themselves.

Ready to see what all the buzz is about? Check it out and see why so many people are making the switch.`;
    } else {
      return `In an era of information overload, discovering content that truly adds value to your life is rare. This piece stands out for all the right reasons.

**Why This Matters**

The insights shared here challenge conventional thinking and offer practical solutions to real-world problems. Here's what makes it worth your time:

${data.features.map((feature: string) => `• ${feature}`).join('\n')}

**Key Takeaways**

The most valuable aspect is how it breaks down complex concepts into actionable steps. Whether you're a beginner or expert, there's something here for everyone.

**Real Impact**

What sets this apart is the focus on practical application. It's not just theory – it's proven strategies that deliver real results.

**Moving Forward**

The principles outlined here have the potential to transform how you approach challenges and opportunities in your field.

Take a few minutes to explore this – it might just change your perspective on what's possible.`;
    }
  }

  private generateRedditContent(data: any, isProduct: boolean): string {
    if (isProduct) {
      return `I've been pretty skeptical about products in this price range lately, but this one genuinely surprised me.

Been using it for about 3 weeks now and here's my honest take:

**The Good:**
${data.features.slice(0, 3).map((feature: string) => `- ${feature}`).join('\n')}

**The Not-So-Good:**
- Took a few days to get used to
- Packaging could be better

**Bottom Line:**
For ${data.price}, this is probably the best value I've found in this category. Not perfect, but definitely worth it if you're looking for quality without breaking the bank.

Happy to answer any questions if you're considering it!

Edit: Since people are asking, here's where I got it: [link]`;
    } else {
      return `Came across this content yesterday and it completely shifted how I think about this topic.

The author breaks down some really complex ideas in a way that actually makes sense. Been implementing some of the suggestions and already seeing results.

Key points that stood out:
${data.features.slice(0, 3).map((feature: string) => `- ${feature}`).join('\n')}

Worth checking out if you're interested in this space. Let me know what you think!

[link]`;
    }
  }

  private generateLinkedInContent(data: any, isProduct: boolean): string {
    if (isProduct) {
      return `Innovation often comes from unexpected places. This ${data.price} product demonstrates how thoughtful design and customer-centric thinking can disrupt established markets.

Key differentiators I observed:
${data.features.slice(0, 3).map((feature: string) => `🔹 ${feature}`).join('\n')}

What's particularly impressive is how the company prioritized functionality over flashy marketing, resulting in a product that simply works better.

In a market dominated by premium-priced alternatives, finding solutions that deliver professional-grade results at accessible price points represents a significant competitive advantage.

Sometimes the best innovations come from companies willing to challenge industry norms rather than follow them.

#Innovation #ProductDesign #CustomerValue #MarketDisruption`;
    } else {
      return `Continuous learning remains one of the most valuable investments we can make in our professional development.

Recently discovered insights that are reshaping how industry leaders approach:
${data.features.slice(0, 3).map((feature: string) => `🔹 ${feature}`).join('\n')}

What stands out is the practical application of these concepts in real-world scenarios. The strategies outlined have immediate relevance for professionals across various industries.

The most successful organizations consistently invest in knowledge that drives measurable outcomes.

Worth exploring if you're focused on staying ahead of industry trends and best practices.

#ProfessionalDevelopment #Innovation #Leadership #ContinuousLearning`;
    }
  }

  // Platform Publishing
  async publishToPlatform(platform: string, content: any, linkId: string) {
    try {
      // Simulate platform publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const postId = `${platform}_${Date.now()}`;
      const postUrl = this.generatePostUrl(platform, postId);
      
      return {
        success: true,
        postId,
        postUrl,
        platform,
        publishedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Failed to publish to ${platform}:`, error);
      throw new Error(`Failed to publish to ${platform}. Please check your API configuration.`);
    }
  }

  private generatePostUrl(platform: string, postId: string): string {
    const urls = {
      reddit: `https://reddit.com/r/ProductReviews/comments/${postId}`,
      medium: `https://medium.com/@kennon/${postId}`,
      pinterest: `https://pinterest.com/kennonkart/pin/${postId}`,
      linkedin: `https://linkedin.com/posts/kennon_${postId}`
    };
    
    return urls[platform as keyof typeof urls] || '#';
  }

  // Analytics
  async getAnalytics(linkId: string) {
    try {
      // Simulate analytics data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        views: Math.floor(Math.random() * 10000) + 1000,
        clicks: Math.floor(Math.random() * 1000) + 100,
        conversions: Math.floor(Math.random() * 50) + 10,
        revenue: Math.floor(Math.random() * 5000) + 500
      };
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      throw new Error('Failed to fetch analytics data.');
    }
  }
}

export const apiService = new APIService();