import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { MeService } from './me.service';

@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  getRequestInfo(@Query('name') name: string | undefined, @Req() req: Request) {
    return this.meService.getRequestInfo(name, req);
  }
}
