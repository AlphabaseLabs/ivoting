import { SetMetadata } from '@nestjs/common';

export enum ROLES {
  ADMIN,
  USER,
  PENDING_AUTH,
}

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);
