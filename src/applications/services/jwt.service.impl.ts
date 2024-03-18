import { Injectable } from "@nestjs/common";
import { sign, verify } from 'jsonwebtoken';
import { User } from "src/domains/entities/user.entity";
import { AuthEntity } from "src/domains/entities/auth.entity";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtServiceImpl implements JwtService {
  async verify(token: string): Promise<any> {
    const secret = process.env.JWT_SECRET;
    return verify(token, secret);
  }

  async sign(payload: User): Promise<object> {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    return { token: sign({ ...payload }, secret, { expiresIn }) };
  }
} 