import { Injectable } from "@nestjs/common";
import { sign, verify } from 'jsonwebtoken';
import { Users } from "src/domains/entities/user.entity";
import { AuthEntity } from "src/domains/entities/auth.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "./jwt.service";
import { AuthConfig } from "src/infrastructures/config/interfaces/config.interface";

@Injectable()
export class JwtServiceImpl implements JwtService {
  constructor(
    private readonly configService: ConfigService
  ){}
  async verify(token: string): Promise<any> {
    const { jwt } = this.configService.get<AuthConfig>('auth');
    return verify(token, jwt.secret);
  }

  async sign(payload: Users): Promise<AuthEntity> {
    const { jwt } = this.configService.get<AuthConfig>('auth');
    return { token: sign({...payload}, jwt.secret, { expiresIn: jwt.expiresIn }) };
  }
}