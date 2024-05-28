import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { NotifyModule } from './notify/notify.module';
import { OnesignalService } from './onesignal/onesignal.service';
import { DriversModule } from './drivers/drivers.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [ConfigModule.forRoot(), NotifyModule, DriversModule, BookingsModule],

  controllers: [AppController],
  providers: [AppService, PrismaService, OnesignalService],
})
export class AppModule {}
