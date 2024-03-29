import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";

export default async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || undefined
    });
    
    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1
    });
    
    await limiter.consume(req.ip as string | number);

    return next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  }
}
