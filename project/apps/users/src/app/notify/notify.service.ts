import { Injectable, Inject } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from '@project/shared/config/users';
import { RabbitRouting } from '@project/shared/types';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

@Injectable()
export class NotifyService {
    constructor(
        private readonly rabbitClient: AmqpConnection,
        @Inject(rabbitConfig.KEY) 
        private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
    ) {}

    public async registerSubscriber(
        dto: CreateSubscriberDTO
    ): Promise<boolean> {
        return this.rabbitClient.publish<CreateSubscriberDTO>(
            this.rabbitOptions.exchange,
            RabbitRouting.AddSubscriber,
            {...dto}
        )
    }
}
