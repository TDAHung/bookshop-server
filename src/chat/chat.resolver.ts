import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) { }

  @Mutation(() => Chat)
  async createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    // return await this.chatService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'messages' })
  async findAll(
    @Args('userId', { type: () => Int }) id: number
  ) {
    const messages = await this.chatService.messages({
      where: {
        OR: [
          {
            senderId: id
          },
          {
            receiverId: id
          }
        ]
      }
    });
    console.log(messages);
    return messages;
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
    return this.chatService.update(updateChatInput.id, updateChatInput);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id', { type: () => Int }) id: number) {
    return this.chatService.remove(id);
  }
}
