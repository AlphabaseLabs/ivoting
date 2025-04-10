import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  applyDecorators,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CreateUserApi,
  CreateUserApiSwaggerDocs,
  VerifyPhoneNumberApi,
  VerifyPhonenNrApiSwaggerDocs,
} from './dto/create-user.dto';
import { Response } from 'express';
import {
  CreateUploadApiDto,
  UploadFilesApiSwaggerDocs,
} from 'src/uploads/dto/create-upload.dto';

import fastify = require('fastify');
import { throwException } from 'src/utils/utils.service';
import {
  CreateAnswersApiSwaggerDocs,
  CreateAnswersDto,
} from 'src/answers/dto/create-answers.dto';
import { GetUserApiSwaggerDocs } from './dto/get-user.dto';
import { UUIDVersion } from 'class-validator';
import { GetUploadsApiSwaggerDocs } from 'src/uploads/dto/get-upload.dto';
import {
  ApproveUserApiDto,
  ApproveUserApiSwaggerDocs,
} from './dto/approve-user.dto';
import {
  ResetPasswordApiSwaggerDocs,
  resetPasswordApi,
} from './dto/reset-password.dto';
import { ROLES, Roles } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @applyDecorators(
    Post(),
    ApiTags('User Registration'),
    CreateUserApiSwaggerDocs,
  )
  async create(@Res() res: Response, @Body() createUserApi: CreateUserApi) {
    const data: any = await this.usersService.create(createUserApi);
    return res.status(data.statusCode).send(data);
  }

  @applyDecorators(
    Patch('/verify/phone'),
    ApiTags('User Registration'),
    VerifyPhonenNrApiSwaggerDocs,
  )
  async verifyPhoneNumber(
    @Res() res: Response,
    @Body() verifyPhoneNumberApi: VerifyPhoneNumberApi,
  ) {
    const data: any = await this.usersService.verifyPhoneNumber(
      verifyPhoneNumberApi,
    );
    res.status(data.statusCode).send(data);
  }

  @applyDecorators(
    Put('/answers'),
    ApiTags('User Registration'),
    CreateAnswersApiSwaggerDocs,
  )
  public async saveAnswers(@Body() createAnswersDto: CreateAnswersDto) {
    return this.usersService.saveAnswers(createAnswersDto);
  }

  @applyDecorators(
    Put('/uploads'),
    ApiTags('User Registration'),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'multipart/formdata request',
      required: true,
      type: CreateUploadApiDto,
    }),
    UploadFilesApiSwaggerDocs,
  )


  uploadFile(@Req() req: fastify.FastifyRequest, @Body() createUploadApiDto) {
    if (
      !req.isMultipart() ||
      !createUploadApiDto.selfie ||
      !createUploadApiDto.user
    )
      throwException('NOT_IMPLEMENTED', HttpStatus.NOT_IMPLEMENTED);

    return this.usersService.uploadImages(createUploadApiDto);
  }

  @applyDecorators(
    Post('/reset/password'),
    ApiTags('Reset Password'),
    ResetPasswordApiSwaggerDocs,
  )
  async resetPassword(@Res() res: Response, @Body() body: resetPasswordApi) {
    const data = await this.usersService.resetPassword(body);
    return res.status(data.statusCode).send(data);
  }

  @applyDecorators(
    Patch(':user/approve'),
    ApiTags('User Management'),
    ApproveUserApiSwaggerDocs,
    Roles(ROLES.ADMIN),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
  )
  public async approve(
    @Param('user', ParseUUIDPipe) user: UUIDVersion,
    @Body() approveUserApiDto: ApproveUserApiDto,
  ) {
    return this.usersService.approve(user, approveUserApiDto);
  }

  // @applyDecorators(
  //   Patch('/:user/submit'),
  //   ApiTags('User Registration'),
  //   GetUserApiSwaggerDocs
  // )
  // public async submitProfile(@Param('user', ParseUUIDPipe) user: UUIDVersion) {
  //   return this.usersService.submitProfile(user);
  // }

  @applyDecorators(
    Get(),
    ApiTags('Get All Users'),
    Roles(ROLES.ADMIN),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard)
  )
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('passport') passport,
    @Query('identity') identity,
  ) {
    return this.usersService.getUsers({ page, limit }, passport, identity);
  }

  @applyDecorators(
    Get(':user'),
    ApiTags('Get User'),
    GetUserApiSwaggerDocs,
    Roles(ROLES.ADMIN, ROLES.USER),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard)
  )
  getUserWithUUID(@Param('user', ParseUUIDPipe) user: UUIDVersion) {
    return this.usersService.getUser(user);
  }

  @applyDecorators(
    Get('/details'),
    ApiTags('Get User'),
    GetUserApiSwaggerDocs,
    Roles(ROLES.USER),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard)
  )
  getUser(
    @Request() req,
  ) {
    return this.usersService.getUserDetails(req.user.uuid);
  }


  @applyDecorators(
    Get(':user/status'),
    ApiTags('Get User'),
    GetUserApiSwaggerDocs,
    Roles(ROLES.ADMIN, ROLES.USER),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard)
  )
  getUserStatus(@Param('user', ParseUUIDPipe) user: UUIDVersion) {
    return this.usersService.getUserStatus(user);
  }

  @applyDecorators(
    Get(':user/answers'),
    ApiTags('Get Answers'),
    GetUserApiSwaggerDocs,
    Roles(ROLES.ADMIN),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard)
  )
  getUserAnswers(@Param('user', ParseUUIDPipe) user: UUIDVersion) {
    return this.usersService.getUserAnswers(user);
  }

  @applyDecorators(
    Get(':user/uploads'),
    ApiTags('Uploads'),
    GetUploadsApiSwaggerDocs,
    Roles(ROLES.ADMIN),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard)

  )
  getUploads(@Param('user', ParseUUIDPipe) user: UUIDVersion) {
    return this.usersService.getUploads(user);
  }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // //   return this.usersService.update(+id, updateUserDto);
  // // }

  // // @Delete(':id')
  // // remove(@Param('id') id: string) {
  // //   return this.usersService.remove(+id);
}
