export const DEFAULT_LIMIT_ENTITIES = 50;

export const DEFAULT_APPLICATION_PORT = 3000;

export const DEFAULT_MONGO_DB_PORT = 27017;

export const APPLICATION_ENVIRONMENTS = [
    'development',
    'production',
    'stage'
] as const;

export type Environment = typeof APPLICATION_ENVIRONMENTS[number];

export const SERVE_ROOT = '/static';

export const DEFAULT_RABBIT_PORT = 5672;
