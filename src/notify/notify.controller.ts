import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotifyPendingDTO } from './dto/notify-pending.dto';
import { SpotOnAuthGuard } from 'src/middleware/auth.guars';
import { AlterNotifyDto } from './dto/alter-notify.dto';


@ApiTags('Notifications')
@ApiBearerAuth()
// @UseGuards(SpotOnAuthGuard)
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  create(@Body() createNotifyDto: CreateNotifyDto) {
    return this.notifyService.create(createNotifyDto);
  }
  @Post("/pending")
  notifyPending(@Body() dto: NotifyPendingDTO) {
    return this.notifyService.notifyPending(dto);
  }
  @Post("/alter")
  notifyChanges(@Body() dto: AlterNotifyDto) {
    return this.notifyService.alterNotify(dto);
  }
  @Post("/publish")
  publishBookings(@Body() dto: AlterNotifyDto) {
    return this.notifyService.alterNotify(dto);
  }
}
