import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { MeController } from './me.controller';
import { MeService, RequestInfo } from './me.service';

describe('MeController', () => {
  let controller: MeController;
  let service: MeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeController],
      providers: [MeService],
    }).compile();

    controller = module.get<MeController>(MeController);
    service = module.get<MeService>(MeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRequestInfo', () => {
    it('should call service with name and request', () => {
      const mockReq = {
        method: 'GET',
        originalUrl: '/api/v1/me?name=John',
        path: '/api/v1/me',
        query: { name: 'John' },
        headers: { host: 'localhost:3000' },
        body: {},
      } as Request;

      const expectedResult: RequestInfo = {
        name: 'John',
        request: {
          method: 'GET',
          url: '/api/v1/me?name=John',
          path: '/api/v1/me',
          query: { name: 'John' },
          headers: { host: 'localhost:3000' },
          body: {},
        },
      };

      jest.spyOn(service, 'getRequestInfo').mockReturnValue(expectedResult);

      const result = controller.getRequestInfo('John', mockReq);

      expect(service.getRequestInfo).toHaveBeenCalledWith('John', mockReq);
      expect(result).toEqual(expectedResult);
    });
  });
});
