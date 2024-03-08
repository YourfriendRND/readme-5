import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/shared/config/users';

@Module({
  imports: [
    AuthenticationModule, 
    ConfigUsersModule, 
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
