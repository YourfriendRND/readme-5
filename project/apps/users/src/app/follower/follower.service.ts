import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FollowerRepository } from './follower.repository';
import { FollowerDTO } from '@project/shared/dto';
import { FollowerEntity } from './follower.entity';

@Injectable()
export class FollowerService {
    constructor(
        private readonly followerRepository: FollowerRepository,
    ) {}

    public async followUser(dto: FollowerDTO): Promise<FollowerEntity> {
        const follower = new FollowerEntity(dto);
        if (follower.followerId === follower.userId) {
            throw new ForbiddenException(`You can't follow to yourself`);
        }

        const existFollower = await this.followerRepository.findFollower(dto);
        
        if (!existFollower) {
            const createFollower = await this.followerRepository.save(follower);
            return createFollower;
        }

        throw new ForbiddenException(`User with id:  ${dto.followerId} has already followed to user with id: ${dto.userId}`);
    }

    public async unfollow(dto: FollowerDTO) {
        const existFollower = await this.followerRepository.findFollower(dto);
        if (existFollower) {
            await this.followerRepository.unfollow(existFollower.id);
            return;
        }

        throw new NotFoundException(`Follower with id: ${dto.followerId} to user with id: ${dto.userId} not found`)
    }

    public async countFollowers(userId: string): Promise<number> {
        return await this.followerRepository.countFollowers(userId);
    }
}
