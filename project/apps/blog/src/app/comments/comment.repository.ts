import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
  protected entities: Map<string, CommentEntity> = new Map();

  constructor() {
    super()
  }

  public find(postId: string): CommentEntity[] {
    return Array.from(this.entities.entries())
    .filter(([_id, comment]) => comment.postId === postId)
    .map(([id, comment]) => {
      return new CommentEntity({
        id,
        ...comment,
      })
    })
  }
}

