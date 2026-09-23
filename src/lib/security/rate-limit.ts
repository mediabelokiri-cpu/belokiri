/**
 * In-Memory Sliding Window Rate Limiter for BELOKIRI
 * Prevents spamming, bot attacks, and resource exhaustion on API endpoints and Server Actions.
 */

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory bucket store
const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to avoid memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(maxWindowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return;
  }
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((t) => now - t < maxWindowMs);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, { timestamps: validTimestamps });
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Check if a given key has exceeded the allowed rate limit within the specified window.
 *
 * @param key Unique identifier (e.g., `upload:${ip}` or `submit:${userId}`)
 * @param limit Maximum allowed requests within the window
 * @param windowMs Time window in milliseconds (default: 60,000 ms = 1 minute)
 */
export function checkRateLimit(
  key: string,
  limit: number = 20,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  cleanupStaleEntries(windowMs);

  const existing = rateLimitStore.get(key) || { timestamps: [] };
  // Keep only timestamps within the sliding window
  const recentTimestamps = existing.timestamps.filter((t) => now - t < windowMs);

  if (recentTimestamps.length >= limit) {
    const oldest = recentTimestamps[0];
    const resetSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  recentTimestamps.push(now);
  rateLimitStore.set(key, { timestamps: recentTimestamps });

  return {
    success: true,
    limit,
    remaining: limit - recentTimestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Helper to extract client IP from Next.js request headers
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Rate limit preset for media asset uploads:
 * 10 uploads per 60 seconds per IP
 */
export function rateLimitUpload(identifier: string): RateLimitResult {
  return checkRateLimit(`upload:${identifier}`, 10, 60 * 1000);
}

/**
 * Rate limit preset for contributor article submissions:
 * 20 operations per 60 seconds per user
 */
export function rateLimitSubmission(identifier: string): RateLimitResult {
  return checkRateLimit(`submit:${identifier}`, 20, 60 * 1000);
}

/**
 * Rate limit preset for login / auth attempts:
 * 8 attempts per 60 seconds per IP
 */
export function rateLimitAuth(identifier: string): RateLimitResult {
  return checkRateLimit(`auth:${identifier}`, 8, 60 * 1000);
}
