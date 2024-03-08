import { Entity } from '@project/shared/core';
import { CommentInterface } from '@project/shared/types';

export class CommentEntity implements CommentInterface, Entity<string> {
  public id?: string;
  public authorId: string;
  public text: string;
  public postId: string;

  constructor(comment: CommentInterface) {
    this.populate(comment);
  }

  public populate(comment: CommentInterface): void {
    this.id = comment.id,
    this.authorId = comment.authorId;
    this.postId = comment.postId;
    this.text = comment.text;
  }

  public toPOJO() {
    return {
      id: this.id,
      authorId: this.authorId,
      text: this.text,
      postId: this.postId,
    }
  }

  static fromObject(data: CommentInterface): CommentEntity {
    return new CommentEntity(data);
  }
}
