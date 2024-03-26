import { UUID } from 'crypto';
import { PaginateDto } from 'src/applications/dto/paginate.dto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';
import { SubjectDto } from '../dto/subject.dto';
import { Subject } from 'src/domains/entities/subject.entity';

export interface SubjectService {
  findAll(paginate: PaginateDto): Promise<PaginateResponse<Subject>>;
  findById(id: UUID): Promise<Subject>;
  create(teacher: SubjectDto): Promise<Subject>;
  updateAt(id: UUID, teacher: SubjectDto): Promise<boolean>;
  delete(id: UUID): Promise<boolean>;
}
