import { Injectable } from '@nestjs/common';
import { mockUsers } from '../mocks/mock-data';

@Injectable()
export class OrgsService {
  getMembershipsForUser(userId: string) {
    const user = mockUsers.find((entry) => entry.id === userId);
    if (!user) {
      return { memberships: [] };
    }
    return { memberships: user.memberships };
  }
}

