import { Users } from "src/domains/entities/user.entity";
import { LoginDto } from "../../applications/dto/login.dto";
import { GenericRepository } from "./generic.repository";

export interface UsersRepository extends GenericRepository<Users>{
  find(user: LoginDto): Promise<Users>
  findAll(): Promise<Users[]>
  findById(id: any): Promise<Users>
  create(entity: Users): Promise<Users>
  updateAt(id:any, entity: Users): Promise<any>
  delete(id: any): Promise<boolean>
}