import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(
      userModel,
      UserEntity.fromObject
    );
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const targetUser = await this.model.findOne({ email }).exec();
    const user = new UserEntity({
      id: targetUser._id.toString(),
      ...targetUser.toObject()
    });
    
    return user;
  }

}
