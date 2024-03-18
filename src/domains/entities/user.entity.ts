import { Role } from "src/applications/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  
  @Column({ name: 'name' })
  name: string;
  
  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ name: 'email' })
  email: string;
  
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role' })
  role: Role | Role.PEOPLE;
}