import { Users } from "src/domains/entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { AuthEntity } from "src/domains/entities/auth.entity";

export interface LoginService {
  //find(user: LoginDto): Promise<Users>;
  auth(user: LoginDto): Promise<AuthEntity>;
}