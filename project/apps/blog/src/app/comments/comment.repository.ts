import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { PrismaClientService } from '@project/shared/config/blog';
import { BasePrismaRepository } from '@project/shared/core';
import { CommentInterface } from '@project/shared/types';
import { DEFAULT_LIMIT_ENTITIES } from '@project/shared/constants';

@Injectable()
export class CommentRepository extends BasePrismaRepository<CommentEntity, CommentInterface> {

  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, CommentEntity.fromObject)
  }

  public async findById(id: string): Promise<CommentEntity> {
    const document = await this.client.comment.findFirst({
      where: { id: id }
    });

    return this.createEntityFromDocument(document);
  }

  public async update(id: string, entity: CommentEntity): Promise<CommentEntity> {
    const document = entity.toPOJO();
    const updatedComment = await this.client.comment.update({
      where: { id: id },
      data: {
        ...document
      }
    });

    return this.createEntityFromDocument(updatedComment);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: { id: id }
    });
  }

  public async delete(id: string, postId: string): Promise<void> {
    await this.client.comment.delete({
      where: { id: id, postId: postId }
    });
  }

  public async save(entity: CommentEntity, postId: string): Promise<CommentEntity> {
    const createdComment = await this.client.comment.create({
      data: {
        text: entity.text,
        post: {
          connect: { id: postId }
        },
        author: {
          connect: { id: entity.authorId }
        }
      }
    })

    return this.createEntityFromDocument(createdComment);
  }

  public async find(postId: string, limit: number, page: number): Promise<CommentEntity[]> {
    const count = limit && limit <= DEFAULT_LIMIT_ENTITIES ? limit : DEFAULT_LIMIT_ENTITIES;
    const skipCount = page && page > 1 ? page * count : 0;
    const posts = await this.client.comment.findMany({
      where: { postId: postId },
      include: {
        author: true
      },
      take: count,
      skip: skipCount,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return posts.map((post) => this.createEntityFromDocument(post));
  }
}

