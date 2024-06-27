import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { MongoConnectionInput } from '@project/shared/types';
import { TimeAndUnit, DateTimeUnit } from '@project/shared/types';

type PlainObject = Record<string, unknown>;

export function fillDTO<T, V extends PlainObject>(
  dtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T

export function fillDTO<T, V extends PlainObject[]>(
  dtoClass: new () => T,
  plainObject: V,
  options: ClassTransformOptions,
): T[]

export function fillDTO<T, V extends PlainObject>(
  dtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(dtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  })
}

export function getMongoConnectionString({username, password, host, port, dbName, authDataBase}: MongoConnectionInput): string {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authDataBase}`;
}

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);
  
  if (!match) {
    throw new Error(`[parseTime] bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;

  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
  
}

export function getForbiddenPostMessage(method: string, entity: string): string {
  switch (method) {
    case 'PATCH': return `It's impossible to update someone else's ${entity}`;
    case 'DELETE': return `It's impossible to delete someone else's ${entity}`;
    default: throw new Error('Unknown Http method of request');
  }
}
