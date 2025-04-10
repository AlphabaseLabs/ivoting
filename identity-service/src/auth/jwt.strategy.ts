import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UUIDVersion } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { uuid: UUIDVersion; role: string; address: string }) {
    return {
      address: payload.address,
      uuid: payload.uuid,
      role: payload.role,
    };
  }
}
