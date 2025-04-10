import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateAnswersDto, GetAnswersDto } from 'src/answers/dto/create-answers.dto';
import { GetUploadsApiSwaggerDocs } from 'src/uploads/dto/get-upload.dto';
import { AuthService } from './auth.service';
import {
  AuthLoginAdminDto,
  AuthLoginDto,
  UserLoginApiSwaggerDocs,
} from './dto/auth-login.dto';
import { ROLES, Roles } from './entities/roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @applyDecorators(Post(), ApiTags('User Login'), UserLoginApiSwaggerDocs)
  async validateUserPassword(
    @Res() res: Response,
    @Body() authLoginDto: AuthLoginDto,
  ) {
    const data = await this.authService.validateUserPassword(authLoginDto);
    return res.status(data.statusCode).send(data);
  }

  @applyDecorators(
    Get('/questions'),
    ApiTags('User Login'),
    GetUploadsApiSwaggerDocs,
    Roles(ROLES.PENDING_AUTH),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
  )
  getUserSecurityQuestions(@Request() req) {
    return this.authService.getUserSecurityQuestions(req.user.uuid);
  }

  @applyDecorators(
    Post('/answers'),
    ApiTags('User Login'),
    UserLoginApiSwaggerDocs,
    Roles(ROLES.PENDING_AUTH),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
  )
  async securityQuestionAnswers(
    @Request() req,
    @Res() res: Response,
    @Body() getAnswersDto: GetAnswersDto,
  ) {

    let _answers: any = getAnswersDto;
    _answers.user = req.user.uuid;
    const data = await this.authService.securityQuestionAnswers(
      _answers,
    );
    return res.status(data.statusCode).send(data);
  }

  @Post('/admin')
  @ApiTags('Admin Login')
  async loginAdmin(@Body() authLoginAdminDto: AuthLoginAdminDto) {
    return this.authService.loginAdmin(authLoginAdminDto);
  }
}
