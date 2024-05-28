import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';


import { ApiTags } from '@nestjs/swagger';

@Controller('bookings')
@ApiTags('Bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get("/history")
  findAllHistory() {
    return this.bookingsService.findHistory();
  }

  @Get('/active')
  findOne() {
    return this.bookingsService.findAllActive();
  }
}
