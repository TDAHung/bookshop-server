import { Module } from '@nestjs/common';
import { AdminBookService } from './book.service';
import { AdminBookController } from './book.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminCategoryService } from '../category/category.service';
import { AdminBookCategoryService } from '../book_category/book_category.service';
import { AwsService } from '../aws/aws.service';
import { AdminAuthorService } from '../author/author.service';
import { AdminReviewService } from '../reviews/review.service';
import { AdminPromotionListService } from '../promotion-list/promotion-list.service';

@Module({
  providers: [
    AdminBookService,
    PrismaService,
    AdminCategoryService,
    AdminBookCategoryService,
    AdminAuthorService,
    AdminReviewService,
    AdminPromotionListService,
    AwsService],
  controllers: [AdminBookController]
})
export class AdminBookModule { }
