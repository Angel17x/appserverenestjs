import { User } from 'src/domains/entities/user.entity';

export interface JwtService {
  sign(user: User): Promise<any>;
  verify(token: string): Promise<any>;
}
