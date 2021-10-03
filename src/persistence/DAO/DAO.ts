import { Entity } from '@Common/entities/Entity';
import { IDAO } from './IDAO';

export abstract class DAO<T extends Entity> implements IDAO<Entity> {

  constructor() {
  }

  abstract create(entity: T): Promise<T>;

  abstract delete(entity: T): Promise<number>;

  abstract get(
    where: T,
    limit?: number,
    skip?: number
  ): Promise<T[]>;

  abstract update(where: T, entity: T): Promise<T>;
}