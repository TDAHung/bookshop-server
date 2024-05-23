import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (
            exception instanceof UnauthorizedException
        ) {
            request.flash('Error', 'Wrong EMAIL or PASSWORD!');
            response.redirect('/login');
        } else if (
            exception instanceof ForbiddenException

        ) {
            request.flash('Error', 'Please try again!');
            response.redirect('/login');
        } else {
            response.redirect('/error');
        }
    }
}