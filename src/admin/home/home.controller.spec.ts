import { Test, TestingModule } from '@nestjs/testing';
import { AdminHomeController } from './home.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminOrderService } from '../order/order.service';
import { AdminBookService } from '../book/book.service';
import { AdminUserSerivce } from '../users/user.service';
import { AdminReviewService } from '../reviews/review.service';

describe('AdminHomeController', () => {
  let controller: AdminHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminOrderService,
        AdminBookService,
        AdminReviewService,
        AdminUserSerivce,
        PrismaService],
      controllers: [AdminHomeController],
    }).compile();

    controller = module.get<AdminHomeController>(AdminHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
