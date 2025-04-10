import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SmsService } from 'src/sms/sms.service';
import { QuestionService } from 'src/questions/questions.service';
import { UploadsService } from 'src/uploads/uploads.service';
import { AnswerService } from 'src/answers/answers.service';
import { Answer } from 'src/answers/entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [UsersController],
  providers: [
    UsersService,
    SmsService,
    QuestionService,
    UploadsService,
    AnswerService,
    // AuthService,
    // AuthSignatureService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
