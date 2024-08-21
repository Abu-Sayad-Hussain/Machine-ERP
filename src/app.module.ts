import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MachineModule } from './machine/machine.module';
import { typeOrmConfig } from './config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    MachineModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}