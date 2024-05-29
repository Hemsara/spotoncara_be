import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { AlterNotifyDto } from './dto/alter-notify.dto';
import { OnesignalService } from 'src/onesignal/onesignal.service';
import { NotifyPendingDTO } from './dto/notify-pending.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotifyService {
  constructor(
    private readonly onesignalService: OnesignalService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleCron() {
    try {
      await this.prisma.tbl_DriverNotifications.deleteMany({});
    } catch (err) {}
  }

  async notifyPending(dto: NotifyPendingDTO) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const pendingCount = await this.prisma.tbl_BookingDetails.count({
        where: {
          JobStatus: 0,
          IsPublish: true,

          DriverPk: BigInt(dto.dvrPk),
        },
      });

      if (pendingCount == 0) {
        return { message: 'No pending jobs' };
      }

      const contents = {
        en: `You’ve got ${pendingCount} pending jobs today. Please review and accept them promptly!`,
      };

      const response = await this.onesignalService.sendMessage(contents, [
        dto.dvrPk,
      ]);
      return response ? { errors: response } : { success: true };
    } catch (err) {}
  }
  async alterNotify(dto: AlterNotifyDto) {
    try {
      const fieldMap = {
        0: 'Customer information',
        1: 'Passenger contact information',
        2: 'Pickup address',
        3: 'Drop off address',
        4: 'Pickup date and time',
        5: 'Flight/Cruise number',
        6: 'Driver comments',
        7: 'Payment info',
        8: 'Child seat count',
      };

      const changedFields = dto.codes.map((code) => fieldMap[code]);
      const changedFieldsStr = changedFields.join(', ');
      const booking = await this.prisma.tbl_BookingDetails.findFirst({
        where: {
          BookPk: BigInt(dto.bookPk),
        },
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      let message = `Please be informed that the ${changedFieldsStr} of your booking ${booking.BookRefNo} have been updated.`;
      const contents = { en: message };

      await this.onesignalService.sendMessage(contents, [
        booking.DriverPk.toString(),
      ]);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        console.error('Error altering notification:', err);
        throw new InternalServerErrorException(
          'An error occurred while processing the notification.',
        );
      }
    }
  }
  async create(createNotifyDto: CreateNotifyDto) {
    try {
      const contents = { en: createNotifyDto.message };

      const response = await this.onesignalService.sendMessage(
        contents,
        createNotifyDto.driverPK,
      );
      return response ? { errors: response } : { success: true };
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while processing the notification.',
      );
    }
  }
}
