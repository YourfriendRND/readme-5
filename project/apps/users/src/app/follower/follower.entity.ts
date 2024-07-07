import { FollowerInterface } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class FollowerEntity implements FollowerInterface, Entity<string> {
    public id?: string;

    public followerId: string;

    public userId: string;

    constructor(follower: FollowerInterface) {
        this.populate(follower);
    }

    public populate(follower: FollowerInterface): void {
        this.id = follower.id;
        this.followerId = follower.followerId;
        this.userId = follower.userId;
    }

    public toPOJO() {
        return {
            id: this.id,
            followerId: this.followerId,
            userId: this.userId,
        }
    }

    static fromObject(data: FollowerInterface): FollowerEntity {
        return new FollowerEntity(data);
    }

}
