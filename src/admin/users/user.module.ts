import { Module } from "@nestjs/common";
import { AdminUserSerivce } from "./user.service";
import { PrismaService } from "src/prisma.service";

@Module({
    providers: [AdminUserSerivce, PrismaService],
})

export class AdminUserModule { };
