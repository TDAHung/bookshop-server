import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
  @Field(() => Int)
  id: number;

  @Field({ description: "Update Quantity of Book" })
  quantity: number;
}
