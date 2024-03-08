import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DEFAULT_APPLICATION_PORT, APPLICATION_ENVIRONMENTS, Environment } from '@project/shared/constants';

export interface FileLoaderConfigInterface { 
  environment: string;
  port: number;
  uploadDirectory: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...APPLICATION_ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_APPLICATION_PORT),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    user: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
})

function validateConfig(config: FileLoaderConfigInterface): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[FileLoader config validation Error]: ${error.message}`)
  }
}

function getConfig(): FileLoaderConfigInterface {
  const config: FileLoaderConfigInterface = {
    environment: process.env['NODE_ENV'] as Environment,
    port: parseInt(process.env['PORT']!, 10),
    uploadDirectory: process.env['UPLOAD_DIRECTORY_PATH']!,
    db: {
      host: process.env['MONGO_HOST']!,
      port: parseInt(process.env['MONGO_PORT']!, 10),
      user: process.env['MONGO_USER']!,
      password: process.env['MONGO_PASSWORD']!,
      name: process.env['MONGO_DB']!,
      authBase: process.env['MONGO_AUTH_BASE']! 
    }
  }

  validateConfig(config);

  return config;
}

export default registerAs('application', getConfig)
