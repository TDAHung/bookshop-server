import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookCategoryEntity } from 'src/book_category/entities/book_category.entity';

@ObjectType()
export class CategoryEntity {
  @Field(() => Int, { description: 'ID of Category' })
  id: number;

  @Field({ description: "Name of Category" })
  name: string;

  @Field({ description: "Description of Category" })
  description: string;

  @Field(() => [BookCategoryEntity], { description: "Name of Category" })
  books: BookCategoryEntity[];
}
