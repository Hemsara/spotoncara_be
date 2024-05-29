import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { NotifyModule } from './notify/notify.module';
import { OnesignalService } from './onesignal/onesignal.service';
import { DriversModule } from './drivers/drivers.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { EncryptionService } from './encryption/encryption.service';


@Module({
  imports: [ConfigModule.forRoot(), NotifyModule, DriversModule, BookingsModule, AuthModule],

  controllers: [AppController],
  providers: [AppService, PrismaService, OnesignalService, EncryptionService],
})
export class AppModule {}
