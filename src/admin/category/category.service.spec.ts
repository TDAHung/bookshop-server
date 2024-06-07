import { Test, TestingModule } from '@nestjs/testing';
import { AdminCategoryService } from './category.service';
import { PrismaService } from 'src/prisma.service';

describe('AdminCategoryService', () => {
  let service: AdminCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminCategoryService, PrismaService],
    }).compile();

    service = module.get<AdminCategoryService>(AdminCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
