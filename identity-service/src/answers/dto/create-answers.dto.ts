import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsUUID,
  UUIDVersion,
  ValidateNested,
} from 'class-validator';
import { configService } from 'src/config/config.service';
import { GetQuestionsDto } from 'src/questions/dto/get-question.dto';
import { UserApiErrors } from 'src/users/dto/errors-user.dto';
import { ApiOKResponse } from 'src/utils/utils.service';

export class CreateAnswersDto {
  @ApiProperty({ required: true, description: 'user uuid', type: 'array' })
  @IsUUID()
  user: UUIDVersion;

  @ApiProperty({ required: true, description: 'answers', type: 'array' })
  @IsArray()
  @ArrayMaxSize(configService.getNumberOfQuestionsToAsk())
  @ArrayMinSize(configService.getNumberOfQuestionsToAsk())
  @ValidateNested({ each: true })
  @Type(() => GetQuestionsDto)
  answers: GetQuestionsDto[];
}

export class GetAnswersDto {
  @ApiProperty({ required: true, description: 'answers', type: 'array' })
  @IsArray()
  @ArrayMaxSize(configService.getNumberOfQuestionsToAsk())
  @ArrayMinSize(configService.getNumberOfQuestionsToAsk())
  @ValidateNested({ each: true })
  @Type(() => GetQuestionsDto)
  answers: GetQuestionsDto[];
}

export const CreateAnswersApiSwaggerDocs = applyDecorators(
  ApiCreatedResponse(),
  ApiNotFoundResponse({
    description: `When user is not found Errors: ${JSON.stringify(
      UserApiErrors[HttpStatus.NOT_FOUND].USER_NOT_FOUND,
    )}`,
    type: ApiOKResponse,
  }),
);
