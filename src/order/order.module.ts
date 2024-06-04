import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PrismaService } from 'src/prisma.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  providers: [
    OrderResolver,
    OrderService,
    CartService,
    PrismaService
  ]
})
export class OrderModule { }
