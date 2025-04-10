import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answers.service';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswerService],
  controllers: [],
  exports: [],
})
export class AnswerModule {}
