import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';
import { ApiOKResponse } from 'src/utils/utils.service';

export class GetQuestionsDto {
  @ApiProperty({ description: 'id of the question', type: 'bigint' })
  @IsNumberString()
  id: bigint;

  @ApiProperty({ description: 'text of the question', type: 'string' })
  @IsString()
  value: string;
}

export const GetQuestionsApiResponse = applyDecorators(
  ApiOkResponse({
    description: 'Returns 200 with empty of questions body [{id:"",value:""}]',
    type: ApiOKResponse,
  }),
);
