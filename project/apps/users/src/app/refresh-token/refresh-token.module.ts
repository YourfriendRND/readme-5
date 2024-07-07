import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema, RefreshTokenModel } from './refresh.model';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RefreshTokenModel.name, schema: RefreshTokenSchema }
        ])
    ],
    providers: [
        RefreshTokenRepository,
        RefreshTokenService
    ],
    exports: [
        RefreshTokenService
    ],
})
export class RefreshTokenModule {}
