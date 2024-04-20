import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncFunction } from '@project/shared/helpers';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync(getMailerAsyncFunction('application.mail'))
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
