import { Module } from '@nestjs/common';
import { AdminPromotionListService } from './promotion-list.service';
import { AdminPromotionListController } from './promotion-list.controller';

@Module({
  providers: [AdminPromotionListService],
  controllers: [AdminPromotionListController]
})
export class AdminPromotionListModule { }
