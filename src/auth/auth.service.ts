import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDTO } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginUser(dto: LoginDTO) {
    // * Check if a user exist with the given email
    const userExist = await this.prisma.tbl_AccountsLogin.findFirst({
      where: {
        AccUserName: dto.email,
      },
    });

    // * If user not found, throw NotFoundException
    if (!userExist) {
      throw new NotFoundException('User under this email is not found');
    }

    //* Generate JWT token
    const payload = {
      sub: userExist.AccUserPk.toString(),
      username: userExist.AccUserName,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
