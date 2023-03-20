import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //* CRUD operations
  async findOne(userId: string): Promise<any | undefined> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  //TODO: Sau khi tạo xong hàm đăng ký, hãy test lại hàm này
  //   async getAllUsers() {
  //     return await this.prisma.user.findMany({
  //       where: {
  //         role: Role.USER,
  //       },
  //     });
  //   }

  //   async getUserById(userId: number) {
  //     return await this.prisma.user.findUnique({
  //       where: {
  //         userId,
  //       },
  //     });
  //   }

  async createUser(data) {
    return await this.prisma.user.create({
      data,
    });
  }

  //   async updateUser(userId: number, data) {
  //     return await this.prisma.user.update({
  //       where: {
  //         userId,
  //       },
  //       data,
  //     });
  //   }

  //   async deleteUser(userId: number) {
  //     return await this.prisma.user.delete({
  //       where: {
  //         userId,
  //       },
  //     });
  //   }
}
