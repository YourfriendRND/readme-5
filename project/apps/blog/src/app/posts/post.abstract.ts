import { Entity } from '@project/shared/core';
import { PostInterface, TagInterface, CommentInterface } from '@project/shared/types';

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
    public quotedText?: string;
    public photo?: string;
    public videoUrl?: string;
    public publishedAt: Date;
    public isRepost?: boolean;
    public originalAuthorId?: string;
    public originalPostId?: string;
    public comments?: CommentInterface[]

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
        this.quotedText = post.quotedText;
        this.photo = post.photo;
        this.videoUrl = post.videoUrl;
        this.publishedAt = post.publishedAt;
        this.isRepost = post.isRepost;
        this.originalAuthorId = post.originalAuthorId;
        this.originalPostId = post.originalPostId;
        this.comments = post.comments;
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
            quotedText: this.quotedText !== null ? this.quotedText : undefined,
            photo: this.photo !== null ? this.photo : undefined,
            videoUrl: this.videoUrl !== null ? this.videoUrl : undefined,
            publishedAt: this.publishedAt,
            isRepost: this.isRepost,
            originalAuthorId: this.originalAuthorId,
            originalPostId: this.originalPostId,
            comments: this.comments,
        }
    }

    static fromObject (data: PostInterface): PostEntity {
      return new PostEntity(data);
    }
}
