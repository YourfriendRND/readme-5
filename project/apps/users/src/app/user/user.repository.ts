import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends BaseMemoryRepository<UserEntity> {
  protected entities: Map<string, UserEntity> = new Map();

  constructor() {
    super();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((user) => user.email === email);
    return user || null;
  }

}
