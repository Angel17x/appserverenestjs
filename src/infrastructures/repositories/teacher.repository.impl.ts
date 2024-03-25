import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { TeacherDto } from "src/applications/dto/teacher.dto";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { Teacher } from "src/domains/entities/teacher.entity";
import { TeacherRepository } from "src/domains/repositories/teacher.repository";
import { Repository } from "typeorm";

@Injectable()
export class TeacherRepositoryImpl implements TeacherRepository {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>
  ) { }

  async findAll(paginate: PaginateDto): Promise<[Teacher[], number]> {

    const [result, total] = await this.teacherRepository.findAndCount({
      skip: ((paginate.page - 1) * paginate.limit) ?? 0, // Cuántas filas se deben saltar
      take: paginate.limit, // Cuántas filas se deben tomar
    });
    return [result, total];
  }
  findById(id: UUID): Promise<Teacher> {
    return this.teacherRepository.findOne({ where: { idTeacher: id } })
  }
  create(teacher: TeacherDto): Promise<Teacher> {
    return this.teacherRepository.save(teacher);
  }
  async updateAt(idTeacher: string, teacherDto: TeacherDto): Promise<boolean> {
    const result = await this.teacherRepository.update({ idTeacher }, teacherDto);
    return result.affected === 1;
  }
  async delete(id: UUID): Promise<boolean> {
    const result = (await this.teacherRepository.delete({ idTeacher: id }));
    return result.affected === 1 ? true : false
  }
  find(teacher: TeacherDto): Promise<Teacher> {
    return this.teacherRepository.findOne({ where: { ...teacher } });
  }

  async isExists(name: string, lastname: string): Promise<boolean> {
    const user = await this.teacherRepository.findOne({ where: { name, lastname } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }
  async isExistsUserId(userId: string): Promise<boolean> {
    const user = await this.teacherRepository.findOne({ where: { userId: { id: userId } } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }

}