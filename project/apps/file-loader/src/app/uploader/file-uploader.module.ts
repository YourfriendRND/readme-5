import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';
import { SERVE_ROOT } from '@project/shared/constants';
import { FileRepository } from './file.repository';
import { FileModel, FileSchema } from './file.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: FileModel.name,  schema: FileSchema }
        ]),
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const rootPath = configService.get<string>('application.uploadDirectory');
                return [{
                    rootPath,
                    serveRoot: SERVE_ROOT,
                    serveStaticOptions: {
                        fallthrough: true,
                        etag: true,
                    }
                }]
            }
        })
    ],
    controllers: [FileUploaderController],
    providers: [FileUploaderService, FileRepository],
    exports: []
})
export class FileUploaderModule {}