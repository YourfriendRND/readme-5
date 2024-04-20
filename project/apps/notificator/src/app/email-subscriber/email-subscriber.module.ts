import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberSchema, EmailSubscriberModel } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/helpers';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: EmailSubscriberModel.name, schema: EmailSubscriberSchema}
        ]),
        RabbitMQModule.forRootAsync(
            RabbitMQModule,
            getRabbitMQOptions('application.rabbit')
        ),
        MailModule
    ],
    controllers: [EmailSubscriberController],
    providers: [
        EmailSubscriberRepository,
        EmailSubscriberService
    ],
})
export class EmailSubscriberModule {}