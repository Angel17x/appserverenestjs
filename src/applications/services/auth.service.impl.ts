import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/domains/entities/user.entity';
import { JwtServiceImpl } from './jwt.service.impl';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly jwtService: JwtServiceImpl) {}

  async generateToken(payload: User): Promise<any> {
    const token = await this.jwtService.sign(payload);
    return token;
  }
}
