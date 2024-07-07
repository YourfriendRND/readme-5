import { 
    CallHandler, 
    ExecutionContext, 
    NestInterceptor, 
    NotFoundException, 
    ForbiddenException, 
    Injectable,
    Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApplicationServicesURL } from '../app.config';
import { PostRDO } from '@project/shared/rdo';
// import { getForbiddenPostMessage } from '@project/shared/helpers';

@Injectable()
export class PostInterceptor implements NestInterceptor {
    constructor(
        private readonly httpService: HttpService,
    ) {}
    
    public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest();
        const { id } = request.params;
        if (!id) {
            throw new NotFoundException('Unknown post id' );
        }
        
        const { data: originalPost } = await this.httpService.axiosRef.get<PostRDO>(`${ApplicationServicesURL.Blog}/${id}`);

        const postBody = {
            ...originalPost,
            ...request.body,
        };

        request.body = postBody;
        request.headers['X-Entity-Name'] = 'post';
        Logger.log(`[${request.method}: ${request.url}]: Entity name is ${request.headers['X-Entity-Name']}`);

        return next.handle()
    }
}

