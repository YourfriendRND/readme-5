import { NestInterceptor , Injectable, CallHandler, ExecutionContext} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserIdInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest();

        request.body['authorId'] = request?.user?.id;

        return next.handle();
    }
}
