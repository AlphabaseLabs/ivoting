import { Answer } from 'src/answers/entities/answer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'varchar', unique: true })
  value: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
