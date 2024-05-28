import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookEntity } from 'src//book/entities/book.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class ReviewEntity {
  @Field({ description: 'Id of Review' })
  id: number;

  @Field({ description: 'Comment of Review' })
  comment: string;

  @Field({ description: 'Rating of Review' })
  rating: number;

  @Field(() => BookEntity, { description: 'Book of Review' })
  book: BookEntity;

  @Field(() => UserEntity, { nullable: true, description: 'User comments' })
  user?: UserEntity;

  @Field({ description: 'Created At of Review' })
  createdAt?: Date;

  @Field({ description: 'Updated At of Review' })
  updatedAt?: Date;
}
