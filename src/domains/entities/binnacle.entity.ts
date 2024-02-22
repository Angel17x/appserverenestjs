import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity({name: 'binnacle'})
export class Binnacle {
  @PrimaryGeneratedColumn('uuid', { name: 'idbinnacle' })
  idBinnacle: string;

  @Column({ name: 'activity' })
  activity: string;

  @Column({ name: 'dateactivity' })
  dateActivity: Date;

  @ManyToOne(() => Users, { eager: true }) // Indica la relación con la entidad User
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  user: Users;
}