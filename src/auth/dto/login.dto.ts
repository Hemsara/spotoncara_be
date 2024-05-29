import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @ApiProperty()

  email: string;

  @IsString({ message: 'Please enter a valid password' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @ApiProperty()

  password: string;
}