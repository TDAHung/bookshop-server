import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field({ description: 'Example field (placeholder)' })
  content: string;

  @Field(() => Int, { description: 'user ID' })
  userId: number;
}
