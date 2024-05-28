import { UserEntity } from './../user/entities/user.entity';
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignResponse } from './dto/sign-response';

@Injectable()
export class TokenService {
    constructor(private jwt: JwtService) { }

    generateToken = async (user: UserEntity): Promise<SignResponse> => {
        const payload = { id: user.id, name: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName };
        const accessToken = await this.jwt.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '1h'
        })
        const refreshToken = await this.jwt.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: '7d'
        })
        return {
            accessToken,
            refreshToken,
            user
        }
    }
};
