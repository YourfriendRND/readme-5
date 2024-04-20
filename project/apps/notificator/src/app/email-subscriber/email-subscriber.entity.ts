import { SubscriberInterface } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class EmailSubscriberEntity implements SubscriberInterface, Entity<string, SubscriberInterface> {
    public id?: string;
    public email: string;
    public firstName: string;
    public lastName: string;

    public toPOJO() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        }
    }

    public populate (data: SubscriberInterface): EmailSubscriberEntity {
        this.id = data.id;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;

        return this;
    }

    static fromObject(data: SubscriberInterface): EmailSubscriberEntity {
        return new EmailSubscriberEntity().populate(data);
    }
} 