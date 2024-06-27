import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { RefreshTokenRepository } from './refresh-token.repository';
import { jwtConfig } from '@project/shared/config/users';
import { RefreshTokenPayload } from '@project/shared/types';
import { parseTime } from '@project/shared/helpers';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository,
        @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
    ) {}

    public async createRefreshSession(payload: RefreshTokenPayload): Promise<RefreshTokenEntity> {
        const time = parseTime(this.jwtOptions.refreshTokenExpiresIn);
        const refreshToken = new RefreshTokenEntity({
            tokenId: payload.tokenId,
            createdAt: new Date(),
            userId: payload.id,
            expiresIn: dayjs().add(time.value, time.unit).toDate()
        });

        return await this.refreshTokenRepository.save(refreshToken);
    }

    public async deleteRefreshSession(tokenId: string) {
        await this.deleteExpiresRefreshTokens();
        return this.refreshTokenRepository.deleteByTokenId(tokenId);
    }

    public async isExists(tokenId: string): Promise<boolean> {
        const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);

        return refreshToken !== null;
    }

    public async deleteExpiresRefreshTokens() {
        return await this.refreshTokenRepository.deleteExpiresTokens();
    }
}
