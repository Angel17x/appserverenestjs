import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/applications/dto/login.dto';
import { Users } from 'src/domains/entities/user.entity';
import { LoginUseCase } from 'src/domains/usecases/login.usecase';
import { LoginService } from './login.service';
import { AuthEntity } from 'src/domains/entities/auth.entity';

@Injectable()
export class LoginServiceImpl implements LoginService {
  constructor(
    private readonly loginUseCase: LoginUseCase
  ) {}
  // find(user: LoginDto): Promise<Users> {
  //   throw new Error('Method not implemented.');
  // }
 
  auth(user: LoginDto): Promise<AuthEntity> {
    return this.loginUseCase.auth(user);
  }
 
}
