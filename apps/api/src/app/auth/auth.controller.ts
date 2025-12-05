import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { MockUser } from '../mocks/mock-data';
import { AuthService } from './auth.service';
import { DummySessionGuard } from '../common/dummy-auth/dummy-session.guard';
import { DummyRolesGuard } from '../common/dummy-auth/roles.guard';

interface LogoutDto {
  allDevices?: boolean;
}

interface MagicLinkRequestDto {
  email?: string;
  redirectUrl?: string;
}

interface MagicLinkConsumeDto {
  token: string;
  ttl?: string;
  redirectUrl?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('magic-link/request')
  requestMagicLink(@Body() body: MagicLinkRequestDto) {
    return this.authService.requestMagicLink(body.email);
  }

  @Post('magic-link/consume')
  consumeMagicLink(@Body() body: MagicLinkConsumeDto, @Res({ passthrough: true }) res: Response) {
    const ttlValue = Number(body.ttl);
    const ttlMinutes = Number.isFinite(ttlValue) ? ttlValue : undefined;
    const result = this.authService.consumeMagicLink(body.token, ttlMinutes);
    res.cookie('sb_session', result.session.sessionId, { httpOnly: true, sameSite: 'lax' });

    return {
      session: result.session,
      redirectUrl: body.redirectUrl ?? result.redirectUrl,
    };
  }

  @UseGuards(DummySessionGuard)
  @Get('session')
  getSession(
    @Req() req: Request & { user?: MockUser },
    @Res({ passthrough: true }) res: Response,
    @Query('ttl') ttl?: string,
  ) {
    const ttlValue = Number(ttl);
    const ttlMinutes = Number.isFinite(ttlValue) ? ttlValue : undefined;
    const payload = this.authService.getSession(req.user as MockUser, ttlMinutes);
    res.cookie('sb_session', payload.sessionId, { httpOnly: true, sameSite: 'lax' });

    return payload;
  }

  @UseGuards(DummySessionGuard, DummyRolesGuard)
  @Post('logout')
  logout(@Body() body: LogoutDto, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('sb_session');
    return {
      status: 'ok',
      allDevices: Boolean(body?.allDevices),
      message: body?.allDevices ? 'All dummy sessions cleared.' : 'Current dummy session cleared.',
    };
  }

  @UseGuards(DummySessionGuard, DummyRolesGuard)
  @Post('token/refresh')
  refresh(@Req() req: Request & { user?: MockUser }, @Res({ passthrough: true }) res: Response) {
    const data = this.authService.issueRefresh(req.user as MockUser);
    res.cookie('sb_session', data.sessionId, { httpOnly: true, sameSite: 'lax' });
    return data;
  }
}

