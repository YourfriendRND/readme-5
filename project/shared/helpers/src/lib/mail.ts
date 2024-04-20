import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';

export function getMailerAsyncFunction (optionSpase: string): MailerAsyncOptions {
    return {
        useFactory: async (config: ConfigService) => {
            return {
                transport: {
                    host: config.get<string>(`${optionSpase}.host`),
                    port: config.get<number>(`${optionSpase}.port`),
                    secure: false,
                    auth: {
                        user: config.get<string>(`${optionSpase}.user`),
                        pass: config.get<string>(`${optionSpase}.password`),

                    }
                },
                defaults: {
                    from: config.get<string>('mail.from'),
                },
                template: {
                    dir: resolve(__dirname, 'assets'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    }
                }
            }
        },
        inject: [ConfigService]
    }
}
