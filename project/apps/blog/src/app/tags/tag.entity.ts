import { Entity, EntityIdType } from '@project/shared/core';
import { TagInterface } from '@project/shared/types';

export class TagEntity implements TagInterface, Entity<EntityIdType> {
  public id?: string;
  public name: string;

  constructor(tag: TagInterface) {
    this.populate(tag);
  }

  public populate(tag: TagInterface): void {
    this.id = tag.id;
    this.name = tag.name;
  }

  public toPOJO() {
    return {
      id: this.id,
      name: this.name,
    }
  }

  static fromObject(data: TagInterface): TagEntity {
    return new TagEntity(data);
  }

}
