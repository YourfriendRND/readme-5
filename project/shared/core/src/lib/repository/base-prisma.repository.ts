import { PrismaClientService } from '@project/shared/config/blog';
import { Entity, EntityIdType, DefaultPojoType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BasePrismaRepository<
  EntityType extends Entity<EntityIdType, DocumentType>,
  DocumentType = DefaultPojoType,
> implements Repository<EntityType, DocumentType> {

  constructor(
    protected readonly prismaClient: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) {}

  protected createEntityFromDocument(document: DocumentType): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document);
  }

  abstract findById(id: EntityType['id']): Promise<EntityType>

  abstract save(entity: EntityType): Promise<EntityType>

  abstract update(id: EntityType['id'], entity: EntityType): Promise<EntityType>

  abstract deleteById(id: EntityType['id']): Promise<void>
}

