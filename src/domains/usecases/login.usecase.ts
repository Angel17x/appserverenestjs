import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { LoginDto } from "../../applications/dto/login.dto";
import { User } from "../entities/user.entity";
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
      const token = await this.authService.generateToken(repoUser);
      return {
        ...token,
        id: repoUser.id,
        name: repoUser.name,
        lastname: repoUser.lastname,
        email: repoUser.email
      };

    } catch (error) {
      if (!error) throw new HttpException('Error al autenticar al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}

