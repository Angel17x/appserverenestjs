import { IsEmail, IsEnum, IsString, Matches, MinLength } from "class-validator";
import { Role } from "../enums/role.enum";

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

  @IsEnum(Role)
  role: Role | Role.PEOPLE;

  constructor(name: string, email: string, password: string, role: Role){
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}