import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { 
    DEFAULT_APPLICATION_PORT, 
    APPLICATION_ENVIRONMENTS, 
    Environment,
    DEFAULT_RABBIT_PORT, 
    DEFAULT_SMTP_PORT
} from '@project/shared/constants';

export interface NotificatorConfigInterface {
    environment: string;
    port: number;
    db: {
        host: string;
        port: number;
        user: string;
        name: string;
        password: string;
        authBase: string;
    },
    rabbit: {
        host: string;
        password: string;
        user: string;
        queue: string;
        exchange: string;
        port: number;
    },
    mail: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    }
}

const validationSchema = Joi.object({
    environment: Joi.string().valid(...APPLICATION_ENVIRONMENTS).required(),
    port: Joi.number().port().default(DEFAULT_APPLICATION_PORT),
    db: Joi.object({
        host: Joi.string().valid().hostname(),
        port: Joi.number().port(),
        name: Joi.string().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
        authBase: Joi.string().required(),
    }),
    rabbit: Joi.object({
        host: Joi.string().valid().hostname().required(),
        password: Joi.string().required(),
        user: Joi.string().required(),
        queue: Joi.string().required(),
        exchange: Joi.string().required(),
        port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    }),
    mail: Joi.object({
        host: Joi.string().valid().hostname().required(),
        port: Joi.number().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
        from: Joi.string().required(),
    }).required()
})

function validateConfig(config: NotificatorConfigInterface): void {
    const { error } = validationSchema.validate(config, { abortEarly: true });

    if (error) {
        throw new Error(`[Notificator config validation error]: ${error.message}`);
    }
}

function getConfig(): NotificatorConfigInterface {
    const config: NotificatorConfigInterface = {
        environment: process.env['NODE_ENV'] as Environment,
        port: parseInt(process.env['PORT'] || `${DEFAULT_APPLICATION_PORT}`, 10),
        db: {
            host: process.env['MONGO_HOST']!,
            port: parseInt(process.env['MONGO_PORT']!, 10),
            user: process.env['MONGO_USER']!,
            name: process.env['MONGO_DB']!,
            password: process.env['MONGO_PASSWORD']!,
            authBase: process.env['MONGO_AUTH_BASE']!,
        },
        rabbit: {
            host: process.env['RABBITMQ_HOST']!,
            password: process.env['RABBITMQ_DEFAULT_PASS']!,
            user: process.env['RABBITMQ_DEFAULT_USER']!,
            queue: process.env['RABBITMQ_QUEUE']!,
            exchange: process.env['RABBITMQ_EXCHANGE']!,
            port: parseInt(process.env['RABBITMQ_PORT']!, 10) ?? DEFAULT_RABBIT_PORT,
        },
        mail: {
            host: process.env['MAIL_SMTP_HOST']!,
            port: parseInt(process.env['MAIL_SMTP_PORT']!, 10) ?? DEFAULT_SMTP_PORT,
            user: process.env['MAIL_USER_NAME']!,
            password: process.env['MAIL_USER_PASSWORD']!,
            from: process.env['MAIL_FROM']!,
        }
    }

    validateConfig(config);

    return config;
}

export default registerAs('application', getConfig)
