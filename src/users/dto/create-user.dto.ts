import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/validators/password-matching.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Username is too short, minimum 5 characters' })
  username: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty()
  email: string;

  //* mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password too should include at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Password and confirm password do not match' })
  comfirmPassword: string;
}
