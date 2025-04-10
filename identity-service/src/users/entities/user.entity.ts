import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { configService } from 'src/config/config.service';
import { Upload } from 'src/uploads/entities/upload.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { UUIDVersion } from 'class-validator';

export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  BLACKLISTED = 'BLACKLISTED',
  PENDING_ANSWERS = 'PENDING_ANSWERS',
  PENDING_UPLOADS = 'PENDING_UPLOADS',
  PENDING_ACCEPTANCE = 'PENDING_ACCEPTANCE',
  PENDING_PHONE_VERIFICATION = 'PENDING_PHONE_VERIFICATION',
  PENDINEMAILNE_VERIFICATION = 'PENDING_EMAIL_VERIFICATION',
}

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid: UUIDVersion;

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Index('index_email')
  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Index('index_national_identity')
  @Column({ type: 'varchar', length: 30, unique: true, nullable: true })
  national_identity: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  passport_nr: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phone_nr: string;

  @Index('index_password')
  @Column({ type: 'varchar', length: 64, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserStatusEnum })
  status: UserStatusEnum;

  @Index('index_wallet_address')
  @Column({ type: 'varchar', unique: true, nullable: true })
  wallet_address: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true, array: true })
  elections: Array<string>;

  @OneToMany(() => Answer, (answer) => answer.user)
  @JoinColumn({ name: 'user_answers' })
  answers: Answer[];

  @OneToMany(() => Upload, (upload) => upload.user)
  @JoinColumn({ name: 'user_files' })
  images: Upload[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password)
      this.password = await bcrypt.hash(
        this.password,
        configService.getBycryptSaltRounds(),
      );
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
