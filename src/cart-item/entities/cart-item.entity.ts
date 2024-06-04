import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookEntity } from 'src/book/entities/book.entity';

@ObjectType()
export class CartItemEntity {
  @Field({ description: "ID of CartItem" })
  id: number;

  @Field({ description: "Quantity of Item" })
  quantity: number;

  @Field({ description: "Book Id" })
  bookId: number;

  @Field(() => BookEntity, { description: "Book" })
  book: BookEntity;
}
