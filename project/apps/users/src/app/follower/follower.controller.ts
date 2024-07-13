import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerDTO } from '@project/shared/dto';
import { fillDTO } from '@project/shared/helpers';
import { FollowerRDO } from '@project/shared/rdo';

@Controller('followers')
export class FollowerController {

    constructor(
        private readonly followerService: FollowerService,
    ) {}

    @Post('/')
    public async follow(
        @Body() followerDto: FollowerDTO
    ) {
       const follower = await this.followerService.followUser(followerDto);
       return fillDTO(FollowerRDO, follower.toPOJO());
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('unfollow/:userId')
    public async unfollow(
        @Body() followerDto: FollowerDTO
    ) {
        await this.followerService.unfollow(followerDto);
    }

}
