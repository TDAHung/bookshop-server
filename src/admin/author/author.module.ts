import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AdminAuthorController } from "./author.controller";
import { AdminAuthorService } from "./author.service";
import { AwsService } from "../aws/aws.service";

@Module({
    providers: [AdminAuthorService, AwsService, PrismaService],
    controllers: [AdminAuthorController]
})
export class AdminAuthorModule { }
