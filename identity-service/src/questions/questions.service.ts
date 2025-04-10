import { HttpStatus, Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import { Answer } from 'src/answers/entities/answer.entity';
import { configService } from 'src/config/config.service';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private questionsToAsk: number;
  constructor() {
    this.questionsToAsk = configService.getNumberOfQuestionsToAsk();
  }

  public async getQuestions(questionIds: Array<number>) {
    return Question.find({
      where: {
        id: questionIds,
      },
    });
  }

  public async getRandomQuestions() {
    const questions = await Question.createQueryBuilder('question')
      .select('question')
      .orderBy('RANDOM()')
      .limit(this.questionsToAsk)
      .getMany();

    return {
      statusCode: HttpStatus.OK,
      message: questions,
    };
  }

  public async getUserQuestions(user: UUIDVersion) {
    return await Answer.createQueryBuilder('ans')
      .where({ user_id: user })
      .select(['questions.id as id', 'questions.value As question'])
      .leftJoin('ans.question', 'questions')
      .getRawMany();
  }
}
