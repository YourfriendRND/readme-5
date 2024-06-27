import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlogController } from './blog.controller';
import { UserController } from './user.controller';
import { CommentBlogController } from './comment-blog.controller';
import { HTTP_CLIENT_MAX_REDIRECT, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { GatewayConfigModule } from '@project/shared/config/gateway';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECT
    }),
    GatewayConfigModule
  ],
  controllers: [
    BlogController,
    UserController,
    CommentBlogController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
