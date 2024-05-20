import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { PrismaService } from 'src/prisma.service';
import { AwsController } from './aws.controller';

@Module({
    providers: [AwsService, PrismaService],
    controllers: [AwsController]
})
export class AdminBookModule { }
