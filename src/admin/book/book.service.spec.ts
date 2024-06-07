import { Test, TestingModule } from '@nestjs/testing';
import { AdminBookService } from './book.service';
import { PrismaService } from 'src/prisma.service';
import { AdminCategoryService } from '../category/category.service';
import { AdminBookCategoryService } from '../book_category/book_category.service';
import { AdminAuthorService } from '../author/author.service';
import { AdminReviewService } from '../reviews/review.service';
import { AdminPromotionListService } from '../promotion-list/promotion-list.service';
import { AwsService } from '../aws/aws.service';

describe('AdminBookService', () => {
  let service: AdminBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminBookService,
        PrismaService,
        AdminCategoryService,
        AdminBookCategoryService,
        AdminAuthorService,
        AdminReviewService,
        AdminPromotionListService,
        AwsService
      ],
    }).compile();

    service = module.get<AdminBookService>(AdminBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
