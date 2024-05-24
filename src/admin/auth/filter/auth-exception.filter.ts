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

        switch (true) {
            case exception instanceof UnauthorizedException:
                request.flash('Error', 'Wrong EMAIL or PASSWORD!');
                response.redirect('/login');
                break;
            case exception instanceof ForbiddenException:
                request.flash('Error', 'You need to Login to exceed!');
                response.redirect('/login');
                break;
            default:
                response.redirect('/error');
                break;
        }
    }
}
