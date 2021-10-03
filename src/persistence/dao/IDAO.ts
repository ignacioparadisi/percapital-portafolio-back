import { Entity } from '@Common/entities/Entity';

export interface IDAO<T extends Entity> {
  create(entity: T): Promise<T>;

  get(
    where?: T,
    limit?: number,
    skip?: number
  ): Promise<T[]>;

  update(where: T, entity: T): Promise<T>;

  delete(entity: T): Promise<number>;
}