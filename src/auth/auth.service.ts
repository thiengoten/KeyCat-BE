import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
  async register(user: any) {
    //* Trong dự án này, mật khẩu được mã hóa bằng bcrypt trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });
    //?Trả về một đối tượng user mới mà không có mật khẩu
    // const { password, ...result } = newUser;
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
