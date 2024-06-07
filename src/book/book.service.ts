import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book as BookModel, Prisma } from '@prisma/client';
import { BookEntity } from './entities/book.entity';
import { FilterBy, SearchBy, SortBy } from './dto/sort-book.args';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) { }

  book = async (
    params: {
      where: Prisma.BookWhereUniqueInput,
      include?: Prisma.BookInclude,
    }

  ): Promise<BookModel | null> => {
    try {
      const { where, include } = params;
      const post = await this.prismaService.book.findUnique({
        where,
        include
      });
      return post;
    } catch (error) {
      throw new NotFoundException({ message: error.message });
    }
  }

  books = async (
    params: {
      skip?: number,
      take?: number,
      include?: Prisma.BookInclude,
      cursor?: Prisma.BookWhereUniqueInput,
      where?: Prisma.BookWhereInput,
      orderBy?: Prisma.BookOrderByWithRelationInput[] | Prisma.BookOrderByWithRelationInput;
    }
  ): Promise<BookModel[] | null> => {
    const { skip, take, cursor, where, orderBy, include } = params;
    const books = await this.prismaService.book.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy
    });
    return books;
  }

  total = async (
    params: {
      where?: Prisma.BookWhereInput
    }
  ): Promise<number> => {
    try {
      const { where } = params;
      return await this.prismaService.book.count({
        where
      });
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  getMostPopularBook = async (
    params: {
      skip?: number,
      take?: number,
    }
  ) => {
    try {
      const { skip, take } = params;
      const books = await this.prismaService.$queryRaw`
        SELECT b.id, b.title, b.description, b.images, AVG(r.rating) AS rating
        FROM "Book" b
        JOIN "Review" r ON b.id = r."bookId"
        GROUP BY b.id, b.title
        ORDER BY AVG(r.rating) DESC
        LIMIT ${take}
        OFFSET ${skip};`;
      return books;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  update = async (
    params: {
      where: Prisma.BookWhereUniqueInput,
      data: Prisma.BookUncheckedUpdateInput,
      include?: Prisma.BookInclude,
    }
  ): Promise<BookModel | null> => {
    try {
      const { where, data, include } = params;
      data.updatedAt = new Date();
      const book = await this.prismaService.book.update({
        where,
        data,
        include
      });
      return book;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  filter = (
    params: {
      searchParams?: Array<SearchBy>,
      sortByParams?: Array<SortBy>,
      filterParams?: Array<FilterBy>,
      exceptParams?: string
    }
  ) => {
    const { searchParams, sortByParams, filterParams, exceptParams } = params;

    const except: string = exceptParams || '';
    let search = [];
    if (searchParams && searchParams.length > 0) {
      search = searchParams.map((param) => {
        const { field, contains } = param;
        return {
          [field]: {
            contains: contains
          }
        }
      })
    }

    let sortBy = [];
    let sortByReview: any = {};
    if (sortByParams && sortByParams.length > 0) {
      sortByParams.forEach(param => {
        switch (param.field) {
          case 'reviews':
            sortByReview = {
              reviews: param.order
            }
            break;
          case 'orders':
            sortBy.push({
              orderItems: {
                _count: param.order
              }
            });
            break;
          default:
            sortBy.push({
              [param.field]: param.order
            })
            break;
        }
      })
    }

    let filter = [];
    let filterByReview: any = {};
    if (filterParams && filterParams.length > 0) {

      filterParams.forEach(param => {
        const { field } = param;
        if (!(field == 'reviews')) {
          let fieldName = '';
          switch (field) {
            case 'categories':
              fieldName = 'categoryId'
              break;
            case 'authors':
              fieldName = 'authorId';
              break;
            default:
              break;
          }
          filter.push({
            [field]: {
              some: {
                [fieldName]: {
                  in: param.in.map(Number)
                },
                bookId: {
                  not: except ? Number(except) : undefined
                }
              }
            }
          })
        } else {
          filterByReview = {
            reviews: param.in
          }
        }

      });
    }
    return {
      filter,
      search,
      sortBy,
      filterByReview,
      sortByReview
    }
  }
}
