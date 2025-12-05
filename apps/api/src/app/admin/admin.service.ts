import { Injectable } from '@nestjs/common';
import { mockUsers, type AuthRole } from '../mocks/mock-data';

@Injectable()
export class AdminService {
  getUsers(filterRole?: AuthRole) {
    const trimmedRole = filterRole?.toUpperCase() as AuthRole | undefined;

    const items = mockUsers
      .filter((user) => (trimmedRole ? user.role === trimmedRole : true))
      .map((user) => ({
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
        memberships: user.memberships,
      }));

    return {
      items,
      pageInfo: {
        total: items.length,
      },
    };
  }
}

