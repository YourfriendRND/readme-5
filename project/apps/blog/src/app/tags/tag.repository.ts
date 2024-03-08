import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/config/blog';
import { BasePrismaRepository } from '@project/shared/core';
import { TagInterface } from '@project/shared/types';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagRepository extends BasePrismaRepository<TagEntity, TagInterface> {

  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, TagEntity.fromObject)
  }

  public async save(entity: TagEntity): Promise<TagEntity> {
    const createdDocument = await this.client.tag.create({
      data: {
        ...entity,
      },
    });

    return this.createEntityFromDocument(createdDocument);
  }

  public async findById(id: string): Promise<TagEntity> {
    const document = await this.client.tag.findFirst({
      where: { id: id },
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: { id: id }
    })
  }

  public async update(id: string, entity: TagEntity): Promise<TagEntity> {
    const document = await this.client.tag.update({
      where: { id: id },
      data: {
        ...entity
      }
    })

    return this.createEntityFromDocument(document);
  }

  public async find(limit: number): Promise<TagEntity[]> {
    const documents = await this.client.tag.findMany({
      take: limit
    });

    return documents.map((doc) => this.createEntityFromDocument(doc));
  }
}
