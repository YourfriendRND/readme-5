import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitRouting } from '@project/shared/types';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
    constructor(
        private readonly emailSubscriberService: EmailSubscriberService,
        private readonly mailService: MailService
    ) {}

    @RabbitSubscribe({
        exchange: 'readme.notificator.income',
        routingKey: RabbitRouting.AddSubscriber,
        queue: 'readme.notificator.income'
    })
    public async create(subscriber: CreateSubscriberDTO): Promise<void> {
        this.emailSubscriberService.addSubscriber(subscriber);
        this.mailService.sendNotificationToNewSubscriber(subscriber);
    }
}