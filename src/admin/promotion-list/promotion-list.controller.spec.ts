import { Test, TestingModule } from '@nestjs/testing';
import { AdminPromotionListController } from './promotion-list.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminPromotionListService } from './promotion-list.service';

describe('AdminPromotionListController', () => {
  let controller: AdminPromotionListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPromotionListService, PrismaService],
      controllers: [AdminPromotionListController],
    }).compile();

    controller = module.get<AdminPromotionListController>(AdminPromotionListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
