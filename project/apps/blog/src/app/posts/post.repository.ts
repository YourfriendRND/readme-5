import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.abstract';
import { BasePrismaRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/config/blog';
import { PostInterface, BlogUser } from '@project/shared/types';
import { MAX_LIMIT_POST_ON_PAGE } from '@project/shared/constants';
import { LikeEntity } from './entities/like.entity';

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
        _count: {
          select: { likes: true }
        }
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id: ${id} not found`);
    }
    
    const post = this.createEntityFromDocument(document);
    post.likes = document._count.likes;
    return post;
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
        originalAuthorId: document.originalAuthorId,
        originalPostId: document.originalPostId,
        publishedAt: document.publishedAt,
        isRepost: document.isRepost,
      },
    });

    return new PostEntity({ 
      ...createdPost, 
      tags: [...entity.tags],
    });
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
        tags: true,
        _count: {
          select: { likes: true }
        }
      },
      take: count,
      skip: skipCount,
      orderBy: {
        [sort]: 'desc',
      }
    });

    return documents.map((document) => {
      const post = this.createEntityFromDocument(document);
      post.likes = document._count.likes;
      return post;
    });

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
        _count: {
          select: { likes: true }
        }
      }
    });

    const post =  this.createEntityFromDocument(updatedEntity);
    post.likes = updatedEntity._count.likes;
    return post;
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

  public async countPosts(authorId: string): Promise<number> {
    await this.createUser(authorId);

    const postCount = await this.client.post.count({
      where: {
        authorId
      }
    });

    return postCount;
  }

  public async findUserLike(userId: string, postId: string): Promise<LikeEntity | null> {
    await this.createUser(userId);

    const like = await this.client.like.findFirst({
      where: {
        authorId: userId,
        postId,
      }
    });

    return like ? new LikeEntity(like) : null;
  }

  public async likePost(userId: string, postId: string): Promise<LikeEntity> {
    const like =  await this.client.like.create({
      data: {
        authorId: userId,
        postId,
      }
    });

    return new LikeEntity(like)
  }

  public async dislikePost(likeId: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id: likeId
      }
    });
  }
}
