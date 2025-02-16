import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export class RateLimitError extends Error {
  constructor(
    message: string,
    public status: number = 429,
    public retryAfter: string = "60",
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

// Create a new ratelimiter that allows 10 requests per 10 seconds by default
export function createRateLimiter(opts?: {
  requests?: number;
  interval?: string | number;
}) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      opts?.requests || 10,
      opts?.interval || "10 s",
    ),
  });
}

export async function rateLimit(
  request: Request,
  opts?: {
    identifier?: string;
    requests?: number;
    interval?: string | number;
  },
) {
  const identifier =
    opts?.identifier || request.headers.get("x-forwarded-for") || "127.0.0.1";
  const limiter = createRateLimiter({
    requests: opts?.requests,
    interval: opts?.interval,
  });

  const { success, limit, reset, remaining } = await limiter.limit(identifier);

  if (!success) {
    throw new RateLimitError(
      `Rate limit exceeded. Try again in ${Math.ceil(
        (reset - Date.now()) / 1000,
      )} seconds.`,
      429,
      Math.ceil((reset - Date.now()) / 1000).toString(),
    );
  }

  return { success, limit, reset, remaining };
}
