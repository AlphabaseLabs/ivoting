import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import { throwException } from 'src/utils/utils.service';
import { Repository } from 'typeorm';
import { CreateAnswersDto } from './dto/create-answers.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private readonly answer: Repository<Answer>,
  ) {}

  public async getAnswers(user: UUIDVersion): Promise<any> {
    return this.answer.find({
      where: {
        user_id: user,
      },
    });
  }

  public async saveAnswers(createAnswersDto: CreateAnswersDto): Promise<void> {
    const alreadyHaveAnswers = await this.getAnswers(createAnswersDto.user);

    if (alreadyHaveAnswers.length > 0) Answer.softRemove(alreadyHaveAnswers);

    const _answers = createAnswersDto.answers.map((_a) => {
      return {
        value: _a.value,
        question_id: _a.id,
        user_id: createAnswersDto.user,
      };
    });

    const _save = Answer.create(_answers);

    await Answer.save(_save);
    return;
  }

  public async getUserAnswers(user: UUIDVersion) {
    return await Answer.createQueryBuilder('ans')
      .where({ user_id: user })
      .select(['ans.value As answer', 'questions.value As question'])
      .leftJoin('ans.question', 'questions')
      .getRawMany();
  }

  public async validateUserAnswers(answers: CreateAnswersDto) {
    for await (const _ans of answers.answers) {
      const isValidAns = await Answer.findOne({
        where: {
          user_id: answers.user,
          question_id: _ans.id,
          value: _ans.value,
        },
      });
      if (!isValidAns) throwException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
