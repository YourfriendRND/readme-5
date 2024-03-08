import { Controller, Get, Post, Patch, Body, HttpStatus, Param, HttpCode, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { fillDTO } from '@project/shared/helpers';
import { CreateTagDTO } from './dto/create-tag.dto';
import { TagRDO } from './rdo/tag.rdo';
import { TagService } from './tag.service';
import { DEFAULT_LIMIT_ENTITIES } from '@project/shared/constants';

@ApiTags('blog-tags')
@Controller('tags')
export class TagController {

  constructor(
    private readonly tagService: TagService,
  ) {}

  @ApiOkResponse({
    schema: {
        properties: {
            tags: {
              type: 'array',
              items: { $ref: getSchemaPath(TagRDO) }
            }
          }
    },
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: `Limit of tags, default: ${DEFAULT_LIMIT_ENTITIES}`
  })
  @Get()
  public async index(
    @Query('limit') limit?: string,
  ): Promise<TagRDO[]> {
    const tags = await this.tagService.find(limit);
    const plainTags = tags.map((tag) => fillDTO(TagRDO, tag.toPOJO()));

    return plainTags;

  }

  @ApiResponse({
    type: TagRDO,
    status: HttpStatus.CREATED,
    description: 'The new tag has been successfully created'
  })
  @Post()
  public async create(
    @Body()
    dto: CreateTagDTO
  ): Promise<TagRDO> {
    const createdTag = await this.tagService.createTag(dto);

    return fillDTO(TagRDO, createdTag.toPOJO());
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Uniq ID of updated tag'
  })
  @ApiResponse({
    type: TagRDO,
    status: HttpStatus.OK,
    description: 'The tag has been successfully updated'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tag with id not found',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body()
    dto: CreateTagDTO
  ): Promise<TagRDO> {
    const updatedTag = await this.tagService.updateTag(id, dto);

    return fillDTO(TagRDO, updatedTag.toPOJO());
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Uniq id of deleted tag'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The tag has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tag with id not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id') id: string
  ): Promise<void> {
    await this.tagService.deleteTag(id);
  }
}
