import {
  IsString,
  MinLength,
  IsPhoneNumber,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class TeacherRegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  lastname: string;

  @IsString()
  @MinLength(8)
  address: string;

  @IsPhoneNumber()
  phone: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // Se cambió el tipo a string y el nombre a camelCase
}
