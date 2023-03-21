import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //* Hàm này sẽ được gọi khi người dùng đăng nhập để kiểm tra thông tin đăng nhập có hợp lệ hay không
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  //TODO: Test lại hàm này sau khi đã có hàm mã hóa mật khẩu ở trên
  //* Hàm này sẽ được gọi khi người dùng đăng ký
  async register(user: CreateUserDto): Promise<any> {
    const { comfirmPassword, ...data } = user;
    console.log(data);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(
      '🚀 ~ file: auth.service.ts:31 ~ AuthService ~ register ~ hashedPassword:',
      hashedPassword,
    );
    const newUser = await this.userService.createUser({
      ...data,
      password: hashedPassword,
    });
    return newUser;
  }

  //* Hàm này sẽ được gọi khi người dùng đăng nhập thành công để trả về một access token cho người dùng đó dùng để xác thực các request tiếp theo
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      data: {
        payload,
      },
    };
  }
}
