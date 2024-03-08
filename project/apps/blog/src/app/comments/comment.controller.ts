import { Body, Controller, Delete, Get, Post, Query, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiParam, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { fillDTO } from '@project/shared/helpers';
import { DEFAULT_LIMIT_ENTITIES } from '@project/shared/constants';
import { CommentService } from './comment.service';
import { CommentDTO } from './dto/comment.dto';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('blog-comments')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created'
  })
  @Post('/')
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CommentDTO
  ): Promise<CommentRDO> {
    const createdComment = await this.commentService.createComment(postId, dto);
    return fillDTO(CommentRDO, createdComment.toPOJO());
  }

  @ApiOkResponse({
    schema: {
      properties: {
        comments: {
          type: 'array',
          items: { $ref: getSchemaPath(CommentRDO) }
        }
      }
    },
    status: HttpStatus.OK,
    isArray: true,
    description: 'The list of comments for post'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: `Limit of comments, default: ${DEFAULT_LIMIT_ENTITIES}`
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Uniq ID a post with comments',
  })
  @Get('/')
  public async index(
    @Param('postId') postId: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ): Promise<CommentRDO[]> {
    const comments = await this.commentService.findComments(postId, limit, page);
    const plainComments = comments.map((comment) => fillDTO(CommentRDO, comment.toPOJO()));
    return plainComments;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment has been deleted successfully'
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Uniq id of deleted comment'
  })
  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('postId') postId: string
  ): Promise<void> {
    await this.commentService.deleteComment(postId);
  }

}
