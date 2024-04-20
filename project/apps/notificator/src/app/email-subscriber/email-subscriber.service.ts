import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
    constructor(
        private readonly emailSubscriberRepository: EmailSubscriberRepository
    ) {}

    public async addSubscriber(subscriber: CreateSubscriberDTO): Promise<EmailSubscriberEntity> {
        const { email } = subscriber;

        const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);
        
        if (existSubscriber) {
            return existSubscriber;
        }

        return await this.emailSubscriberRepository.save(
            new EmailSubscriberEntity().populate(subscriber)
        )
    }
}