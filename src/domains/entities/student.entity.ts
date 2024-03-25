import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn('uuid', { name: 'idstudent' })
  idTeacher: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'phone' })
  phone: string;

  @ManyToOne(() => User, { eager: true }) // Indica la relación con la entidad User
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  userid: User;
}