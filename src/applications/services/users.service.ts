import { Users } from "src/domains/entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/register-user.dto";
import { UUID } from "crypto";

export interface UsersService {
  findEmailAndPassword(user: LoginDto): Promise<Users>;
  findAll(): Promise<Users[]>
  create(user: UserDto): Promise<Users>
  updateAt(id:UUID, user: UserDto): Promise<boolean>
}