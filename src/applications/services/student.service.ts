import { Student } from 'src/domains/entities/student.entity';
import { StudentDto } from '../dto/student.dto';
import { UUID } from 'crypto';
import { PaginateDto } from '../dto/paginate.dto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';
import { RegisterStudentDto } from '../dto/register-student.dto';

export interface StudentService {
  findAll(paginate: PaginateDto): Promise<PaginateResponse<Student>>;
  findById(id: UUID): Promise<Student>;
  create(teacher: RegisterStudentDto): Promise<Student>;
  updateAt(id: UUID, teacher: StudentDto): Promise<boolean>;
  delete(id: UUID): Promise<boolean>;
}
