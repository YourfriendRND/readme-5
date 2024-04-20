import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {NotificatorConfig} from '@project/shared/config/notificator';
import { ConfigType } from '@nestjs/config';
import { SubscriberInterface } from '@project/shared/types';
import { EMAIL_ADDED_SUBSCRIBER_SUBJECT } from '@project/shared/constants';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    @Inject(NotificatorConfig.KEY)
    private readonly notificatorConfig: ConfigType<typeof NotificatorConfig>

    public async sendNotificationToNewSubscriber(subscriber: SubscriberInterface): Promise<void> {
        await this.mailerService.sendMail({
            from: this.notificatorConfig.mail.from,
            to: subscriber.email,
            subject: EMAIL_ADDED_SUBSCRIBER_SUBJECT,
            template: './add-subscriber.hbs',
            context: {
                user: `${subscriber.firstName} ${subscriber.lastName}`,
                email: `${subscriber.email}`,
            }
        })
    }

}
