import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { DEFAULT_RABBIT_PORT } from '@project/shared/constants';

export interface RabbitConfig {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
}

const validationSchema = Joi.object({
    host: Joi.string().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().required(),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required()
})

function validateConfig(config: RabbitConfig): void {
    const { error } = validationSchema.validate(config);

    if (error) {
        throw new Error(`[Rabbit config validation error]: ${error.message}`);
    }
}
 
function getConfig(): RabbitConfig {
    const config = {
        host: process.env['RABBITMQ_HOST']!,
        password: process.env['RABBITMQ_DEFAULT_PASS']!,
        user: process.env['RABBITMQ_DEFAULT_USER']!,
        queue: process.env['RABBITMQ_QUEUE']!,
        exchange: process.env['RABBITMQ_EXCHANGE']!,
        port: parseInt(process.env['RABBITMQ_PORT']!, 10) ?? DEFAULT_RABBIT_PORT
    }

    validateConfig(config);

    return config;
}

export default registerAs('rabbit', getConfig)
