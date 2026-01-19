import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
