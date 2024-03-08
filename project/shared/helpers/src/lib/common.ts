import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { MongoConnectionInput } from '@project/shared/types';

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
