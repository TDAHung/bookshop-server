import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class SignResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
