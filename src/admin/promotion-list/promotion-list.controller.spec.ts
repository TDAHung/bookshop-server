import { Test, TestingModule } from '@nestjs/testing';
import { AdminPromotionListController } from './promotion-list.controller';

describe('AdminPromotionListController', () => {
  let controller: AdminPromotionListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPromotionListController],
    }).compile();

    controller = module.get<AdminPromotionListController>(AdminPromotionListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
