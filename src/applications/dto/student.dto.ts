import { IsString, MinLength, IsPhoneNumber, IsUUID, isNotEmpty, IsEmpty, IsNotEmpty } from 'class-validator';
import { User } from 'src/domains/entities/user.entity';

export class StudentDto {
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
  userId: User; // Se cambió el tipo a string y el nombre a camelCase
}