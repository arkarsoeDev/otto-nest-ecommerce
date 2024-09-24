import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User as UserEntity } from "@/core/entities"
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

declare module 'express-session' {
  interface Session {
    jwt?: string; // Add a jwt string to the session data
  }
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: JwtStrategy.extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private static extractJwtFromCookie(req: Request): string | null {
    console.log(req.cookies, 'cookies')

    if (req.cookies && req.cookies.jwt) {
      return req.cookies.jwt;
    }
    return null;
  }

  async validate(payload: any) {
    console.log(payload)
    return { userId: payload.sub, username: payload.username };
  }
}

