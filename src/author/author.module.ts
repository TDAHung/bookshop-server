import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AuthorResolver, AuthorService, PrismaService],
})
export class AuthorModule { }
