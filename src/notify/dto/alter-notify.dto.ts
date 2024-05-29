import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class AlterNotifyDto {
  @IsNumber()
  @ApiProperty()
  bookPk: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  codes: number[];
}
