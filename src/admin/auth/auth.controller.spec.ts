import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

describe('AdminAuthController', () => {
  let controller: AdminAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAuthController, PrismaService],
    }).compile();

    controller = module.get<AdminAuthController>(AdminAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
