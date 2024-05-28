import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TokenService } from './token.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthResolver, AuthService, TokenService, JwtService, PrismaService],
})
export class AuthModule { }
