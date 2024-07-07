import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowerModel, FollowerSchema } from './follower.model';
import { FollowerRepository } from './follower.repository';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FollowerModel.name, schema: FollowerSchema }
        ]),
        UserModule,
    ],
    controllers: [FollowerController],
    providers: [FollowerRepository, FollowerService],
    exports: [FollowerService],
})
export class FollowerModule {}
