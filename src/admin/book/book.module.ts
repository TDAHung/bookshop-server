import { Module } from '@nestjs/common';
import { AdminBookService } from './book.service';
import { AdminBookController } from './book.controller';

@Module({
  providers: [AdminBookService],
  controllers: [AdminBookController]
})
export class AdminBookModule { }
