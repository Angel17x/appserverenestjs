import { User } from "src/domains/entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/register-user.dto";
import { UUID } from "crypto";

export interface UsersService {
  findEmailAndPassword(user: LoginDto): Promise<User>;
  findAll(): Promise<User[]>
  create(user: UserDto): Promise<User>
  updateAt(id:UUID, user: UserDto): Promise<boolean>
  delete(id:UUID): Promise<boolean>
}