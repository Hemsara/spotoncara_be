import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { toObject } from 'src/bookings/bookings.service';

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    try {
      var data = await this.prisma.tbl_DriverDetails.findMany({
        select: {
          DvrFName: true,
          DvrLName: true,
          DvrContactNo: true,
          DvrEmailId: true,
          DvrLicNo: true,
          DvrPk: true,
        },
      });

      return {
        success: true,
        message: 'Drivers Fetched Successfully',
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
