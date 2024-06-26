import { Module, UseFilters } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AdminBookModule } from './admin/book/book.module';
import { AdminAuthModule } from './admin/auth/auth.module';
import { AdminCategoryModule } from './admin/category/category.module';
import { AdminOrderModule } from './admin/order/order.module';
import { AdminPromotionListModule } from './admin/promotion-list/promotion-list.module';
import { BookModule } from './book/book.module';
import { AdminHomeModule } from './admin/home/home.module';
import { AdminReviewModule } from './admin/reviews/review.module';
import { AdminAuthorModule } from './admin/author/author.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { PromotionModule } from './promotion/promotion.module';
import { AboutModule } from './admin/about/about.module';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { AdminChatModule } from './admin/chat/chat.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    }),
    AdminHomeModule,
    AdminOrderModule,
    AdminPromotionListModule,
    AdminBookModule,
    AdminAuthorModule,
    AdminAuthModule,
    AdminReviewModule,
    AdminCategoryModule,
    AdminPromotionListModule,
    AdminChatModule,
    AboutModule,
    BookModule,
    AuthModule,
    CategoryModule,
    AuthorModule,
    ReviewModule,
    OrderModule,
    CartModule,
    UserModule,
    CartItemModule,
    PromotionModule,
    ChatModule
  ],
  controllers: [AppController]
})
export class AppModule { }
