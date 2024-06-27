import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { APPLICATION_ENVIRONMENTS, Environment } from '@project/shared/constants'

export interface GatewayConfigInterface {
    environment: string;
    port: number;
}


const validationSchema = Joi.object({
    environment: Joi.string().valid(...APPLICATION_ENVIRONMENTS).required(),
    port: Joi.number().required(),
});

function validateConfig(config: GatewayConfigInterface): void {
    const { error } = validationSchema.validate(config);

    if (error) {
        throw new Error(`[GateWay config validation error]: ${error}`);
    }

}

function getConfig(): GatewayConfigInterface {
    const config = {
        environment: process.env['NODE_ENV'] as Environment,
        port: parseInt(process.env['PORT']!, 10),
    };

    validateConfig(config);

    return config;
}

export default registerAs('gateway', getConfig);
