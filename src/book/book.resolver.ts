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
    const { filter, search, sortBy, sortByReview, filterByReview } = this.bookService.filter({
      searchParams,
      sortByParams,
      filterParams,
      exceptParams
    });
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
            AND: filter
          },
          {
            OR: search
          }
        ]
      },
      orderBy: sortBy
    });
    let booksWithAvgRating = books.map(book => {
      // @ts-ignore
      const totalRating = book.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      // @ts-ignore
      const avgRating = totalRating / book.reviews.length;
      return {
        ...book,
        avgRating: Number.isNaN(avgRating) ? 0 : avgRating
      };
    });

    if (!(Object.entries(filterByReview).length === 0)) {
      booksWithAvgRating = booksWithAvgRating.filter(book => {
        return (book.avgRating >= filterByReview.reviews[0] && book.avgRating <= filterByReview.reviews[1])
      });
    }

    if (sortByReview.reviews === "asc") {
      booksWithAvgRating.sort((a, b) => a.avgRating - b.avgRating)
    }
    else if (sortByReview.reviews === "desc") {
      booksWithAvgRating.sort((a, b) => b.avgRating - a.avgRating)
    }

    return booksWithAvgRating;
  }

  @Query(() => Number, { name: 'totalBooks' })
  async getTotalBooks(
    @Args('search', { nullable: true, type: () => [SearchBy] }) searchParams?: Array<SearchBy>,
    @Args('filter', { nullable: true, type: () => [FilterBy] }) filterParams?: Array<FilterBy>,
    @Args('except', { nullable: true }) exceptParams?: string,
  ) {
    const { search, filter, filterByReview } = this.bookService.filter({
      searchParams,
      filterParams,
      exceptParams,
    });
    const books = await this.bookService.books({
      include: {
        reviews: {
          include: {
            user: true
          }
        }
      },
      where: {
        AND: [
          {
            AND: filter
          },
          {
            OR: search
          }
        ]
      },
    });
    let booksWithAvgRating = books.map(book => {
      // @ts-ignore
      const totalRating = book.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      // @ts-ignore
      const avgRating = totalRating / book.reviews.length;
      return {
        ...book,
        avgRating: Number.isNaN(avgRating) ? 0 : avgRating
      };
    });

    if (!(Object.entries(filterByReview).length === 0)) {
      booksWithAvgRating = booksWithAvgRating.filter(book => {
        return (book.avgRating >= filterByReview.reviews[0] && book.avgRating <= filterByReview.reviews[1])
      });
    }
    return booksWithAvgRating.length;
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
