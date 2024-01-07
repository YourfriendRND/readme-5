import { Entity } from '@project/shared/core';
import { PostInterface, TagInterface } from '@project/shared/types';

export abstract class PostEntity implements PostInterface, Entity<string> {
    public id?: string;
    public name: string;
    public tags: TagInterface[];
    public authorId?: string;
    public status: string;
    public likesCount: number;

    constructor(post: PostInterface) {
        this.populate(post);
    }

    public populate <T extends PostInterface>(post: T): void {
        this.id = post.id;
        this.name = post.name;
        this.tags = post.tags;
        this.authorId = post.authorId;
        this.status = post.status;
        this.likesCount = post.likesCount;
    }

    public toPOJO() {
        return {
            id: this.id,
            name: this.name,
            tags: this.tags,
            authorId: this.authorId,
            status: this.status,
            likeCount: this.likesCount,
        }
    }

}
