import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { QuestionService } from 'src/questions/questions.service';
import { AnswerService } from 'src/answers/answers.service';
import { Answer } from 'src/answers/entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: configService.getJWTSecret(),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    QuestionService,
    AnswerService,
    JwtStrategy,
  ],
})
export class AuthModule { }
