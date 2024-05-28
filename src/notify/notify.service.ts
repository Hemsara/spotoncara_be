import { Injectable } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';
import { OnesignalService } from 'src/onesignal/onesignal.service';
import { NotifyPendingDTO } from './dto/notify-pending.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotifyService {
  constructor(
    private readonly onesignalService: OnesignalService,
    private readonly prisma: PrismaService,
  ) {}



  async notifyPending(dto: NotifyPendingDTO) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const pendingCount = await this.prisma.tbl_BookingDetails.count({
        where: {
          JobStatus: {
            in: [0],
          },

          BookPickupDtTime: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      // if (pendingCount == 0) {
      //   return { message: 'No pending jobs' };
      // }

      const contents = {
        en: `You’ve got ${pendingCount} pending jobs today. Please review and accept them promptly!`,
      };

      const response = await this.onesignalService.sendMessage(contents, [
        dto.dvrPk,
      ]);
      return response ? { errors: response } : { success: true };
    } catch (err) {}
  }

  async create(createNotifyDto: CreateNotifyDto) {
    try {
      const contents = { en: createNotifyDto.message };

      const response = await this.onesignalService.sendMessage(
        contents,
        createNotifyDto.driverPK,
      );
      return response ? { errors: response } : { success: true };
    } catch (err) {}
  }
}
