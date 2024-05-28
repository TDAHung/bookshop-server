import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
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
            case exception instanceof BadRequestException:
                const url = request.url.split('/');
                const method: string = url[2] == 'new' ? 'create' : 'edit';
                const exceptionResponse = exception.getResponse();
                if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                    const message = (exceptionResponse as { message: Array<string> }).message;
                    const errorObject = message.reduce((acc, errorMessage) => {
                        const [firstWord, ...restOfMessage] = errorMessage.split(' ');
                        const fieldName = firstWord.trim();
                        const errorMessageText = restOfMessage.join(' ');
                        acc[fieldName] = acc[fieldName] || [];
                        acc[fieldName].push(errorMessageText);
                        return acc;
                    }, {});
                    // @ts-ignore
                    request.flash('Error', errorObject);
                    request.flash('Accept_Data', request.body);
                    response.redirect(`${method}`);
                }
                break;
            default:
                break;
        }
    }
}
