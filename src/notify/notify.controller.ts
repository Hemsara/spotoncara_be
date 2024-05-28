import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';
import { ApiTags } from '@nestjs/swagger';
import { NotifyPendingDTO } from './dto/notify-pending.dto';

@ApiTags('Notifications')
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
}
