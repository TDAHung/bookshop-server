import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [BookResolver, BookService, PrismaService],
})
export class BookModule { }
