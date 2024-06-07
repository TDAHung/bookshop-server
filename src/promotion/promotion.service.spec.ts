import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from './promotion.service';
import { PrismaService } from 'src/prisma.service';

describe('PromotionService', () => {
  let service: PromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionService, PrismaService],
    }).compile();

    service = module.get<PromotionService>(PromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
