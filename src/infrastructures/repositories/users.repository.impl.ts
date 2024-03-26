import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { UUID } from "crypto";
import { LoginDto } from "src/applications/dto/login.dto";
import { User } from "src/domains/entities/user.entity";
import { UsersRepository } from "src/domains/repositories/users.repository";
import { UserDto } from "src/applications/dto/register-user.dto";
import { PaginateDto } from "src/applications/dto/paginate.dto";

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) { }
  async findAll(paginate: PaginateDto): Promise<[User[], number]> {
    const [result, total] = await this.userRepository.findAndCount({
      skip: ((paginate.page - 1) * paginate.limit) ?? 0, // Cuántas filas se deben saltar
      take: paginate.limit, // Cuántas filas se deben tomar
    });
    return [result, total];
  }
  findById(id: any): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }
  async create(user: UserDto): Promise<User> {
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
  async delete(id: UUID): Promise<boolean> {
    const result = (await this.userRepository.delete(id));
    return result.affected === 1 ? true : false
  }

  find(user: LoginDto): Promise<User | null> {
    const { email, password } = user;
    return this.userRepository.findOne({ where: { email, password } });
  }

  async isExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }
}