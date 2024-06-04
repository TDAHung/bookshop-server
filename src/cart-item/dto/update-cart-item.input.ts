import { CreateCartItemInput } from './create-cart-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCartItemInput {
  @Field(() => Int, { description: "ID of Cart Item" })
  id: number;

  @Field(() => Int, { description: "quantity of Cart Item" })
  quantity: number;
}
