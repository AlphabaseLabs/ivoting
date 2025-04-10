import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from 'src/questions/questions.service';
import { Question } from './entities/question.entity';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  controllers: [QuestionsController],
  exports: [],
})
export class QuestionModule {}
