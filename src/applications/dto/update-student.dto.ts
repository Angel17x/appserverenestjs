import { IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  lastname: string;

  @IsString()
  @MinLength(8)
  address: string;

  @IsPhoneNumber('VE')
  phone: string;
}
