import { Test, TestingModule } from '@nestjs/testing';
import { AdminBookController } from './book.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminCategoryService } from '../category/category.service';
import { AdminBookCategoryService } from '../book_category/book_category.service';
import { AdminAuthorService } from '../author/author.service';
import { AdminReviewService } from '../reviews/review.service';
import { AdminPromotionListService } from '../promotion-list/promotion-list.service';
import { AwsService } from '../aws/aws.service';
import { AdminBookService } from './book.service';

describe('AdminBookController', () => {
  let controller: AdminBookController;
  let adminBookService: AdminBookService;
  let awsService: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        AdminBookService,
        AdminCategoryService,
        AdminBookCategoryService,
        AdminAuthorService,
        AdminReviewService,
        AdminPromotionListService,
        AwsService
      ],
      controllers: [AdminBookController],
    }).compile();

    controller = module.get<AdminBookController>(AdminBookController);
    adminBookService = module.get<AdminBookService>(AdminBookService);
    awsService = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const mockFiles = [
        {
          fieldname: 'fieldname',
          encoding: 'utf-8',
          mimetype: 'image/jpeg',
          originalname: 'mockFile.jpg',
          size: 1024,
          buffer: Buffer.from(''),
          stream: null,
          destination: '/tmp',
          filename: 'mockFile.jpg',
          path: '/tmp/mockFile.jpg',
        }
      ];

      const mockParams = {
        title: 'Mock Book',
        price: '10',
        description: 'Mock Description',
        quantity: '5',
        discount: '0',
        categories: ['1', '2'],
        authors: ['1', '2'],
      };
      const mockResponse = { redirect: jest.fn() };

      const uploadSpy = jest.spyOn(awsService, 'uploadFileToPublicBucket').mockImplementation(async () => {
        return {
          url: 'mockedImageUrl',
          key: 'mockedKey',
          name: 'mockedName',
          size: 1024
        };
      });
      const mockBookData = {
        id: 1,
        title: 'Mock Book',
        description: 'Mock Description',
        price: 10,
        images: [],
        discount: 0,
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        promotionId: 0,
      };
      const createSpy = jest.spyOn(adminBookService, 'create').mockResolvedValueOnce(mockBookData);

      await controller.createBook(mockFiles, mockParams, mockResponse);

      expect(uploadSpy).toHaveBeenCalledTimes(mockFiles.length);

      expect(createSpy).toHaveBeenCalledWith({
        title: mockParams.title,
        price: parseFloat(mockParams.price),
        description: mockParams.description,
        quantity: parseFloat(mockParams.quantity),
        discount: parseFloat(mockParams.discount),
        categories: {
          create: mockParams.categories.map((categoryId: string) => ({
            category: { connect: { id: parseInt(categoryId) } }
          })),
        },
        authors: {
          create: mockParams.authors.map((authorId: string) => ({
            author: { connect: { id: parseInt(authorId) } }
          })),
        },
        images: [
          {
            url: 'mockedImageUrl',
            key: 'mockedKey',
            name: 'mockedName',
            size: 1024
          }
        ],
      });

      expect(mockResponse.redirect).toHaveBeenCalledWith('/books');
    });
  })
});
