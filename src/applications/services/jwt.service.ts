import { Users } from "src/domains/entities/user.entity";
import { AuthEntity } from "src/domains/entities/auth.entity";

export interface JwtService {
  sign(user: Users): Promise<any>;
  verify(token: string): Promise<any>;
}