import { NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { getForbiddenPostMessage } from '@project/shared/helpers';

export class EntityOwnerInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest();
        const entity: string = request.headers['X-Entity-Name'];

        if (request.body?.authorId !== request?.user?.id) {
            throw new ForbiddenException(getForbiddenPostMessage(request.method, entity));
        }

        return next.handle()
    }
}
