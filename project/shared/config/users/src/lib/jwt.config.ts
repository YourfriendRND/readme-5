import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface JWTConfig {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
}

const validationSchema = Joi.object({
    accessTokenSecret: Joi.string().required(),
    accessTokenExpiresIn: Joi.string().required(),
})

function validationConfig(config: JWTConfig): void {
    const { error } = validationSchema.validate(config, { abortEarly: true });
    if (error) {
        throw new Error(`[Account JWTconfig validation Error]: ${error.message}`);
    }
}

function getConfig(): JWTConfig {
    const config: JWTConfig = {
        accessTokenSecret: process.env['JWT_ACCESS_TOKEN_SECRET']!,
        accessTokenExpiresIn: process.env['JWT_ACCESS_EXPIRES_IN']!
    };

    validationConfig(config);
    return config;
}

export default registerAs('jwt', getConfig);
