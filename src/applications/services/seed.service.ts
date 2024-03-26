import { User } from 'src/domains/entities/user.entity';
import { UserDto } from '../dto/register-user.dto';

export interface SeedService {
  createDefaultUser(user: UserDto): Promise<User>;
  seed(user: UserDto[]): Promise<boolean>;
}
