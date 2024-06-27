import { CallHandler, ExecutionContext, Logger, NestInterceptor, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const requestId = crypto.randomUUID();
        const request = context.switchToHttp().getRequest<Request>();
        request.headers['X-Request-Id'] = requestId;

        Logger.log(`[${request.method}: ${request.url}]: RequestID is ${requestId}`);

        return next.handle();
    }
}
