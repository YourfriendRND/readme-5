import { 
    Controller, 
    Req, 
    Body, 
    Post, 
    Patch, 
    Request, 
    UseFilters, 
    Get, 
    Param, 
    UseGuards,
    HttpCode, 
    HttpStatus
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServicesURL } from './app.config';
import { LoginUserDTO, CreatedUserDTO, ChangedPasswordDTO, FollowerDTO } from '@project/shared/dto';
import { LoggedUserRDO, UpdatedUserRDO, UserRDO, UserTokensRDO } from '@project/shared/rdo';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UserController {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    @Post('register')
    public async register(
        @Body() createdUserDto: CreatedUserDTO
    ): Promise<UserRDO> {
        const { data } = 
            await this.httpService.axiosRef.post<UserRDO>(`${ApplicationServicesURL.Users}/register`, createdUserDto);
        
        return data;
    }

    @Post('login')
    public async login(
        @Body() userDto: LoginUserDTO
    ): Promise<LoggedUserRDO> {
        const { data } = 
            await this.httpService.axiosRef.post<LoggedUserRDO>(`${ApplicationServicesURL.Users}/login`, userDto);
        
        return data;
    }

    @Get(':id')
    public async describeUser(
        @Req() request: Request,
        @Param('id') id: string
    ): Promise<UserRDO> {
        const { data } = await this.httpService.axiosRef.get<UserRDO>(`${ApplicationServicesURL.Users}/${id}`, {
            headers: {
                'Authorization': request.headers['authorization']
            }
        });

        return data;
    }

    @Post('refresh')
    public async refreshToken(
        @Req() request: Request
    ): Promise<UserTokensRDO> {
        const { data } = await this.httpService.axiosRef.post<UserTokensRDO>(`${ApplicationServicesURL.Users}/refresh`, null, {
            headers: {
                'Authorization': request.headers['authorization']
            }
        });

        return data;
    }

    @Patch('/password/change')
    public async changePassword(
        @Req() request: Request,
        @Body() changedPass: ChangedPasswordDTO,
    ): Promise<UpdatedUserRDO> {
        const { data } = await this.httpService.axiosRef.patch<UpdatedUserRDO>(`${ApplicationServicesURL.Users}/password/change`, changedPass, {
            headers: {
                'Authorization': request.headers['authorization']
            }
        })

        return data;
    }

    @Post('/follow/:userId')
    @UseGuards(CheckAuthGuard)
    public async followToUser(
        @Req() request: Request,
        @Param('userId') userId: string
    ) {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServicesURL.Followers}`, {
            followerId: request['user']?.id,
            userId,
        });

        return data;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('/unfollow/:userId')
    @UseGuards(CheckAuthGuard)
    public async unfollowFromUser(
        @Req() request: Request,
        @Param('userId') userId: string
    ) {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServicesURL.Followers}/unfollow/${userId}`, {
            followerId: request['user']?.id,
            userId,
        });

        return data;
    }
}
