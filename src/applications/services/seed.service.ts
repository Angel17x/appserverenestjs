import { UserDto } from "../dto/register-user.dto";

export interface SeedService {
  seed(user: UserDto[]):Promise<boolean>;
}