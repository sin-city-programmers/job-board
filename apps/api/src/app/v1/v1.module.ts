import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { HelloModule } from './hello/hello.module';
import { MeModule } from './me/me.module';

@Module({
  imports: [
    HelloModule,
    MeModule,
    RouterModule.register([
      {
        path: 'v1',
        children: [
          { path: 'hello', module: HelloModule },
          { path: 'me', module: MeModule },
        ],
      },
    ]),
  ],
})
export class V1Module {}
