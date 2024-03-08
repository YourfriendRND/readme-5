import 'multer';
import { Express } from 'express';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from './file-uploader.service';
import { fillDTO } from '@project/shared/helpers';
import { MongoIdValidationPipe } from '@project/shared/core';
import { FileEntity } from './file.entity';
import { FileRDO } from './rdo/file.rdo';

@Controller('files')
export class FileUploaderController {
    constructor(private readonly fileUploaderService: FileUploaderService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFiles(
        @UploadedFile() file: Express.Multer.File
    ): Promise<FileRDO> {
        const savedFile = await this.fileUploaderService.saveFile(file);
        return fillDTO(FileRDO, savedFile.toPOJO());
    }

    @Get(':fileId')
    public async show(@Param('fileId', MongoIdValidationPipe) fileId: string): Promise<FileRDO> {
        const file = await this.fileUploaderService.getFile(fileId);
        return fillDTO(FileRDO, file.toPOJO())
    }
}
