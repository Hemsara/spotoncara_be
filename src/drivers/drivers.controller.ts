import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('drivers')
@ApiTags('Drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}


  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  

  
}
