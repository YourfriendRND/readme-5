import { 
    Controller,
    Param,
    Body,
    Req,
    Get,
    Post,
    Patch,
    Delete,
    UseFilters,
    UseGuards,
    UseInterceptors,
    Request,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { ApplicationServicesURL } from './app.config';
import { CommentRDO } from '@project/shared/rdo';
import { CommentDTO } from '@project/shared/dto';
import { CommentInterceptor } from './interceptors/comment.interceptor';
import { EntityOwnerInterceptor } from './interceptors/entity-owner.interceptor';

@UseFilters(AxiosExceptionFilter)
@Controller('blog/:postId/comments')
export class CommentBlogController {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    private createUrl(postId: string): string {
        return `${ApplicationServicesURL.Blog}/${postId}/comments`;
    }

    @Get('/')
    @UseGuards(CheckAuthGuard)
    public async getPostComments(
        @Param('postId') postId: string
    ): Promise<CommentRDO[]> {
        const { data } = await this.httpService.axiosRef.get<CommentRDO[]>(this.createUrl(postId));

        return data;
    }

    @Post('/')
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @HttpCode(HttpStatus.CREATED)
    public async createComment(
        @Req() request: Request,
        @Param('postId') postId: string,
        @Body() dto: CommentDTO
    ): Promise<CommentRDO[]> {
        const { data } = await this.httpService.axiosRef.post<CommentRDO>(this.createUrl(postId), dto);

        if (data) {
            const { data: comments } = await this.httpService.axiosRef.get<CommentRDO[]>(this.createUrl(postId), {
                headers: {
                    'Authorization': request.headers['authorization']
                }
            });
    
            return comments;
        }
        
    }

    @Patch('/:commentId')
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(EntityOwnerInterceptor)
    @UseInterceptors(CommentInterceptor)
    public async changeComment(
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Body() dto: CommentDTO
    ) {
        
        if ('updatedAt' in dto) {
            delete dto.updatedAt;
        }
        
        const { data: updatedComment } = await this.httpService.axiosRef.patch(`${ApplicationServicesURL.Blog}/${postId}/comments/${commentId}`, dto);

        return updatedComment;
    }

    @Delete('/:commentId')
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(EntityOwnerInterceptor)
    @UseInterceptors(CommentInterceptor)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteComment (
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
    ) {
        await this.httpService.axiosRef.delete(`${ApplicationServicesURL.Blog}/${postId}/comments/${commentId}`);
    }
}
