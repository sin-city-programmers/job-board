import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { MockUser } from '../mocks/mock-data';
import { OrgsService } from './orgs.service';
import { DummySessionGuard } from '../common/dummy-auth/dummy-session.guard';
import { DummyRolesGuard } from '../common/dummy-auth/roles.guard';
import { Roles } from '../common/dummy-auth/roles.decorator';

@Controller('orgs')
@UseGuards(DummySessionGuard, DummyRolesGuard)
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get('memberships')
  @Roles('ORG_USER', 'ADMIN')
  getMemberships(@Req() req: Request & { user?: MockUser }) {
    return this.orgsService.getMembershipsForUser(req.user?.id ?? '');
  }
}

