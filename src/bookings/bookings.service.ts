import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  async findAllActive() {
    try {
      var data = await this.prisma.tbl_BookingDetails.findMany({
        where: {
          JobStatus: {
            in: [2, 3, 4],
          },
        },
        orderBy: [
          {
            BookPickUpDt: 'desc',
          },
        ],

        select: {
          DriverName: true,
          BookRefNo: true,
          DriverContact: true,
          JobStatus: true,
        },
        take: 20,
      });

      return {
        success: true,
        message: 'Payment created successfully.',
        data: toObject(data),
      };
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new BadRequestException({
        success: false,
        message: 'Failed to create payment.',
        error: error.errors[0]['code'] || 'Unknown error',
      });
    }
  }

  async findHistory() {
    try {
      var data = await this.prisma.tbl_BookingDetails.findMany({
        where: {},
        orderBy: [
          {
            BookPickUpDt: 'desc',
          },
        ],

        select: {
          DriverName: true,
          BookRefNo: true,
          DriverContact: true,
          JobStatus: true,
          BookPickUpDt: true,
          BookPassengerNm: true,
        },

        take: 20,
      });

      return {
        success: true,
        message: 'Payment created successfully.',
        data: toObject(data),
      };
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new BadRequestException({
        success: false,
        message: 'Failed to create payment.',
        error: error.errors[0]['code'] || 'Unknown error',
      });
    }
  }
}
export function toObject(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  );
}
