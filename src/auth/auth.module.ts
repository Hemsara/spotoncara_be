import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService , EncryptionService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.APCON_SECRET,
      signOptions: {
        algorithm: 'HS256', 
        expiresIn: process.env.JWT_EXPIRY, 
      },
    }),
  ],
})
export class AuthModule {}
