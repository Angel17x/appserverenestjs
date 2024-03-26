import {
  IsString,
  MinLength,
  IsPhoneNumber,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { User } from 'src/domains/entities/user.entity';

export class TeacherDto {
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
  userId: User; // Se cambió el tipo a string y el nombre a camelCase
}
