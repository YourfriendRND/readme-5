import { Entity } from '@project/shared/core';
import { JWTInterface } from '@project/shared/types';

export class RefreshTokenEntity implements JWTInterface, Entity<string> {
    public createdAt: Date;
    public expiresIn: Date;
    public id?: string;
    public tokenId: string;
    public userId: string;
    [key: string]: unknown;

    constructor(token: JWTInterface) {
        this.populate(token);
    }

    public populate(token: JWTInterface) {
        this.id = token.id;
        this.tokenId = token.tokenId;
        this.userId = token.userId;
        this.createdAt = token.createdAt;
        this.expiresIn = token.expiresIn;
    }

    public toPOJO() {
        return {
            id: this.id,
            tokenId: this.tokenId,
            userId: this.userId,
            createdAt: this.createdAt,
            expiresIn: this.expiresIn,
        }
    }

    static fromObject(data: JWTInterface): RefreshTokenEntity {
        return new RefreshTokenEntity(data);
    }
}
