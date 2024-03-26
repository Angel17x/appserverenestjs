import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "subject" })
export class Subject {
  @PrimaryGeneratedColumn('uuid', { name: 'idsubject' })
  idSubject: string;

  @Column({ name: 'name' })
  name: string;
}