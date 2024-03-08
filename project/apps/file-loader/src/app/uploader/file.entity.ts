import { DefaultPojoType, Entity } from '@project/shared/core';
import { FileInterface } from '@project/shared/types';

export class FileEntity implements FileInterface, Entity<string> {
    public id?: string;
    public originalName: string;
    public subDirectory: string;
    public size: number;
    public mimetype: string;
    public hashName: string;
    public path: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(file: FileInterface) {
        this.populate(file);
    }
    
    public populate(file: FileInterface): void {
        this.id = file.id;
        this.originalName = file.originalName;
        this.subDirectory = file.subDirectory;
        this.size = file.size;
        this.mimetype = file.mimetype;
        this.hashName = file.hashName;
        this.path = file.path;
        this.createdAt = file.createdAt;
        this.updatedAt = file.updatedAt;
    }
    
    public toPOJO(): DefaultPojoType {
        return {
            id: this.id,
            originalName: this.originalName,
            subDirectory: this.subDirectory,
            size: this.size,
            mimetype: this.mimetype,
            hashName: this.hashName,
            path: this.path,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    static fromObject(file: FileInterface): FileEntity {
        return new FileEntity(file);
    }
}
