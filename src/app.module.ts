import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './machine/machine.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MachineModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
