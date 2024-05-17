import { Module } from '@nestjs/common';
import { AdminHomeService } from './home.service';
import { AdminHomeController } from './home.controller';

@Module({
  providers: [AdminHomeService],
  controllers: [AdminHomeController]
})
export class AdminHomeModule { }
