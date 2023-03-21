import { Body, Controller, Post } from '@nestjs/common';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Post('login2')
  async login2(@Body() article: CreateArticleDto) {
    return {
      message: 'Login HEHE',
      data: article,
    };
  }
}
