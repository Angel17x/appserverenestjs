import {
  IsString,
  MinLength,
  IsPhoneNumber,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { UUID } from 'crypto';
import { User } from 'src/domains/entities/user.entity';

export class RegisterStudentDto {
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

  @IsUUID()
  @IsNotEmpty()
  userId: UUID; // Se cambió el tipo a string y el nombre a camelCase
}
