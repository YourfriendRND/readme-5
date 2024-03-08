import { Controller, Body, Post, Patch, Get, Delete, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { DEFAULT_LIMIT_ENTITIES } from '@project/shared/constants';
import { fillDTO } from '@project/shared/helpers';
import { PostDTO } from './dto/post.dto';
import { PostService } from './post.service';
import { PostRDO } from './rdo/created-post.rdo';
import { POST_NOT_FOUND } from './post.constant';

@ApiTags('blog-posts')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiResponse({
        type: PostRDO,
        status: HttpStatus.CREATED,
        description: 'The new post has been successfully created'
    })
    @Post()
    public async create(
        @Body()
        dto: PostDTO
    ): Promise<PostRDO> {
        const createdPost = await this.postService.createPost(dto);

        return fillDTO(PostRDO, createdPost.toPOJO());
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Uniq ID of updated post'
    })
    @ApiResponse({
        type: PostRDO,
        status: HttpStatus.OK,
        description: 'The post has been successfully updated'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: `${POST_NOT_FOUND}, id`,
    })
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    public async update(
        @Param('id') id: string,
        @Body() dto: PostDTO,
    ): Promise<PostRDO> {
        const updatedPost = await this.postService.updatePost(dto, id);

        return fillDTO(PostRDO, updatedPost.toPOJO());
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Uniq id of requested post'
    })
    @ApiResponse({
        type: PostRDO,
        status: HttpStatus.OK,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: `${POST_NOT_FOUND}, id`,
    })
    @Get(':id')
    public async show(
        @Param('id') id: string
    ): Promise<PostRDO> {
        const post = await this.postService.findPost(id);
        return fillDTO(PostRDO, post.toPOJO());
    }

    @ApiOkResponse({
        schema: {
            properties: {
                posts: {
                  type: 'array',
                  items: { $ref: getSchemaPath(PostRDO) }
                }
              }
        },
        isArray: true,
        status: HttpStatus.OK,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: `Limit of posts, default: ${DEFAULT_LIMIT_ENTITIES}`
    })
    @Get()
    public async index(
        @Query('authorId') authorId?: string, // Временное решение, пока нет аутентификации, после буду  брать данные из токена
        @Query('limit') limit?: string,
    ): Promise<PostRDO[]> {
        const posts = await this.postService.find(authorId, limit);
        const plainPosts = posts.map((post) => fillDTO(PostRDO, post.toPOJO()));
        return plainPosts;
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Uniq id of deleted post'
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'The post has been successfully deleted'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: `${POST_NOT_FOUND}, id`,
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id') id: string,
    ): Promise<void> {
        await this.postService.deletePost(id);
    }
}
