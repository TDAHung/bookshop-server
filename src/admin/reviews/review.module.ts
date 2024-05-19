import { Module } from '@nestjs/common';
import { AdminReviewService } from './review.service';
import { AdminReviewController } from './review.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AdminReviewService, PrismaService],
  controllers: [AdminReviewController]
})
export class AdminReviewModule { }
