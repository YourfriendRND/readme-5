import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { FollowerInterface } from '@project/shared/types';

@Schema({
    collection: 'followers',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class FollowerModel extends Document implements FollowerInterface {
    public id?: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    public userId: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    public followerId: string;

}

export const FollowerSchema = SchemaFactory.createForClass(FollowerModel);

FollowerSchema.virtual('id').get(function () {
    return this._id.toString()
})
