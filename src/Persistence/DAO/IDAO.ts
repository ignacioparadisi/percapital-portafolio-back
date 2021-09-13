import { Entity } from '@Common/Entities/Entity';
import { BatchQueryData } from '@Persistence/Database/QueryBuilder';

export interface IDAO<T extends Entity> {
  create(entity: T): Promise<T>;

  get(
    where?: T,
    limit?: number,
    skip?: number,
    batch?: BatchQueryData,
    block?: string,
  ): Promise<T[]>;

  update(where: T, entity: T): Promise<T>;

  delete(entity: T): Promise<number>;
}