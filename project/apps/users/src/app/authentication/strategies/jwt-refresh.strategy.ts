import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from '@project/shared/types';
import { jwtConfig } from '@project/shared/config/users';
import { AuthenticationService } from '../authentication.service';
import { UserEntity } from '../../user/user.entity';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistException } from '../exceptions/token-not-exist.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
        private readonly authService: AuthenticationService,
        private readonly refreshTokenService: RefreshTokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtOptions.refreshTokenSecret,
        });
    }

    public async validate(payload: RefreshTokenPayload): Promise<UserEntity> {
        const isTokenExist = await this.refreshTokenService.isExists(payload.tokenId);

        if (!isTokenExist) {
            throw new TokenNotExistException(payload.tokenId);
        }

        await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
        await this.refreshTokenService.deleteExpiresRefreshTokens()

        return await this.authService.getUserByEmail(payload.email);
    }
}
