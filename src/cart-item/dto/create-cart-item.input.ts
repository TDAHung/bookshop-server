import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartItemInput {
  @Field(() => Int, { description: "ID of book" })
  bookId: number;

  @Field(() => Int, { description: "quantity of book" })
  quantity: number;

  @Field(() => Int, { description: "cart ID of book" })
  cartId: number;
}
