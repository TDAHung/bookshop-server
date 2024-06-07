import { Test, TestingModule } from '@nestjs/testing';
import { AdminReviewController } from './review.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminReviewService } from './review.service';

describe('AdminReviewController', () => {
  let controller: AdminReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AdminReviewService],
      controllers: [AdminReviewController],
    }).compile();

    controller = module.get<AdminReviewController>(AdminReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
