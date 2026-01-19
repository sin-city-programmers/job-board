import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { MeService } from './me.service';

describe('MeService', () => {
  let service: MeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeService],
    }).compile();

    service = module.get<MeService>(MeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRequestInfo', () => {
    const createMockRequest = (overrides: Partial<Request> = {}): Request =>
      ({
        method: 'GET',
        originalUrl: '/api/v1/me?name=John',
        path: '/api/v1/me',
        query: { name: 'John' },
        headers: { host: 'localhost:3000' },
        body: {},
        ...overrides,
      }) as Request;

    it('should return request info with name', () => {
      const mockReq = createMockRequest();
      const result = service.getRequestInfo('John', mockReq);

      expect(result).toEqual({
        name: 'John',
        request: {
          method: 'GET',
          url: '/api/v1/me?name=John',
          path: '/api/v1/me',
          query: { name: 'John' },
          headers: { host: 'localhost:3000' },
          body: {},
        },
      });
    });

    it('should return request info with null name when name is undefined', () => {
      const mockReq = createMockRequest({
        originalUrl: '/api/v1/me',
        query: {},
      });
      const result = service.getRequestInfo(undefined, mockReq);

      expect(result.name).toBeNull();
    });

    it('should reflect POST request with body', () => {
      const mockReq = createMockRequest({
        method: 'POST',
        body: { data: 'test' },
      });
      const result = service.getRequestInfo('Test', mockReq);

      expect(result.request.method).toBe('POST');
      expect(result.request.body).toEqual({ data: 'test' });
    });
  });
});
