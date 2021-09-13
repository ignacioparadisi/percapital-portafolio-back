import { Entity } from '@Common/Entities/Entity';
import {
  BatchQueryData,
  QueryBuilder,
} from '@Persistence/Database/QueryBuilder';
import { IDAO } from './IDAO';
import { KnexQueryBuilder } from '@Persistence/Database/KnexQueryBuilder';
import { getDBInstance } from '@Persistence/Database/DB';

export abstract class DAO<T extends Entity> implements IDAO<Entity> {
  database: QueryBuilder<T>;

  constructor(entity: Entity) {
    this.database = new KnexQueryBuilder(entity, getDBInstance());
  }

  abstract create(entity: T): Promise<T>;

  abstract delete(entity: T): Promise<number>;

  abstract get(
    where: T,
    limit?: number,
    skip?: number,
    batch?: BatchQueryData,
    block?: string,
  ): Promise<T[]>;

  abstract update(where: T, entity: T): Promise<T>;
}