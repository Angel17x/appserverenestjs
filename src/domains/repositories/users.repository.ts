import { User } from "src/domains/entities/user.entity";
import { LoginDto } from "../../applications/dto/login.dto";
import { PaginateDto } from "src/applications/dto/paginate.dto";

export interface UsersRepository {
  find(user: LoginDto): Promise<User>
  findAll(paginate: PaginateDto): Promise<[User[], number]>
  findById(id: any): Promise<User>
  create(entity: User): Promise<User>
  updateAt(id:any, entity: User): Promise<any>
  delete(id: any): Promise<boolean>
}