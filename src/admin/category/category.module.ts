import { Module } from '@nestjs/common';
import { AdminCategoryService } from './category.service';
import { AdminCategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AdminCategoryService, PrismaService],
  controllers: [AdminCategoryController]
})
export class AdminCategoryModule { }
