export const DEFAULT_LIMIT_ENTITIES = 50;

export const DEFAULT_APPLICATION_PORT = 3000;

export const DEFAULT_MONGO_DB_PORT = 27017;

export const APPLICATION_ENVAIRONMENTS = [
    'development',
    'production',
    'stage'
] as const;

export type Envaironment = typeof APPLICATION_ENVAIRONMENTS[number];