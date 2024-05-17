import { Module } from '@nestjs/common';
import { AdminOrderService } from './order.service';
import { AdminOrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AdminOrderService, PrismaService],
  controllers: [AdminOrderController]
})
export class AdminOrderModule { }
