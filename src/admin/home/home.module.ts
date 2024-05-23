import { AdminBookService } from './../book/book.service';
import { Module } from '@nestjs/common';
import { AdminHomeController } from './home.controller';
import { AdminOrderService } from '../order/order.service';
import { PrismaService } from 'src/prisma.service';
import { AdminReviewService } from '../reviews/review.service';
import { AdminUserSerivce } from '../users/user.service';

@Module({
  providers: [
    AdminOrderService,
    AdminBookService,
    AdminReviewService,
    AdminUserSerivce,
    PrismaService],
  controllers: [AdminHomeController]
})
export class AdminHomeModule { }
