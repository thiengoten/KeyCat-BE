import { Role } from 'src/auth/roles/role.enum';

export class CreateUserDTO {
  username: string;
  email: string;
  password: string;
  role?: Role = Role.USER;
}
