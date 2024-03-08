import { genSalt, hash, compare } from 'bcrypt';
import { AuthUserInterface } from '@project/shared/types';
import { Entity } from '@project/shared/core';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity implements AuthUserInterface, Entity<string> {
  public id?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatar: string;
  public followers: number;
  public posts: number;
  public passwordHash: string;

  constructor(user: AuthUserInterface) {
    this.populate(user);
  }

  // TODO: Типизировать
  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      followers: this.followers,
      posts: this.posts,
      passwordHash: this.passwordHash,
    }
  }

  public populate(user: AuthUserInterface): void {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatar = user.avatar;
    this.followers = user.followers;
    this.posts = user.posts;
    this.passwordHash = user.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUserInterface): UserEntity {
    return new UserEntity(data);
  }
}
