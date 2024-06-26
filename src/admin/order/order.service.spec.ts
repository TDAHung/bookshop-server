import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';

describe('AdminOrderService', () => {
  let service: AdminOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminOrderService, PrismaService],
    }).compile();

    service = module.get<AdminOrderService>(AdminOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
