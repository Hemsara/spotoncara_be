import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { OnesignalService } from 'src/onesignal/onesignal.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NotifyController],
  providers: [NotifyService, OnesignalService , PrismaService],
})
export class NotifyModule {}
