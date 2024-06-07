import { Test, TestingModule } from '@nestjs/testing';
import { AdminReviewService } from './review.service';
import { PrismaService } from 'src/prisma.service';

describe('AdminReviewService', () => {
  let service: AdminReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminReviewService, PrismaService],
    }).compile();

    service = module.get<AdminReviewService>(AdminReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
