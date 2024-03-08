import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInterface } from '@project/shared/types';
import { AuthUserInterface } from '@project/shared/types';

@Schema({
    collection: 'users',
    timestamps: true,
})
export class UserModel extends Document implements  UserInterface, AuthUserInterface {
    @Prop({
        required: true,
        unique: true,
    })
    public email: string;

    @Prop({
        required: true,
    })
    public firstName: string;

    @Prop({
        required: true,
    })
    public lastName: string;

    @Prop({
        required: true,
    })
    public passwordHash: string;

    @Prop({
        default: 0
    })
    public followers: number;

    @Prop({
        default: 0
    })
    public posts: number;

    @Prop()
    public avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
