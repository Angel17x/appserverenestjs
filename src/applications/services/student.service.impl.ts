import { Injectable } from "@nestjs/common";
import { StudentDto } from "../dto/student.dto";
import { Student } from "src/domains/entities/entities";
import { UUID } from "crypto";
import { StudentUseCase } from "src/domains/usecases/students.usecase";
import { StudentService } from "./student.service";

@Injectable()
export class StudentServiceImpl implements StudentService {
  constructor(
    private readonly teacherUseCase: StudentUseCase) { }
  
  findAll(): Promise<Student[]> {
    return this.teacherUseCase.findAll();
  }
  findById(id: UUID): Promise<Student> {
    return this.teacherUseCase.findById(id);
  }
  create(teacher: StudentDto): Promise<Student> {
    return this.teacherUseCase.create(teacher);
  }
  updateAt(id: UUID, teacher: StudentDto): Promise<boolean> {
    return this.teacherUseCase.update(id, teacher);
  }
  delete(id: UUID): Promise<boolean> {
    return this.teacherUseCase.delete(id);
  }
  
}