import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { MockSessionPayload, MockUser } from '../mocks/mock-data';
import { DummySessionService } from '../common/dummy-auth/dummy-session.service';

export interface MagicLinkRequestResult {
  status: 'queued';
  expiresAt: string;
  devToken?: string;
  previewUrl?: string;
  user: Pick<MockUser, 'id' | 'email' | 'role'>;
}

export interface MagicLinkConsumeResult {
  session: MockSessionPayload;
  redirectUrl: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly dummySession: DummySessionService) {}

  requestMagicLink(email?: string): MagicLinkRequestResult {
    const user = this.dummySession.getUserByEmail(email) ?? this.dummySession.getDefaultUser();
    const { token, expiresAt } = this.dummySession.issueMagicToken(user);
    return {
      status: 'queued',
      expiresAt,
      devToken: token,
      previewUrl: `/login?token=${token}`,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  consumeMagicLink(token: string, ttlMinutes?: number): MagicLinkConsumeResult {
    const user = this.dummySession.consumeMagicToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired magic link token');
    }
    const session = this.dummySession.buildSessionPayload(user, ttlMinutes);
    return {
      session,
      redirectUrl: '/dashboard',
    };
  }

  getSession(user: MockUser, ttlMinutes?: number): MockSessionPayload {
    return this.dummySession.buildSessionPayload(user, ttlMinutes);
  }

  issueRefresh(user: MockUser) {
    const payload = this.dummySession.buildSessionPayload(user);
    return {
      sessionId: payload.sessionId,
      expiresAt: payload.expiresAt,
    };
  }
}

