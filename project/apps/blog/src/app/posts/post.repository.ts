import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { PostEntity } from './post.abstract';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
    protected entities: Map<string, PostEntity> = new Map();

    public find(limit: number): PostEntity[] {
        return Array.from(this.entities)
            .slice(0, limit)
            .map(([id, post]) => {
                post.id = id;
                return post;
            })
        
    }

    public 
}
