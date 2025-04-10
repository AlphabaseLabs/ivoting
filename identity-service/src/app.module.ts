import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionService } from './questions/questions.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionService],
})
export class AppModule {}
