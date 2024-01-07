import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';

@Module({
  imports: [PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
