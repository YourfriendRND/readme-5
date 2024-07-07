import { Entity } from '@project/shared/core';
import { CommentInterface } from '@project/shared/types';

export class CommentEntity implements CommentInterface, Entity<string> {
  public id?: string;
  public postId: string;
  public authorId: string;
  public text: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment: CommentInterface) {
    this.populate(comment);
  }

  public populate(comment: CommentInterface): void {
    this.id = comment.id,
    this.authorId = comment.authorId;
    this.text = comment.text;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  public toPOJO() {
    return {
      id: this.id,
      authorId: this.authorId,
      text: this.text,
      postId: this.postId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: CommentInterface): CommentEntity {
    return new CommentEntity(data);
  }
}
