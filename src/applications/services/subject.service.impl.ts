import { Injectable } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectUseCase } from 'src/domains/usecases/subject.usecase';
import { PaginateDto } from '../dto/paginate.dto';
import { Subject } from 'src/domains/entities/entities';
import { UUID } from 'crypto';
import { SubjectDto } from '../dto/subject.dto';
import { PaginateResponse } from 'src/domains/entities/generic.paginate.entity';

@Injectable()
export class SubjectServiceImpl implements SubjectService {
  constructor(private readonly subjectUseCase: SubjectUseCase) {}

  findAll(paginate: PaginateDto): Promise<PaginateResponse<Subject>> {
    return this.subjectUseCase.findAll(paginate);
  }
  findById(id: UUID): Promise<Subject> {
    return this.subjectUseCase.findById(id);
  }
  create(subject: SubjectDto): Promise<Subject> {
    return this.subjectUseCase.create(subject);
  }
  updateAt(id: UUID, subject: SubjectDto): Promise<boolean> {
    return this.subjectUseCase.update(id, subject);
  }
  delete(id: UUID): Promise<boolean> {
    return this.subjectUseCase.delete(id);
  }
}
