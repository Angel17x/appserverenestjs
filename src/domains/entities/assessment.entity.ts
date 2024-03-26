import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Subject } from "./subject.entity";
import { Teacher } from "./teacher.entity";

@Entity({ name: "assessment" })
export class Assessment {
  @PrimaryGeneratedColumn('uuid', { name: 'idassessment' })
  idAssessment: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'datestartassessment' })
  dateStartAssessment: Date;

  @Column({ name: 'dateendassessment' })
  dateEndAssessment: Date;

  @Column({ name: 'datecreatedassessment' })
  dateCreatedAssessment: Date;

  @ManyToOne(() => Subject, { eager: true }) // Indica la relación con la entidad User
  @JoinColumn({ name: 'idsubject', referencedColumnName: 'id' })
  idSubject: Subject;

  @ManyToOne(() => Teacher, { eager: true }) // Indica la relación con la entidad User
  @JoinColumn({ name: 'idteacher', referencedColumnName: 'id' })
  idTeacher: Teacher;

  @ManyToOne(() => User, { eager: true }) // Indica la relación con la entidad User
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: User;

}