import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DummySessionService } from '../common/dummy-auth/dummy-session.service';
import { DummySessionGuard } from '../common/dummy-auth/dummy-session.guard';
import { DummyRolesGuard } from '../common/dummy-auth/roles.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DummySessionService, DummySessionGuard, DummyRolesGuard],
  exports: [DummySessionService, DummySessionGuard, DummyRolesGuard],
})
export class AuthModule {}

