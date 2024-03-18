import { User } from "src/domains/entities/user.entity";
import { LoginDto } from "../../applications/dto/login.dto";
import { GenericRepository } from "./generic.repository";

export interface UsersRepository extends GenericRepository<User>{
  find(user: LoginDto): Promise<User>
  findAll(): Promise<User[]>
  findById(id: any): Promise<User>
  create(entity: User): Promise<User>
  updateAt(id:any, entity: User): Promise<any>
  delete(id: any): Promise<boolean>
}