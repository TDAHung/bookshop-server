import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field({ description: "rating of Review" })
  rating: number;

  @Field({ description: "rating of Review" })
  comment: string;

  @Field({ nullable: true, description: "User Id" })
  userId?: number;

  @Field({ description: "Book ID" })
  bookId: number;
}
