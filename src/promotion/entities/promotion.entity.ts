import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookEntity } from 'src/book/entities/book.entity';


@ObjectType()
export class TypePromotionEntity {
  @Field({ description: "Sale Type of Promotion" })
  saleType: string;

  @Field({ description: "Sale Type of Promotion" })
  saleValue: string;
}

@ObjectType()
export class PromotionEntity {
  @Field(() => Int, { description: 'ID of Promotion' })
  id: number;

  @Field(() => TypePromotionEntity, { description: "Type Promotion" })
  type: TypePromotionEntity;

  @Field(() => Date, { description: "Type Promotion" })
  startDate: Date;

  @Field(() => Date, { description: "Type Promotion" })
  endDate: Date;

  @Field(() => [BookEntity], { nullable: true, description: "Books of Promotions" })
  books: BookEntity[];
}
