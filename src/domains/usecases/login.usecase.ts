import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { LoginDto } from "../../applications/dto/login.dto";
import { Users } from "../entities/user.entity";
import { UsersRepositoryImpl } from "src/infrastructures/repositories/users.repository.impl";
import { AuthServiceImpl } from "src/applications/services/auth.service.impl";
import { AuthEntity } from "../entities/auth.entity";

@Injectable()
@Catch(HttpException)
export class LoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryImpl,
    private readonly authService: AuthServiceImpl
  ) { }

  async auth(user: LoginDto): Promise<AuthEntity> {
    try {
      const repoUser = await this.usersRepository.find({ email: user.email, password: user.password });
      if (!repoUser) throw new HttpException('Credenciales Inválidas', HttpStatus.UNAUTHORIZED);
      return this.authService.generateToken(repoUser);

    } catch (error) {
      if(!error) throw new HttpException('Error al autenticar al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status);
    }
  }

  
  
}

