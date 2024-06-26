import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { APPLICATION_ENVIRONMENTS, DEFAULT_APPLICATION_PORT, Environment } from '@project/shared/constants';

export interface ApplicationConfigInterface {
    port: number;
    envaironment: string;
}

const validationSchema = Joi.object({
    port: Joi.number().port().default(DEFAULT_APPLICATION_PORT),
    envaironment: Joi.string().valid(...APPLICATION_ENVIRONMENTS).required()
})

function validateConfig(config: ApplicationConfigInterface): void {
    const { error } = validationSchema.validate(config, { abortEarly: true });

    if (error) {
        throw new Error(`[Application Config Validation Error]: ${error.message}`)
    }
}

function getConfig(): ApplicationConfigInterface {
    const config = {
        port: parseInt(process.env['PORT']!, 10),
        envaironment: process.env['NODE_ENV'] as Environment,
    }

    validateConfig(config);

    return config;
}

export default registerAs('application', getConfig);
