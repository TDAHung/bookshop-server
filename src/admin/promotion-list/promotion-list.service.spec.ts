import { Test, TestingModule } from '@nestjs/testing';
import { AdminPromotionListService } from './promotion-list.service';
import { PrismaService } from 'src/prisma.service';

describe('AdminPromotionListService', () => {
  let service: AdminPromotionListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPromotionListService, PrismaService],
    }).compile();

    service = module.get<AdminPromotionListService>(AdminPromotionListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
