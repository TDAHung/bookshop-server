import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;
  let prisma: PrismaService;

  const mockBookService = {
    book: jest.fn(),
    books: jest.fn(),
  }

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
    }],
    discount: 0,
    quantity: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    promotionId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: PrismaService,
          useValue: mockBookService
        }],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('book', () => {
    it('should find and return a book by ID', async () => {
      jest.spyOn(service, 'book').mockResolvedValue(mockBook)

      const result = await service.book({
        where: {
          id: mockBook.id
        }
      });

      expect(service.book).toHaveBeenCalledWith({
        where: {
          id: mockBook.id
        }
      });
      expect(result).toEqual(mockBook);
    })

    it('should throw NotFoundException if book not found', async () => {
      const mockBookId = -10;
      jest.spyOn(service, 'book').mockRejectedValueOnce(new NotFoundException());

      await expect(service.book({ where: { id: mockBookId } })).rejects.toThrow(NotFoundException);
      expect(service.book).toHaveBeenCalledWith({
        where: {
          id: mockBookId
        }
      });
    });
  });

  describe('books', () => {
    it('should return an array of books', async () => {
      const findManyMock = jest.spyOn(service, 'books').mockResolvedValue([mockBook]);

      const query = { skip: 10, take: 10 };

      const result = await service.books(query);

      expect(findManyMock).toHaveBeenCalledWith({
        skip: query.skip,
        take: query.take,
        cursor: undefined,
        where: undefined,
        include: undefined,
        orderBy: undefined,
      });
      expect(result).toEqual([mockBook]);
    });
  })
});
