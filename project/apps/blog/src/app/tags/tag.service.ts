import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDTO } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {

  constructor(
    private readonly tagRepository: TagRepository,
  ) {}

  public async find (limit: number): Promise<TagEntity[]> {
    return await this.tagRepository.find(limit);
  }

  public async createTag (dto: CreateTagDTO): Promise<TagEntity> {
    const tagEntity = new TagEntity(dto);
    const tag = await this.tagRepository.save(tagEntity);

    return tag;
  }

  public async updateTag (id: string, dto: CreateTagDTO): Promise<TagEntity> {
    const tag = new TagEntity(dto);

    const targetTag = this.tagRepository.findById(id);
    
    if (!targetTag) {
      throw new NotFoundException(`Tag with id: ${id} doesn't exist`);
    }

    await this.tagRepository.update(id, tag);
    return tag;
  }


  public async deleteTag(id: string): Promise<void> {
    await this.tagRepository.deleteById(id);
  }
}
