import { Injectable } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { User } from "src/domains/entities/user.entity";
import { UserDto } from "../dto/register-user.dto";
import { UsersUseCase } from "src/domains/usecases/users.usecase";

@Injectable()
export class SeedServiceImpl implements SeedService  {
  constructor(private readonly usersUseCase: UsersUseCase) {}
 
  createDefaultUser(user: UserDto): Promise<User> {
    return this.usersUseCase.create(user);
  }
  async seed(users: UserDto[]): Promise<boolean> {
    try {
      await this.usersUseCase.create(users[0]);
      await this.usersUseCase.create(users[1]);
      return true;
    } catch (error) {
      return false;
    }
  }
  
}