import { Users } from "src/domains/entities/user.entity";
import { AuthEntity } from "src/domains/entities/auth.entity";

export interface AuthService {
  generateToken(user: Users): Promise<AuthEntity>;
}