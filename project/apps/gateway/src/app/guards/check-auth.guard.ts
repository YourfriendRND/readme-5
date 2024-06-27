import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServicesURL } from '../app.config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(
        private readonly httpService: HttpService,
    ) {}
    
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServicesURL.Users}/check`, null, {
            headers: {
                'Authorization': request.headers['authorization'],
            }
        });

        request['user'] = data;

        return true;
    }
}