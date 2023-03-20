import { Controller, Get, Post, Req, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Role } from './auth/roles/role.enum';
import { Roles } from './auth/roles/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private appService: AppService,
  ) {}

  //   @UseGuards(LocalAuthGuard)
  //   @Post('auth/login')
  //   login(@Request() req): any {
  //     return this.authService.login(req.user);
  //   }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.USER, Role.ADMIN)
  //   @Get('user')
  //   getHello(@Request() req) {
  //     return req.user;
  //   }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.ADMIN)
  //   @Get('admin')
  //   getHelloAdmin(@Request() req) {
  //     return req.user;
  //   }
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
