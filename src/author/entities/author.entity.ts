import { ObjectType, Field } from '@nestjs/graphql';
import { AuthorBookEntity } from 'src/author_book/entities/author_book.entity';
import { BookEntity, ImageJson } from 'src/book/entities/book.entity';

@ObjectType()
export class AuthorEntity {
  @Field({ description: "ID of Author" })
  id: number;

  @Field({ description: 'First Name of Author' })
  firstName: string;

  @Field({ description: 'Last Name of Author' })
  lastName: string;

  @Field({ description: 'Bio of Author' })
  bio: string;

  @Field(() => ImageJson, { description: 'Thumpnail of Author' })
  thumpnail: ImageJson;

  @Field(() => [AuthorBookEntity], { description: 'Books of Author' })
  books: AuthorBookEntity[];

  @Field({ description: 'Created At of Author' })
  createdAt: Date;

  @Field({ description: 'Updated At of Author' })
  updatedAt: Date;
}

