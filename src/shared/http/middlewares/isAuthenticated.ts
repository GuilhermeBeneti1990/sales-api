import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if(!authHeader) throw new AppError('Token is missing!', 403);

  const [_, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as IToken;

    req.user = {
      id: sub
    };

    return next();
  } catch (error) {
    throw new AppError('Token invalid!', 403);
  }
}
