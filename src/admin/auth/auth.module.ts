import { Module } from '@nestjs/common';
import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';
import { AdminUserSerivce } from '../users/user.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './serializer/session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthService,
    AdminUserSerivce,
    PrismaService,
    LocalStrategy,
    SessionSerializer
  ]
})
export class AdminAuthModule { }
