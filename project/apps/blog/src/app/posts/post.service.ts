import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.abstract';
import { LikeDto, PostDTO } from '@project/shared/dto';
import { PostInterface, PostTypes } from '@project/shared/types';
import { TextPostEntity } from './entities/text-post.entity';
import { VideoPostEntity } from './entities/video-post.entity';
import { PhotoPostEntity } from './entities/photo-post.entity';
import { QuotePostEntity } from './entities/quote-post.entity';
import { LinkPostEntity } from './entities/link-post.entity';
import { POST_NOT_FOUND } from '@project/shared/constants';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    private createEntity(dto: PostDTO | PostInterface): PostEntity {
        const post = {
            name: dto.name,
            status: dto.status,
            tags: dto?.tags ?? [],
            authorId: dto.authorId,
            publishedAt: 'publishedAt' in dto ? dto.publishedAt : new Date()
        }
        switch(dto.type) {
            case PostTypes.Link: return new LinkPostEntity({
                ...post,
                type: dto.type,
                url: dto.url,
            })
            case PostTypes.Photo: return new PhotoPostEntity({
                ...post,
                photo: dto.photo,
                type: dto.type,
            })
            case PostTypes.Quote: return new QuotePostEntity({
                ...post,
                type: dto.type,
                quoteAuthorId: dto.quoteAuthorId,
                text: dto.text,
            })
            case PostTypes.Text: return new TextPostEntity({
                ...post,
                type: dto.type,
                text: dto.text,
                announcement: dto.announcement,
            })
            case PostTypes.Video: return new VideoPostEntity({
                ...post,
                type: dto.type,
                videoUrl: dto.videoUrl,
            })
        }
    }

    public async createPost(dto: PostDTO): Promise<PostEntity> {
        const entityPost = this.createEntity(dto);
        const createdPost = await this.postRepository.save(entityPost);

        return createdPost;
    }

    public async updatePost(dto: PostDTO, id: string): Promise<PostEntity> {
        
        const post = await this.postRepository.findById(id);
        const updatedDocument = {
            ...post.toPOJO(),
            ...dto,
        }

        const entityPost = this.createEntity(updatedDocument);

        if (!post) {
            throw new NotFoundException(`${POST_NOT_FOUND} id: ${id}`);
        }

        const updatedPost = await this.postRepository.update(id, entityPost);

        return updatedPost;

    }

    public async findPost(id: string): Promise<PostEntity> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new NotFoundException(`${POST_NOT_FOUND} id: ${id}`);
        }

        post.id = id;
        return post;

    }

    public async find(authorId?: string, sort?: string, limit?: number, page?: number): Promise<PostEntity[]> {
        const posts = await this.postRepository.find(authorId, sort, limit, page);
        return posts;
    }

    public async deletePost(id: string): Promise<void> {
        const post = await this.postRepository.findById(id);

        if  (post) {
            await this.postRepository.deleteById(id)
        }

    }

    public async createRepost(postId: string, repostAuthorId: string): Promise<PostEntity> {

        const isAlreadyReposted = await this.isAlreadyReposted(postId, repostAuthorId);

        if (isAlreadyReposted) {
            throw new ForbiddenException(`Post with id: ${postId} already reposted`);
        }
        
        const originalPost = await this.postRepository.findById(postId);

        if(!originalPost) {
            throw new NotFoundException(`Original post with id: ${postId} not found`);
        }

        const repost = this.createEntity(originalPost);
        repost.originalAuthorId = originalPost.authorId;
        repost.authorId = repostAuthorId;
        repost.isRepost = true;
        repost.status = 'Published';
        repost.id = null;
        repost.publishedAt = undefined;
        repost.originalPostId = postId;

        const post = await this.postRepository.save(repost);

        return post;
    }

    private async isAlreadyReposted(originalPostId: string, repostAuthorId: string): Promise<boolean> {
        const repost = await this.postRepository.findRepost(originalPostId, repostAuthorId);

        return repost ? true : false;
    }

    public async getUserPostCount(authorId: string): Promise<number> {
        return await this.postRepository.countPosts(authorId);
    }

    public async likePost({userId, postId}: LikeDto): Promise<PostEntity> {
        const existLike = await this.postRepository.findUserLike(userId, postId);

        if (existLike) {
            await this.postRepository.dislikePost(existLike.id);
        } else {
            await this.postRepository.likePost(userId, postId);
        }

        return await this.findPost(postId);
    }
}
