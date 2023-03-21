import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
