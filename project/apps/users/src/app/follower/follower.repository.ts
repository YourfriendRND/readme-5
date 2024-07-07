import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/shared/core';
import { FollowerEntity } from './follower.entity';
import { FollowerModel } from './follower.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FollowerInterface } from '@project/shared/types';

@Injectable()
export class FollowerRepository extends BaseMongoRepository<FollowerEntity, FollowerModel> {
    constructor(
        @InjectModel(FollowerModel.name)
        private readonly followerModel: Model<FollowerModel>
    ) {
        super(
            followerModel,
            FollowerEntity.fromObject
        )
    }

    public async findFollower({ userId, followerId }: FollowerInterface): Promise<FollowerEntity | null> {
        const follower = await this.followerModel.findOne({ userId, followerId });
        if (follower) {
            return new FollowerEntity(follower);
        }

        return null;
    }

    public async unfollow(subscriptionId: string) {
        await this.followerModel.findByIdAndDelete(subscriptionId);
    }

    public async countFollowers(userId: string): Promise<number> {
        return await this.followerModel.countDocuments({ userId });
    }
}
