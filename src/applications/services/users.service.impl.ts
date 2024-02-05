import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersUseCase } from 'src/domains/usecases/users.usecase';
import { LoginDto } from 'src/applications/dto/login.dto';
import { Users } from 'src/domains/entities/user.entity';
import { UserDto } from 'src/applications/dto/register-user.dto';
import { UUID } from 'crypto';

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(private readonly usersUseCase: UsersUseCase) {}
  
  findEmailAndPassword(user: LoginDto): Promise<Users> {
    return this.usersUseCase.findEmailAndPassword(user);
  }
  findAll(): Promise<Users[]> {
      return this.usersUseCase.findAll();
  }
  create(user: UserDto): Promise<Users> {
      return this.usersUseCase.create(user);
  }
  updateAt(id:UUID, user: UserDto): Promise<boolean> {
    return this.usersUseCase.update(id, user);
  }
  delete(id: UUID): Promise<boolean> {
    return this.usersUseCase.delete(id);
  }
}
