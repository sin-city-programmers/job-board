import { Injectable } from '@nestjs/common';
import { mockSessions, mockUsers, type AuthRole, type MockSessionPayload, type MockUser } from '../../mocks/mock-data';

const FALLBACK_EXPIRY_MINUTES = mockSessions.defaultTtlMinutes;
const MAGIC_TOKEN_PREFIX = 'magic-token-';

@Injectable()
export class DummySessionService {
  getDefaultUser(): MockUser {
    return mockUsers[0];
  }

  getUserById(userId?: string): MockUser | undefined {
    if (!userId) {
      return undefined;
    }
    return mockUsers.find((user) => user.id === userId);
  }

  getUserByRole(role?: string): MockUser {
    if (!role) {
      return this.getDefaultUser();
    }
    const normalized = role.toUpperCase() as AuthRole;
    return mockUsers.find((user) => user.role === normalized) ?? this.getDefaultUser();
  }

  getUserByEmail(email?: string): MockUser | undefined {
    if (!email) {
      return undefined;
    }
    const normalized = email.trim().toLowerCase();
    return mockUsers.find((user) => user.email.toLowerCase() === normalized);
  }

  buildSessionPayload(user: MockUser, ttlMinutes = FALLBACK_EXPIRY_MINUTES): MockSessionPayload {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + ttlMinutes);

    return {
      user,
      role: user.role,
      memberships: user.memberships,
      sessionId: `sess_${user.id}_${Math.random().toString(36).slice(2, 8)}`,
      expiresAt: expires.toISOString(),
    };
  }

  issueMagicToken(user: MockUser, ttlMinutes = FALLBACK_EXPIRY_MINUTES) {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + ttlMinutes);
    return {
      token: `${MAGIC_TOKEN_PREFIX}${user.id}_${Math.random().toString(36).slice(2, 6)}`,
      expiresAt: expires.toISOString(),
    };
  }

  consumeMagicToken(token?: string): MockUser | undefined {
    if (!token?.startsWith(MAGIC_TOKEN_PREFIX)) {
      return undefined;
    }
    const userId = token.slice(MAGIC_TOKEN_PREFIX.length).split('_')[0];
    return this.getUserById(userId);
  }
}

