import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { DummySessionService } from './dummy-session.service';
import type { MockUser } from '../../mocks/mock-data';

@Injectable()
export class DummySessionGuard implements CanActivate {
  constructor(private readonly dummySession: DummySessionService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { user?: MockUser }>();
    const user = this.resolveUser(req);

    if (!user) {
      throw new UnauthorizedException('Dummy session not found. Provide x-demo-user or x-demo-role header.');
    }

    req.user = user;
    return true;
  }

  private resolveUser(req: Request): MockUser | undefined {
    const userId = (req.headers['x-demo-user'] as string | undefined) ?? (req.query['userId'] as string | undefined);
    if (userId) {
      return this.dummySession.getUserById(userId);
    }
    const roleHeader = (req.headers['x-demo-role'] as string | undefined) ?? (req.query['role'] as string | undefined);
    return this.dummySession.getUserByRole(roleHeader);
  }
}

