import { AdminUserSerivce } from './../users/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './serializer/session.serializer';

describe('AdminAuthService', () => {
  let service: AdminAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthService, AdminUserSerivce, PrismaService, SessionSerializer, LocalStrategy],
    }).compile();

    service = module.get<AdminAuthService>(AdminAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
