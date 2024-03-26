import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersUseCase } from 'src/domains/usecases/users.usecase';
import { LoginDto } from 'src/applications/dto/login.dto';
import { User } from 'src/domains/entities/user.entity';
import { UserDto } from 'src/applications/dto/register-user.dto';
import { UUID } from 'crypto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';
import { PaginateDto } from '../dto/paginate.dto';

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(private readonly usersUseCase: UsersUseCase) {}

  findEmailAndPassword(user: LoginDto): Promise<User> {
    return this.usersUseCase.findEmailAndPassword(user);
  }
  findAll(paginate: PaginateDto): Promise<PaginateResponse<User>> {
    return this.usersUseCase.findAll(paginate);
  }
  findById(id: string): Promise<User> {
    return this.usersUseCase.findById(id);
  }
  create(user: UserDto): Promise<User> {
    return this.usersUseCase.create(user);
  }
  updateAt(id: UUID, user: UserDto): Promise<boolean> {
    return this.usersUseCase.update(id, user);
  }
  delete(id: UUID): Promise<boolean> {
    return this.usersUseCase.delete(id);
  }
}
