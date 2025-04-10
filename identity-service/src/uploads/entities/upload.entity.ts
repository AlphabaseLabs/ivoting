import { UUIDVersion } from 'class-validator';
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

@Entity()
export class Upload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'bytea', nullable: false })
  data: Buffer;

  @Column({ type: 'uuid', nullable: false })
  user_id: UUIDVersion;

  @Column({ type: 'varchar', nullable: false })
  file_name: string;

  @Column({ type: 'varchar', nullable: false })
  original_name: string;

  @Column({ type: 'varchar', nullable: false })
  file_type: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @Column({ type: 'varchar', nullable: false })
  encoding: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'uuid' })
  user: User;
}
