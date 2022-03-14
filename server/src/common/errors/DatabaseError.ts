import { Entity } from 'common/entities/Entity';
import { GeneralError } from './GeneralError';

export type QueryData = {
  query:
    | Entity
    | {
        where: Entity;
        update: Entity;
      };
  skip?: number;
  limit?: number;
};

export class DatabaseError extends GeneralError {
  constructor(
    public query: string,
    inner?: Error | unknown,
    message?: string,
    code?: string
  ) {
    super(
      message ||
        `Error executing query ${ query }`,
      inner,
      code
    );
  }
}