import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PrismaClientModule } from '@project/shared/config/blog';

@Module({
    imports: [PrismaClientModule],
    controllers: [PostController],
    providers: [PostService, PostRepository],
    exports: [],
})
export class PostModule {}
