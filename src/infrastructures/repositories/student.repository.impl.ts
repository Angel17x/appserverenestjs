import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentDto } from "src/applications/dto/student.dto";
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
  findAll(): Promise<Student[]> {
    return this.studentRepository.find({ cache: true });
  }
  findById(id: any): Promise<Student> {
    return this.studentRepository.findOne(id);
  }
  create(entity: StudentDto): Promise<Student> {
    return this.studentRepository.save(entity);
  }
  async updateAt(id: any, entity: StudentDto): Promise<any> {
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
  async delete(id: any): Promise<boolean> {
    const result = (await this.studentRepository.delete(id));
    return result.affected === 1 ? true : false
  }
  async isExists(name: string, lastname: string): Promise<boolean> {
    const user = await this.studentRepository.findOne({ where: { name, lastname } });
    return !!user; // Devuelve true si se encuentra un usuario, false si no se encuentra
  }

}