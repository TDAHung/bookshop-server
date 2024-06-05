import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { AdminPromotionListService } from './promotion-list.service';
import { AdminPromotionListController } from './promotion-list.controller';

@Module({
  providers: [AdminPromotionListService, PrismaService],
  controllers: [AdminPromotionListController]
})
export class AdminPromotionListModule { }
