import { Test, TestingModule } from '@nestjs/testing';
import { AdminReviewController } from './review.controller';

describe('AdminReviewController', () => {
  let controller: AdminReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminReviewController],
    }).compile();

    controller = module.get<AdminReviewController>(AdminReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
