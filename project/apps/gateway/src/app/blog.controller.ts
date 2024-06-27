import { 
    Controller,
    Req,
    UseFilters,
    Body,
    Query,
    UseGuards, 
    UseInterceptors, 
    Post, 
    Get,
    Patch,
    Param,
    HttpCode,
    Delete,
    HttpStatus,
    BadRequestException
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApplicationServicesURL } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { PostDTO } from '@project/shared/dto';
import { PostRDO } from '@project/shared/rdo';
import { PostInterceptor } from './interceptors/post.interceptor';
import { EntityOwnerInterceptor } from './interceptors/entity-owner.interceptor';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    @Get()
    @UseInterceptors(UserIdInterceptor)
    public async showPosts(
        @Query('authorId') authorId?: string, // Временное решение, пока нет аутентификации, после буду  брать данные из токена
        @Query('sort') sort?: string,
        @Query('limit') limit?: number,
        @Query('page') page?: number
    ) {
        const  { data } = await this.httpService.axiosRef.get(
            `${ApplicationServicesURL.Blog}`,
            {
                params: {
                    authorId,
                    sort,
                    limit,
                    page
                }
            }
        );

        return data;
    }

    @Post()
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    public async createPost(
        @Body() dto: PostDTO
    ): Promise<PostRDO> {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServicesURL.Blog}`, dto);
        return data;
    }

    @Post('/repost/:postId')
    @UseGuards(CheckAuthGuard)
    public async createRepost(
        @Req() request: Request,
        @Param('postId') postId: string
    ) {

        if (!postId) {
            throw new BadRequestException(`post id does not defined for repost`);
        }

        const authorId = request['user']?.id;
        console.log(authorId)

        const { data } = await this.httpService.axiosRef.post(`${ApplicationServicesURL.Blog}/${postId}/repost/${authorId}`, null);

        return data;
    }


    @Patch(':id')
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(PostInterceptor)
    @UseInterceptors(EntityOwnerInterceptor)
    public async updatePost(
        @Param('id') id: string,
        @Body() dto: PostDTO
    ) {

        const { data } = await this.httpService.axiosRef.patch(`${ApplicationServicesURL.Blog}/${id}`, dto);

        return data;
    }

    @Delete(':id')
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(EntityOwnerInterceptor)
    @UseInterceptors(PostInterceptor)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deletePost(
        @Param('id') id: string,
    ) {
        const { data } = await this.httpService.axiosRef.delete(`${ApplicationServicesURL.Blog}/${id}`);

        return data;
    }
}
