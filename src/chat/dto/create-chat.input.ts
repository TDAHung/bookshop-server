import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field({ description: 'Example field (placeholder)' })
  content: string;

  @Field(() => Int, { description: 'sender ID' })
  senderId: number;

  @Field(() => Int, { nullable: true, description: 'receiver ID' })
  receiverId: number;
}
