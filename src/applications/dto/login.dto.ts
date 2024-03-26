import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8) // Asumiendo que deseas que la contraseña tenga un mínimo de 8 caracteres.
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
