import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookEntity, MostPopularBookEntity } from './entities/book.entity';
import { UpdateBookInput } from './dto/update-book.input';
import { ItemsPerPage } from 'src/global/globalPaging';
import { FilterBy, SearchBy, SortBy } from './dto/sort-book.args';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(private readonly bookService: BookService) { }

  @Query(() => [BookEntity], { name: 'books' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('search', { nullable: true, type: () => [SearchBy] }) searchParams?: Array<SearchBy>,
    @Args('sortBy', { nullable: true, type: () => [SortBy] }) sortByParams?: Array<SortBy>,
    @Args('filter', { nullable: true, type: () => [FilterBy] }) filterParams?: Array<FilterBy>,
    @Args('except', { nullable: true }) exceptParams?: string,
  ) {
    const take: number | undefined = limit ? Number(limit) : ItemsPerPage.books;
    const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
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

    let sortBy = undefined;
    if (sortByParams && sortByParams.length > 0) {
      sortBy = sortByParams.map(param => ({ [param.field]: param.order }));
    }

    let filter = [];
    if (filterParams && filterParams.length > 0) {
      filter = filterParams.map(param => {
        const { field } = param;
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
        return {
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
        };
      });
    }

    const books = await this.bookService.books({
      take,
      skip,
      include: {
        categories: {
          include: {
            category: true
          }
        },
        authors: {
          include: {
            author: true
          }
        },
        reviews: {
          include: {
            user: true
          }
        }
      },
      where: {
        AND: [
          {
            OR: filter
          },
          {
            OR: search
          }
        ]
      },
      orderBy: sortBy
    });
    const booksWithAvgRating = books.map(book => {
      // @ts-ignore
      const totalRating = book.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      // @ts-ignore
      const avgRating = totalRating / book.reviews.length;
      return {
        ...book,
        avgRating: Number.isNaN(avgRating) ? 0 : avgRating
      };
    });
    return booksWithAvgRating;
  }

  @Query(() => Number, { name: 'totalBooks' })
  async getTotalBooks(
    @Args('search', { nullable: true }) searchParams?: string,
  ) {
    const search: string = searchParams || '';
    const total = await this.bookService.total({
      where: {
        OR: [
          {
            title: {
              contains: search
            }
          }, {
            categories: {
              some: {
                id: Number(search)
              }
            }
          }
        ]
      }
    });
    return total;
  }

  @Query(() => BookEntity, { name: 'book' })
  async findOne(@Args('id', { type: () => Int }) id: string) {
    return await this.bookService.book({
      where: {
        id: Number(id)
      },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        authors: {
          include: {
            author: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    })
  }


  @Query(() => [MostPopularBookEntity], { name: 'getMostPopularBooks' })
  async getPopularBook(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ) {
    const take: number | undefined = limit ? Number(limit) : ItemsPerPage.books;
    const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
    const books = await this.bookService.getMostPopularBook({
      skip,
      take
    });
    return books;
  }

  @Mutation(() => BookEntity)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update({
      where: {
        id: updateBookInput.id
      },
      data: {
        quantity: updateBookInput.quantity
      }
    });
  }
}
