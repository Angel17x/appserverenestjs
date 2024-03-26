import { IsString, MinLength } from 'class-validator';

export class SubjectDto {
  @IsString()
  @MinLength(2)
  name: string;
}
