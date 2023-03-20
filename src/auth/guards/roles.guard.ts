import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/role.enum';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(
      '🚀 ~ file: roles.guard.ts:15 ~ RolesGuard ~ canActivate ~ requiredRoles:',
      requiredRoles,
    );
    if (!requiredRoles) {
      console.log('No roles required');
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: roles.guard.ts:24 ~ RolesGuard ~ canActivate ~ user:',
      user,
    );
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
