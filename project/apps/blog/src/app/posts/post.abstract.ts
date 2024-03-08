import { Entity } from '@project/shared/core';
import { PostInterface, TagInterface } from '@project/shared/types';

export class PostEntity implements PostInterface, Entity<string> {
    public id?: string;
    public name: string;
    public tags: TagInterface[];
    public authorId?: string;
    public status: string;
    public likesCount: number;
    public type: string;
    public announcement?: string;
    public text?: string;
    public url?: string;
    public quoteAuthorId?: string;
    public photo?: string;
    public videoUrl?: string;

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
        this.type = post.type;
        this.announcement = post.announcement;
        this.text = post.text;
        this.url = post.url;
        this.quoteAuthorId = post.quoteAuthorId;
        this.photo = post.photo;
        this.videoUrl = post.videoUrl;
    }

    public toPOJO() {
        return {
            id: this.id,
            name: this.name,
            tags: this.tags,
            status: this.status,
            likesCount: this.likesCount,
            type: this.type,
            authorId: this.authorId,
            announcement: this.announcement !== null ? this.announcement : undefined,
            text: this.text  !== null ? this.text : undefined,
            url: this.url !== null ? this.url : undefined,
            quoteAuthorId: this.quoteAuthorId !== null ? this.quoteAuthorId : undefined,
            photo: this.photo !== null ? this.photo : undefined,
            videoUrl: this.videoUrl !== null ? this.videoUrl : undefined,
        }
    }

    static fromObject (data: PostInterface): PostEntity {
      return new PostEntity(data);
    }
}
