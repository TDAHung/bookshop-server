import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ReviewResolver, ReviewService, PrismaService],
})
export class ReviewModule { }
