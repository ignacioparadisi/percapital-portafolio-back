import { Entity } from '@Common/Entities/Entity';
import { ArrayEntity, OrderBy } from '@Common/types';

export type BatchQueryData = {
  parentIdName: string;
  values: number[];
};

export type getWithCount<T extends Entity> = {
  where: T;
  limit?: number;
  skip?: number;
  select?: any;
  orQuery?: T[];
  partialOrSearch?: boolean;
  inQuery?: ArrayEntity<T>;
  notEqualParams?: T;
};

export type get<T extends Entity> = {
  where: T;
  limit?: number;
  skip?: number;
  select?: any;
  inQuery?: ArrayEntity<T>;
  batch?: BatchQueryData;
  orderBy?: OrderBy<T>;
  block?: string;
};

export interface QueryBuilder<T extends Entity> {
  get(params: get<T>): Promise<T[]>;

  create(entity: T): Promise<T>;

  /** Validates and inserts the received entities in a single transaction. */
  createAll(entities: T[]): Promise<T[]>;

  update(where: T, entity: T): Promise<T>;

  delete(
    entity: T,
    deleteSingleProperty?: { name: string; value: any }
  ): Promise<number>;

  getWithCount(
    params: getWithCount<T>
  ): Promise<{ count: number; entities: T[] }>;

  getWithJoin(where: T, joinParams: any): Promise<T | void>;
}