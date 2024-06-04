import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemResolver } from './cart-item.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CartItemResolver, CartItemService, PrismaService],
})
export class CartItemModule { }
