import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateNotifyDto {
  @IsString()
  @ApiProperty()
  message: string;


  @ApiProperty()
  @IsArray()
  @IsString({ each: true })

  driverPK: string[];
}
