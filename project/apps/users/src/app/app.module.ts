import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/shared/config/users';
import { NotifyModule } from './notify/notify.module';
import { FollowerModule } from './follower/follower.module';

@Module({
  imports: [
    AuthenticationModule, 
    ConfigUsersModule, 
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule,
    FollowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
