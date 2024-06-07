import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionResolver } from './promotion.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PromotionResolver, PromotionService, PrismaService],
})
export class PromotionModule { }
