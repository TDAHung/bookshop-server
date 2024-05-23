import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Author as AuthorModel, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { AuthorEntity } from "./entity/author.entity";
@Injectable()
export class AdminAuthorService {

    constructor(private readonly prismaService: PrismaService) { }

    authors = async (
        params: {
            skip?: number,
            take?: number,
            select?: Prisma.AuthorSelect,
            include?: Prisma.AuthorInclude,
            cursor?: Prisma.AuthorWhereUniqueInput
            where?: Prisma.AuthorWhereInput,
            orderBy?: Prisma.AuthorOrderByWithRelationInput
        }
    ): Promise<AuthorModel[] | Error> => {
        try {
            const { skip, take, select, include, cursor, where, orderBy } = params;
            if (select) {
                return await this.prismaService.author.findMany({
                    skip,
                    take,
                    select,
                    cursor,
                    where,
                    orderBy
                });
            }
            return await this.prismaService.author.findMany({
                skip,
                take,
                include,
                cursor,
                where,
                orderBy
            });
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.FORBIDDEN);
        }
    }

    author = async (
        params: {
            where: Prisma.AuthorWhereUniqueInput,
            select?: Prisma.AuthorSelect,
            include?: Prisma.AuthorInclude,
        }
    ): Promise<AuthorModel | Error> => {
        try {
            const { select, include, where } = params;
            if (select) {
                return await this.prismaService.author.findFirstOrThrow({
                    select,
                    where,
                });
            }
            return await this.prismaService.author.findFirstOrThrow({
                include,
                where,
            });
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.NOT_FOUND);
        }
    }

    create = async (
        data: Prisma.AuthorUncheckedCreateInput,
    ): Promise<AuthorModel | Error> => {
        try {
            return await this.prismaService.author.create({
                data
            });
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.NOT_FOUND);
        }
    }

    delete = async (
        id: number
    ): Promise<AuthorEntity | Error> => {
        try {
            return await this.prismaService.author.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.NOT_FOUND);
        }
    }

    total = async () => {
        try {
            return await this.prismaService.author.count();
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST);
        }
    }
}
