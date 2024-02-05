import { Injectable } from "@nestjs/common";
import { LoginDto } from "src/applications/dto/login.dto";
import { Users } from "src/domains/entities/user.entity";
import { UsersRepository } from "src/domains/repositories/users.repository";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from "src/applications/dto/register-user.dto";
import { UUID } from "crypto";

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>) { }
  findAll(): Promise<Users[]> {
    return this.userRepository.find({ cache: true });
  }
  findById(id: any): Promise<Users> {
    return this.userRepository.findOne(id);
  }
  async create(user: UserDto): Promise<Users> {
    return this.userRepository.save(user);
  }
  async updateAt(id: UUID, user: UserDto): Promise<boolean> {
    return (await this.userRepository.update(
      id,
      {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      }
    )).affected === 1 ? true : false;
  }
  async delete(id: string): Promise<boolean> {
    return (await this.userRepository.delete(id)).affected === 1 ? true : false;
  }

  find(user: LoginDto): Promise<Users | null> {
    const { email, password } = user;
    return this.userRepository.findOne({ where: { email, password } });
  }

  async isExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }
}