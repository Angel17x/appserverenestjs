import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "../../applications/dto/login.dto";
import { Users } from "../entities/user.entity";
import { UsersRepositoryImpl } from "src/infrastructures/repositories/users.repository.impl";
import { UserDto } from "../../applications/dto/register-user.dto";
import { UUID } from "crypto";

@Injectable()
@Catch(HttpException)
export class UsersUseCase {
  constructor(private readonly usersRepository: UsersRepositoryImpl) { }

  async findEmailAndPassword(user: LoginDto): Promise<Users> {
    try {
      const { email, password } = user;
      const repoUser = await this.usersRepository.find({  email, password });
      if (!repoUser) throw new HttpException('Este usuario no existe', HttpStatus.NOT_FOUND);
      return repoUser;

    } catch (error) {
      if (!error) throw new HttpException('Error al buscar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      const repoUser = await this.usersRepository.findAll();
      return repoUser;

    } catch (error) {
      if (!error) throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status);

    }
  }

  async create(user: UserDto): Promise<Users> {
    try {
      const isExistsUser = await this.usersRepository.isExists(user.email);
      if (isExistsUser) throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
      const newUser = await this.usersRepository.create(
        {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password
        }
      );
      return newUser;

    } catch (error) {
      if (!error) throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id:UUID, user: UserDto): Promise<boolean> {
    try {
      const userUpdated = await this.usersRepository.updateAt(
        id,
        {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password
        }
      );
      if(!userUpdated) throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
      return true;

    } catch (error) {
      if (!error) throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status);
    }
  }
}

