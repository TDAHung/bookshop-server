import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminOrderService } from './order.service';

describe('AdminOrderController', () => {
  let controller: AdminOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AdminOrderService],
      controllers: [AdminOrderController],
    }).compile();

    controller = module.get<AdminOrderController>(AdminOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
