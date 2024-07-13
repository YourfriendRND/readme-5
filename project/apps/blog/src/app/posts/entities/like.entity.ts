import { PostLike } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class LikeEntity implements Entity<string>, PostLike {
    public id: string;
    public authorId: string;
    public postId: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(like: PostLike) {
        this.populate(like)
    }

    public populate(like: PostLike): void {
        this.id = like.id;
        this.authorId = like.authorId;
        this.postId = like.postId;
        this.createdAt = like.createdAt;
        this.updatedAt = like.updatedAt;
    }

    public toPOJO() {
        return {
            id: this.id,
            authorId: this.authorId,
            postId: this.postId,
        }
    }
}