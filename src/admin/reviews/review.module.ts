import { Module } from '@nestjs/common';
import { AdminReviewService } from './review.service';
import { AdminReviewController } from './review.controller';

@Module({
  providers: [AdminReviewService],
  controllers: [AdminReviewController]
})
export class AdminBookModule { }
