import 'multer';
import dayjs from 'dayjs';
import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import { fileLoaderConfig } from '@project/shared/config/file-loader-up';
import { FileRepository } from './file.repository';
import { StoredFileInterface } from '@project/shared/types';
import { FileEntity } from './file.entity';

@Injectable()
export class FileUploaderService {
    private readonly logger = new Logger(FileUploaderService.name);
    private readonly DATE_FORMAT = 'YYYY MM';

    constructor(
        @Inject(fileLoaderConfig.KEY) private readonly config: ConfigType<typeof fileLoaderConfig>,
        private readonly fileRepository: FileRepository,
    ) {}

    private getUploadDirectoryPath(): string {
        return this.config.uploadDirectory;
    }

    private getSubUploadDirectoryPath(): string {
        const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
        return join(year, month);
    }

    private getDestinationFilePath(filename: string): string {
        return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
    }

    public async writeFile(file: Express.Multer.File): Promise<StoredFileInterface> {
        try {
            const uploadDirectoryPath = this.getUploadDirectoryPath();
            const subDirectory = this.getSubUploadDirectoryPath();
            const fileExtension = extension(file.mimetype);
            const filename = `${randomUUID()}.${fileExtension}`;          
            const path = this.getDestinationFilePath(filename);
            await ensureDir(join(uploadDirectoryPath, subDirectory));
            await writeFile(path, file.buffer);

            return {
                filename,
                fileExtension,
                subDirectory,
                path,
            }
        } catch (error) {
            this.logger.error(`Error while writing file, ${error.message}`);
            throw new Error(`Can't write file`);
        }
    }

    public async saveFile(file: Express.Multer.File): Promise<FileEntity> {
        try {
            const storedFile = await this.writeFile(file);
            const fileEntity = new FileEntity({
                hashName: storedFile.filename,
                mimetype: file.mimetype,
                originalName: file.originalname,
                path: storedFile.path,
                size: file.size,
                subDirectory: storedFile.subDirectory,
            })
   

            return this.fileRepository.save(fileEntity);

        } catch (error) {
            this.logger.error(`Error while saving file:  ${error.message}`);
            throw new Error('Could not save file');
        }
    }

    public async getFile(fileId: string): Promise<FileEntity> {
        const file = await this.fileRepository.findById(fileId);
        
        if (!file) {
            throw new NotFoundException(`File with id: ${fileId} doesn't exist`);
        }

        return file;
    }
}