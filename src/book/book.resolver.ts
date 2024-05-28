import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookEntity, MostPopularBookEntity } from './entities/book.entity';
import { UpdateBookInput } from './dto/update-book.input';
import { ItemsPerPage } from 'src/global/globalPaging';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(private readonly bookService: BookService) { }

  @Query(() => [BookEntity], { name: 'books' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('search', { nullable: true }) searchParams?: string,
    @Args('sortBy', { nullable: true }) sortByParams?: string,
    @Args('order', { nullable: true }) orderParams?: string,
  ) {
    const search: string = searchParams || '';
    const order: string = orderParams || '';
    const sortBy: {} = sortByParams ? {
      [sortByParams]: order
    } : undefined;
    const take: number | undefined = limit ? Number(limit) : ItemsPerPage.books;
    const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
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
        OR: [
          {
            title: {
              contains: search
            }
          },
          {
            description: {
              contains: search
            }
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
        avgRating
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
    console.log(books);
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
