import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrgsModule } from './orgs/orgs.module';

@Module({
  imports: [AuthModule, AdminModule, OrgsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
