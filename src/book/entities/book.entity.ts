import { ObjectType, Field } from '@nestjs/graphql';
import { JsonValue } from "@prisma/client/runtime/library";
import { AuthorBookEntity } from 'src/author_book/entities/author_book.entity';
import { BookCategoryEntity } from 'src/book_category/entities/book_category.entity';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';

@ObjectType()
export class ImageJson {
  @Field({ description: 'URL of the image' })
  url: string;

  @Field({ description: 'Key of the image' })
  key: string;

  @Field({ description: 'Name of the image' })
  name: string;

  @Field({ description: 'Size of the image' })
  size: number;
}

@ObjectType()
export class MostPopularBookEntity {
  @Field({ description: 'Id of Book' })
  id: number;

  @Field({ description: 'Title of Book' })
  title: string;

  @Field({ description: 'Description of Book' })
  description: string;

  @Field({ description: 'Images of Book' })
  rating: number;

  @Field(() => [ImageJson], { description: 'Images of Book' })
  images: ImageJson[] | JsonValue[];
}

@ObjectType()
export class BookEntity {
  @Field({ description: 'Id of Book' })
  id: number;

  @Field({ description: 'Title of Book' })
  title: string;

  @Field({ description: 'Description of Book' })
  description: string;

  @Field({ description: 'Price of Book' })
  price: number;

  @Field({ description: 'Discount of Book' })
  discount: number;

  @Field({ description: 'Quantity of Book' })
  quantity: number;

  @Field(() => [ImageJson], { description: 'Images of Book' })
  images: ImageJson[] | JsonValue[];

  @Field(() => [AuthorBookEntity], { description: 'Authors of Book' })
  authors: AuthorBookEntity[];

  @Field(() => [BookCategoryEntity], { description: 'Categories of Book' })
  categories: BookCategoryEntity[];

  @Field(() => [ReviewEntity], { description: "All Reviews of this Book" })
  reviews: ReviewEntity[];

  @Field({ description: 'Review of Book' })
  avgRating?: number;

  @Field(() => PromotionEntity, { nullable: true, description: 'Promotion of Book' })
  promotion?: PromotionEntity;

  @Field({ description: 'Title of Book' })
  createdAt?: Date;

  @Field({ description: 'Title of Book' })
  updatedAt?: Date;
}


