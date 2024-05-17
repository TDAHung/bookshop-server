import { Module } from '@nestjs/common';
import { AdminBookCategoryService } from './book_category.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [AdminBookCategoryService, PrismaService],
})
export class AdminCategoryModule { }
