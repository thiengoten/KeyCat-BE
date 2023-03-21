import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<any> {
    const test = await this.authService.register(data);
    if (test) {
      return {
        message: 'Register Success',
        data: test,
      };
    }
  }

  @Post('login')
  async login(@Body() createUserDto: any) {
    return this.authService.login(createUserDto);
  }
}
