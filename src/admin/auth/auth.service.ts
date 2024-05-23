import { Injectable } from '@nestjs/common';
import { AdminUserSerivce } from '../users/user.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminAuthService {
    constructor(
        private readonly userService: AdminUserSerivce,
        private readonly prismaService: PrismaService
    ) { }

    validateUser = async (
        email: string,
        password: string
    ): Promise<any> => {
        const user = await this.userService.user({
            where: {
                email,
                role: 'ADMIN'
            }
        });
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
