import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

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
  idSubject: UUID;

  @IsUUID()
  @IsNotEmpty()
  idTeacher: UUID;

  @IsUUID()
  @IsNotEmpty()
  userId: UUID;
}
