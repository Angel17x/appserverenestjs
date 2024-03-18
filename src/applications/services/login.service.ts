import { User } from "src/domains/entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { AuthEntity } from "src/domains/entities/auth.entity";

export interface LoginService {
  //find(user: LoginDto): Promise<User>;
  auth(user: LoginDto): Promise<AuthEntity>;
}