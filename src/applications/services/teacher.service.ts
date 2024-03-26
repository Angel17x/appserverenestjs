import { Teacher } from 'src/domains/entities/teacher.entity';
import { TeacherDto } from '../dto/teacher.dto';
import { UUID } from 'crypto';
import { TeacherRegisterDto } from '../dto/register-teacher';
import { PaginateDto } from 'src/applications/dto/paginate.dto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';

export interface TeacherService {
  findAll(paginate: PaginateDto): Promise<PaginateResponse<Teacher>>;
  findById(id: UUID): Promise<Teacher>;
  create(teacher: TeacherRegisterDto): Promise<Teacher>;
  updateAt(id: UUID, teacher: TeacherDto): Promise<boolean>;
  delete(id: UUID): Promise<boolean>;
}
