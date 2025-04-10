import { Controller, Get, Res, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetQuestionsApiResponse } from './dto/get-question.dto';
import { QuestionService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionService) {}

  @applyDecorators(Get(), ApiTags('Get Questions'), GetQuestionsApiResponse)
  async get(@Res() res: Response) {
    const data = await this.questionService.getRandomQuestions();
    return res.status(data.statusCode).send(data);
  }
}
