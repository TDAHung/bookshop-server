import { Module } from '@nestjs/common';
import { AdminCategoryService } from './category.service';
import { AdminCategoryController } from './category.controller';

@Module({
  providers: [AdminCategoryService],
  controllers: [AdminCategoryController]
})
export class AdminCategoryModule { }
