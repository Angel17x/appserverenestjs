import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class Users {
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

}