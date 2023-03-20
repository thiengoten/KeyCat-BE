import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //TODO: Test laij controller này sau khi đã có hàm mã hóa mật khẩu
  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDTO) {
    return this.authService.login(createUserDto);
  }
}
