import { NextRequest } from 'next/server';

interface TokenBucket {
  timestamp: number;
  tokens: number;
}

const NEWSLETTER_LIMITS = {
  SUBSCRIBE: {
    tokens: 3,          // 3 attempts
    interval: 60000,    // per minute (60000ms)
  },
  CONFIRM: {
    tokens: 5,          // 5 attempts
    interval: 300000,   // per 5 minutes (300000ms)
  }
} as const;

class NewsletterRateLimiter {
  private tokenCache: Map<string, TokenBucket>;
  private maxCacheSize: number;

  constructor(maxCacheSize = 10000) {
    this.tokenCache = new Map();
    this.maxCacheSize = maxCacheSize;
  }

  private cleanOldTokens(now: number) {
    if (this.tokenCache.size > this.maxCacheSize) {
      for (const [key, value] of this.tokenCache.entries()) {
        if (value.timestamp + 3600000 < now) { // Clean entries older than 1 hour
          this.tokenCache.delete(key);
        }
      }
    }
  }

  async checkLimit(
    req: NextRequest, 
    action: keyof typeof NEWSLETTER_LIMITS
  ): Promise<{ success: boolean; reset?: number }> {
    const now = Date.now();
    this.cleanOldTokens(now);

    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'anonymous';
    
    const identifier = `${action}:${ip}`;
    const limit = NEWSLETTER_LIMITS[action];

    const bucket = this.tokenCache.get(identifier) || {
      timestamp: now,
      tokens: limit.tokens,
    };

    // Reset bucket if interval has passed
    if (bucket.timestamp + limit.interval < now) {
      bucket.tokens = limit.tokens;
      bucket.timestamp = now;
    }

    // Check if rate limit exceeded
    if (bucket.tokens <= 0) {
      const reset = bucket.timestamp + limit.interval;
      return { 
        success: false, 
        reset: Math.ceil((reset - now) / 1000) // seconds until reset
      };
    }

    // Consume a token
    bucket.tokens -= 1;
    this.tokenCache.set(identifier, bucket);

    return { success: true };
  }
}

// Create singleton instance
const newsletterLimiter = new NewsletterRateLimiter();

export async function checkNewsletterRateLimit(
  req: NextRequest,
  action: keyof typeof NEWSLETTER_LIMITS
) {
  return newsletterLimiter.checkLimit(req, action);
} 