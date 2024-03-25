import { Injectable } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { Teacher } from "src/domains/entities/teacher.entity";
import { TeacherDto } from "../dto/teacher.dto";
import { UUID } from "crypto";
import { TeacherUseCase } from "src/domains/usecases/teacher.usecase";
import { TeacherRegisterDto } from "../dto/register-teacher";
import { PaginateDto } from "src/applications/dto/paginate.dto";
import { PaginateResponse } from "src/domains/entities/generic.paginate.entity";

@Injectable()
export class TeacherServiceImpl implements TeacherService {
  constructor(
    private readonly teacherUseCase: TeacherUseCase) { }
  
  findAll(paginate: PaginateDto): Promise<PaginateResponse<Teacher>> {
    return this.teacherUseCase.findAll(paginate);
  }
  findById(id: UUID): Promise<Teacher> {
    return this.teacherUseCase.findById(id);
  }
  create(teacher: TeacherRegisterDto): Promise<Teacher> {
    return this.teacherUseCase.create(teacher);
  }
  updateAt(id: UUID, teacher: TeacherDto): Promise<boolean> {
    return this.teacherUseCase.update(id, teacher);
  }
  delete(id: UUID): Promise<boolean> {
    return this.teacherUseCase.delete(id);
  }
  
}