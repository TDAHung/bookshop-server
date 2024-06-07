import { Test, TestingModule } from '@nestjs/testing';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('BookResolver', () => {
  let resolver: BookResolver;
  let service: BookService;
  const mockBook = {
    id: 1,
    title: 'Test Book',
    description: 'Test Description',
    price: 10,
    images: [{
      url: 'imageUrl',
      key: 'imageKey',
      size: 12314,
      name: 'imageName'
    }, {

    }],
    discount: 0,
    quantity: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    promotionId: 1,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookResolver, BookService, PrismaService],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('get a book', () => {
    it('should return a book', async () => {
      jest.spyOn(resolver, 'findOne').mockResolvedValue(mockBook);
      const result = await resolver.findOne(mockBook.id.toString());
      expect(result).toEqual(mockBook);
      expect(resolver.findOne).toHaveBeenCalledWith(mockBook.id.toString());
    })

    it('should throw NotFoundException when no book is found', async () => {
      jest.spyOn(resolver, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(resolver.findOne(mockBook.id.toString())).rejects.toThrow(NotFoundException);
      expect(resolver.findOne).toHaveBeenCalledWith(mockBook.id.toString());
    })
  });

});
