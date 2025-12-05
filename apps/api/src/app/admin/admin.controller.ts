import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import type { AuthRole } from '../mocks/mock-data';
import { AdminService } from './admin.service';
import { DummySessionGuard } from '../common/dummy-auth/dummy-session.guard';
import { DummyRolesGuard } from '../common/dummy-auth/roles.guard';
import { Roles } from '../common/dummy-auth/roles.decorator';

@Controller('admin')
@UseGuards(DummySessionGuard, DummyRolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Roles('ADMIN')
  getUsers(@Query('role') role?: AuthRole) {
    return this.adminService.getUsers(role);
  }
}

