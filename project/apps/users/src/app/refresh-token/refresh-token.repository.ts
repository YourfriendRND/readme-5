import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { RefreshTokenModel } from './refresh.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { JWTInterface } from '@project/shared/types';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
    constructor(
        @InjectModel(RefreshTokenModel.name) private readonly refreshTokenModel: Model<RefreshTokenModel>,
    ) {
        super(refreshTokenModel, RefreshTokenEntity.fromObject)
    }

    public async deleteByTokenId(tokenId: string) {
        return await this.refreshTokenModel
        .deleteOne({ tokenId })
        .exec()
    }

    public async findByTokenId(tokenId: string): Promise<JWTInterface | null> {
        return await this.refreshTokenModel.findOne({
            tokenId
        }).exec();
    }

    public async deleteExpiresTokens() {
        return await this.refreshTokenModel.deleteMany({ expiresIn: { $lt: new Date() }})
    }
}
