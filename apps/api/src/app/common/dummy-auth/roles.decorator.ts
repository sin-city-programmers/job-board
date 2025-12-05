import { SetMetadata } from '@nestjs/common';
import type { AuthRole } from '../../mocks/mock-data';

export const ROLES_KEY = 'dummy-auth-roles';
export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles);

