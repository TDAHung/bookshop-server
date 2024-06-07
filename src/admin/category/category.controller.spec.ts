import { Test, TestingModule } from '@nestjs/testing';
import { AdminCategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminCategoryService } from './category.service';

describe('AdminCategoryController', () => {
  let controller: AdminCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AdminCategoryService],
      controllers: [AdminCategoryController],
    }).compile();

    controller = module.get<AdminCategoryController>(AdminCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
