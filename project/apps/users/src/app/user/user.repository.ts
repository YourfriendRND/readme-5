import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { FollowerService } from '../follower/follower.service';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    @InjectModel(UserModel.name) userModel: Model<UserModel>,
  ) {
    super(
      userModel,
      UserEntity.fromObject
    );
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await super.findById(id);
    
    if (user) {
      user.id = id;
    }

    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const targetUser = await this.model.findOne({ email }).exec();
    
    if(!targetUser) {
      return null;
    }
    const userId = targetUser._id.toString();
  
    const user = new UserEntity({
      id: userId,
      ...targetUser.toObject(),

    });
    
    return user;
  }

  // public async addFollower(userId: string, followerId: string) {
  //   const user = await super.findById(userId);

  //   if (!user) {
  //     throw new NotFoundException(`User with id: ${userId} doesn't exist`);
  //   }

  //   const follower = await super.findById(followerId);

  //   if (!follower) {
  //     throw new NotFoundException(`Follower with id: ${followerId} doesn't exist`);
  //   }

  //   await this.model.updateOne({
  //     _id: user.id,
  //   }, {
  //     $addToSet: {
  //       followers: follower.id,
  //     }
  //   }, {new: true});

  //   user.followers = user.followers + 1;

  //   return user;
  // }
  
  // public async find(id: string) {
  //   return await this.model.aggregate([
  //     { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } } },
  //     {
  //       $project: {
  //         followers: { $size: '$followers' }
  //       }
  //     }
  //   ])
  // }
}
