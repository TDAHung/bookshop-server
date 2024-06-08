import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignResponse } from './dto/sign-response';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt'
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private token: TokenService) { }

  signin = async (signInData: SignInInput): Promise<SignResponse> => {
    try {
      const { email, password } = signInData;

      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
        }
      });
      if (!user) {
        throw new HttpException({ message: "Account does not exist" }, HttpStatus.UNAUTHORIZED);
      }

      const verify = await compare(password, user.password);
      if (!verify) {
        throw new HttpException({ message: "Password does not correct" }, HttpStatus.UNAUTHORIZED);
      }

      return await this.token.generateToken(user);
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.FORBIDDEN);
    }
  }

  signup = async (signUpData: SignUpInput): Promise<SignResponse> => {
    try {
      const { email, password, username, firstName, lastName } = signUpData;
      const hashPassword: string = await hash(password, 10);

      const user = await this.prisma.user.findUnique({
        where: {
          email
        }
      });
      if (user) {
        throw new HttpException({ message: "This email has been used" }, HttpStatus.UNAUTHORIZED);
      }
      const usernameFound = await this.prisma.user.findUnique({
        where: {
          username
        }
      });
      if (usernameFound) {
        throw new HttpException({ message: "This username has been used" }, HttpStatus.UNAUTHORIZED);
      }
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hashPassword,
          username,
          role: 'CUSTOMER',
          firstName,
          lastName
        }
      });
      return await this.token.generateToken(newUser);
    } catch (error) {
      throw new HttpException({ message: "Oops, Some thing wrong check your details" }, HttpStatus.UNAUTHORIZED);
    }
  }
}
