import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.abstract';
import { BasePrismaRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/config/blog';
import { PostInterface, BlogUser } from '@project/shared/types';
import { MAX_LIMIT_POST_ON_PAGE } from '@project/shared/constants';

@Injectable()
export class PostRepository extends BasePrismaRepository<PostEntity, PostInterface> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostEntity.fromObject)
  }

  public async findById(id: PostEntity['id']): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: { id: id },
      include: {
        tags: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id: ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const document = entity.toPOJO();
    const authorId = entity.authorId;

    const user = await this.createUser(authorId);

    const createdPost = await this.client.post.create({
      data: {
        name: document.name,
        tags: {
          connect: document.tags?.map((tag) => ({id: tag.id})),
        },
       //authorId: user.id,
        author: {
          connect: { id: user.id }
        },
        status: document.status,
        type: document.type,
        url: document.url,
        photo: document.photo,
        text: document.text,
        quoteAuthorId: document.quoteAuthorId,
        announcement: document.announcement,
        videoUrl: document.videoUrl,
        comments: {
          connect: []
        },
        likesCount: 0,
        originalAuthorId: document.originalAuthorId,
        originalPostId: document.originalPostId,
        publishedAt: document.publishedAt,
        isRepost: document.isRepost,
      },
    });

    return new PostEntity({ 
      ...createdPost, 
      tags: [...entity.tags]
    }) ;
  }

  public async find(authorId: string, sort = 'publishedAt', limit = MAX_LIMIT_POST_ON_PAGE, page = 1): Promise<PostEntity[]> {
    const count = limit && limit <= MAX_LIMIT_POST_ON_PAGE ? limit : MAX_LIMIT_POST_ON_PAGE;
    const skipCount = page && page > 1 ? page * count : 0;
    const searchParams = { authorId };

    for (const key in searchParams) {
      if (!searchParams[key]) {
        delete searchParams[key];
      }
    }

    const documents = await this.client.post.findMany({
      where: searchParams,
      include: {
        tags: true
      },
      take: count,
      skip: skipCount,
      orderBy: {
        [sort]: 'desc',
      }
    });

    return documents.map((document) => this.createEntityFromDocument(document));

  }

  public async findRepost(postId: string, authorId: string): Promise<PostEntity | null> {
    const repost = await this.client.post.findFirst({
      where: { originalPostId: postId, authorId, isRepost: true },
      include: {
        tags: true
      }
    });

    if (repost) {
      return this.createEntityFromDocument(repost);
    }

    return null;

  }

  public async update(id: string, entity: PostEntity): Promise<PostEntity> {
    const updatedDocument = entity.toPOJO();
    const authorId = entity.authorId;
    const updatedEntity = await this.client.post.update({
      where: { id: id },
      data: {
        name: updatedDocument.name,
        status: updatedDocument.status,
        type: updatedDocument.type,
        announcement: updatedDocument.announcement,
        text: updatedDocument.text,
        url: updatedDocument.url,
        quoteAuthorId: updatedDocument.quoteAuthorId,
        photo: updatedDocument.photo,
        videoUrl: updatedDocument.videoUrl,
        likesCount: 0,
        tags: {
          connect: updatedDocument.tags?.length ? updatedDocument.tags.map((tag) => {
            return { id: tag.id }
          }) : undefined,
        },
        author: {
          connect: { id: authorId }
        },
      },
      include: {
        tags: true,
      }
    });

    return this.createEntityFromDocument(updatedEntity);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: { id: id }
    });
  }

  public async createUser(authorId: string): Promise<BlogUser> {
    const user = await this.client.user.findUnique({
      where: {
        id: authorId
      }
    });

    if (user) {
      return user;
    }

    const createdUser = await this.client.user.create({
      data: {
        id: authorId
      }
    });

    return createdUser;
  }
}
