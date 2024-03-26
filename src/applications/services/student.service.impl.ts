import { Injectable } from '@nestjs/common';
import { Student } from 'src/domains/entities/entities';
import { UUID } from 'crypto';
import { StudentUseCase } from 'src/domains/usecases/students.usecase';
import { StudentService } from './student.service';
import { PaginateDto } from '../dto/paginate.dto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';
import { RegisterStudentDto } from '../dto/register-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Injectable()
export class StudentServiceImpl implements StudentService {
  constructor(private readonly studentUseCase: StudentUseCase) {}

  findAll(paginate: PaginateDto): Promise<PaginateResponse<Student>> {
    return this.studentUseCase.findAll(paginate);
  }
  findById(id: UUID): Promise<Student> {
    return this.studentUseCase.findById(id);
  }
  create(student: RegisterStudentDto): Promise<Student> {
    return this.studentUseCase.create(student);
  }
  updateAt(id: UUID, student: UpdateStudentDto): Promise<boolean> {
    return this.studentUseCase.update(id, student);
  }
  delete(id: UUID): Promise<boolean> {
    return this.studentUseCase.delete(id);
  }
}
