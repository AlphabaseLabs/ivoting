import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UUIDVersion } from 'class-validator';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'varchar', nullable: false })
  value: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: UUIDVersion;

  @Column({ type: 'bigint', nullable: false })
  question_id: bigint;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: Question;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'uuid' })
  user: User;
}
