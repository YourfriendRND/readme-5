import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from './uploader/file-uploader.module';
import { FileLoaderConfigModule, getMongooseOptions } from '@project/shared/config/file-loader-up';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    FileLoaderConfigModule,
    FileUploaderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
