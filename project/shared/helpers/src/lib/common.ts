import { ClassTransformOptions, plainToInstance } from 'class-transformer';

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
