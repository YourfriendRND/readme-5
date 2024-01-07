export type EntityIdType = string;

export interface Entity<T extends EntityIdType> {
  id?: T;
  toPOJO(): Record<string, unknown>
}
