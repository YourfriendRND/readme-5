import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { JWTInterface } from '@project/shared/types';

@Schema({
    timestamps: true,
    collection: 'refresh-sessions'
})
export class RefreshTokenModel extends Document implements JWTInterface {

    @Prop()
    public createdAt: Date;

    @Prop({
        required: true,
    })
    public tokenId: string;

    @Prop({
        required: true,
    })
    public userId: string;

    @Prop({
        required: true,
    })
    public expiresIn: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);
