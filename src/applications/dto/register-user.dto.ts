import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class UserDto {
  @IsString()
  @MinLength(2) 
  name: string;

  @IsString()
  @MinLength(2) 
  lastname: string;
  
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.#@$&*])[A-Za-z\d.#@$&*]{8,}$/)
  password: string;
}