import { HttpService } from '@nestjs/axios';
import { CallHandler, ExecutionContext, NestInterceptor, NotFoundException, Logger, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApplicationServicesURL } from '../app.config';
import { CommentRDO } from '@project/shared/rdo';

@Injectable()
export class CommentInterceptor implements NestInterceptor {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest();
        const { postId, commentId } = request.params;

        if (!postId || !commentId) {
            throw new NotFoundException('Unknown post or comment id' );
        }
        
        const { data: originalComment } = await this.httpService.axiosRef.get<CommentRDO>(`${ApplicationServicesURL.Blog}/${postId}/comments/${commentId}`);

        const commentBody = {
            ...originalComment,
            ...request.body,
        };

        request.body = commentBody;
        request.headers['X-Entity-Name'] = 'comment';
        Logger.log(`[${request.method}: ${request.url}]: Entity name is ${request.headers['X-Entity-Name']}`);

        return next.handle()
    }
}

