import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export interface RequestInfo {
  name: string | null;
  request: {
    method: string;
    url: string;
    path: string;
    query: Record<string, unknown>;
    headers: Record<string, unknown>;
    body: unknown;
  };
}

@Injectable()
export class MeService {
  getRequestInfo(name: string | undefined, req: Request): RequestInfo {
    return {
      name: name ?? null,
      request: {
        method: req.method,
        url: req.originalUrl,
        path: req.path,
        query: req.query as Record<string, unknown>,
        headers: req.headers as Record<string, unknown>,
        body: req.body,
      },
    };
  }
}
