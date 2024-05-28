import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorEntity } from './entities/author.entity';
import { ItemsPerPage } from 'src/global/globalPaging';

@Resolver(() => AuthorEntity)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) { }

  @Query(() => [AuthorEntity], { name: 'authors' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('search', { nullable: true }) searchParams?: string,
    @Args('sortBy', { nullable: true }) sortByParams?: string,
    @Args('order', { nullable: true }) orderParams?: string,
  ) {
    try {
      const search: string = searchParams || '';
      const order: string = orderParams || '';
      const sortBy: {} = sortByParams ? {
        [sortByParams]: order
      } : undefined;
      const take: number | undefined = limit ? Number(limit) : ItemsPerPage.books;
      const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
      return await this.authorService.authors({
        take,
        skip,
        where: {
          OR: [
            {
              firstName: {
                contains: search
              },
            },
            {
              lastName: {
                contains: search
              }
            }
          ]
        },
        orderBy: sortBy
      });
    } catch (error) {
      throw error;
    }
  }

  @Query(() => Number, { name: 'totalAuthors' })
  async getTotalBooks(
    @Args('search', { nullable: true }) searchParams?: string,
  ) {
    const search: string = searchParams || '';
    const total = await this.authorService.total({
      where: {
        OR: [
          {
            firstName: {
              contains: search
            }
          },
          {
            lastName: {
              contains: search
            }
          }
        ]
      }
    });
    return total;
  }


  @Query(() => AuthorEntity, { name: 'author' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      const author = await this.authorService.author({
        where: {
          id: Number(id)
        },
        include: {
          books: {
            include: {
              book: true
            }
          }
        }
      });
      return author;
    } catch (error) {
      throw error;
    }
  }
}
