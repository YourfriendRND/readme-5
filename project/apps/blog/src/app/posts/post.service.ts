import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.abstract';
import { PostDTO } from './dto/post.dto';
import { PostTypes } from '@project/shared/types';
import { TextPostEntity } from './entities/text-post.entity';
import { VideoPostEntity } from './entities/video-post.entity';
import { PhotoPostEntity } from './entities/photo-post.entity';
import { QuotePostEntity } from './entities/quote-post.entity';
import { LinkPostEntity } from './entities/link-post.entity';
import { POST_NOT_FOUND } from './post.constant';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    private createEntity(dto: PostDTO): PostEntity {
        const post = {
            name: dto.name,
            status: dto.status,
            tags: dto.tags,
            authorId: dto.authorId,
            likesCount: 0
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
                quoteAuthor: dto.quoteAuthor,
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
        const entityPost = this.createEntity(dto);

        const post = await this.postRepository.findById(id);
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

    public async find(limit: number): Promise<PostEntity[]> {
        const posts = await this.postRepository.find(limit);
        return posts;
    }

    public async deletePost(id: string): Promise<void> {
        const post = this.postRepository.findById(id);

        if  (!post) {
            throw new NotFoundException(`${POST_NOT_FOUND} id: ${id}`);
        }

        await this.postRepository.deleteById(id)
    }

}
