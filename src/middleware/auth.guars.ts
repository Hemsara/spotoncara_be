import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class SpotOnAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new HttpException(
          'Authorization header is missing',
          HttpStatus.UNAUTHORIZED,
        );
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
      }
  
      try {
        const decoded = await this.jwtService.verifyAsync(token, {
          secret: process.env.APCON_SECRET,
        });
  
        request['user'] = decoded;
        return true;
      } catch (error) {
        console.log(error);
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
  }
  