import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Subject } from 'src/domains/entities/subject.entity';
import { Teacher } from 'src/domains/entities/teacher.entity';
import { User } from 'src/domains/entities/user.entity';

export class AssessmentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  description: string;

  @IsDate()
  dateStartAssessment: Date;

  @IsDate()
  dateEndAssessment: Date;

  @IsDate()
  dateCreatedAssessment: Date = new Date();

  @IsUUID()
  @IsNotEmpty()
  idSubject: Subject;

  @IsUUID()
  @IsNotEmpty()
  idTeacher: Teacher;

  @IsUUID()
  @IsNotEmpty()
  userId: User;
}
