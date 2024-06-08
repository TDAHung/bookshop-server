import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PrismaService } from 'src/prisma.service';
import { CartService } from 'src/cart/cart.service';
import { BookService } from 'src/book/book.service';

@Module({
  providers: [
    OrderResolver,
    OrderService,
    CartService,
    BookService,
    PrismaService
  ]
})
export class OrderModule { }
