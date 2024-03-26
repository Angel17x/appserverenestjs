import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { StudentDto } from "src/applications/dto/student.dto";
import { UpdateStudentDto } from "src/applications/dto/update-student.dto";
import { Student } from "src/domains/entities/student.entity";
import { StudentRepository } from "src/domains/repositories/students.repository";
import { Repository } from "typeorm";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) { }
  find(entity: StudentDto): Promise<Student> {
    return this.studentRepository.findOne({ where: { ...entity } });
  }
  async findAll(paginate: PaginateDto): Promise<[Student[], number]> {
    const [result, total] = await this.studentRepository.findAndCount({
      skip: ((paginate.page - 1) * paginate.limit) ?? 0, // Cuántas filas se deben saltar
      take: paginate.limit, // Cuántas filas se deben tomar
    });
    return [result, total];
  }
  findById(id: any): Promise<Student> {
    return this.studentRepository.findOne({ where: { idStudent: id } });
  }
  create(entity: StudentDto): Promise<Student> {
    return this.studentRepository.save(entity);
  }
  async updateAt(id: any, entity: UpdateStudentDto): Promise<any> {
    return (await this.studentRepository.update(
      id,
      {
        name: entity.name,
        lastname: entity.lastname,
        address: entity.address,
        phone: entity.phone
      }
    )).affected === 1 ? true : false;
  }
  async delete(id: UUID): Promise<boolean> {
    console.log(id);
    const result = await this.studentRepository.delete(id);
    return result.affected === 1 ? true : false
  }
  async isExists(name: string, lastname: string): Promise<boolean> {
    const user = await this.studentRepository.findOne({ where: { name, lastname } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }

}