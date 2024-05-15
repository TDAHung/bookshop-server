import { Module } from '@nestjs/common';
import { AdminOrderService } from './order.service';
import { AdminOrderController } from './order.controller';

@Module({
  providers: [AdminOrderService],
  controllers: [AdminOrderController]
})
export class AdminOrderModule { }
