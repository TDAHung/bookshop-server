import { Module } from '@nestjs/common';
import { AdminBookService } from './book.service';
import { AdminBookController } from './book.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminCategoryService } from '../category/category.service';
import { AdminBookCategoryService } from '../book_category/book_category.service';

@Module({
  providers: [AdminBookService, PrismaService, AdminCategoryService, AdminBookCategoryService],
  controllers: [AdminBookController]
})
export class AdminBookModule { }
