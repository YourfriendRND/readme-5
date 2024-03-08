import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DEFAULT_MONGO_DB_PORT } from '@project/shared/constants';

export interface MongoConfigInterface {
    port: number;
    host: string;
    dbName: string;
    userName: string;
    password: string;
    authBase: string;
}

const mongodbValidationSchema = Joi.object({
    port: Joi.number().port().default(DEFAULT_MONGO_DB_PORT),
    host: Joi.string().hostname().required(),
    dbName: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
})

function validateMongoConfig(config: MongoConfigInterface): void {
    const { error } = mongodbValidationSchema.validate(config, { abortEarly: true });

    if (error) {
        throw new Error(`[MongoDB config Validation Error]: ${error.message}`)
    }
}

function getMongoDBConfig(): MongoConfigInterface {
    const config: MongoConfigInterface = {
        port: parseInt(process.env['MONGO_PORT'] || `${DEFAULT_MONGO_DB_PORT}`, 10),
        host: process.env['MONGO_HOST']!,
        dbName: process.env['MONGO_DB']!,
        userName: process.env['MONGO_USER']!,
        password: process.env['MONGO_PASSWORD']!,
        authBase: process.env['MONGO_AUTH_BASE']!,
    }

    validateMongoConfig(config);
    return config;
}

export default registerAs('mongodb', getMongoDBConfig);
