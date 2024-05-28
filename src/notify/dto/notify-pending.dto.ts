import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class NotifyPendingDTO {
  @IsString()
  @ApiProperty()
  dvrPk: string;
}
