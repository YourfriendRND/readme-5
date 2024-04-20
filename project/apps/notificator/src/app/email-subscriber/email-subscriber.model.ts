import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriberInterface } from '@project/shared/types'; 

@Schema({
    collection: 'email-subscribers',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
    @Prop({
        required: true,
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

    public id?: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function () {
    return this._id.toString()
})