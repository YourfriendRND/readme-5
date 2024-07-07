import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR = 'Internal server error';

type CustomErrorData = {
    message: string
}

// TODO: Внедрить ошибки по спецификации RFC7807 https://datatracker.ietf.org/doc/html/rfc7807
@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
    public catch(exception: AxiosError<CustomErrorData>, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const statusText = exception.response?.statusText || INTERNAL_SERVER_ERROR;
        const message = exception.response?.data?.message || INTERNAL_SERVER_ERROR;

        response
            .status(status)
            .json({
                statusCode: status,
                statusText,
                message,
            }
        );
    }
}
