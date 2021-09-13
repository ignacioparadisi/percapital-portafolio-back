import { Entity } from '@Common/Entities/Entity';
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
    public queryData: QueryData,
    inner?: Error | unknown,
    message?: string,
    code?: string
  ) {
    super(
      message ||
        `Error making database action to ${
          queryData.query instanceof Entity
            ? queryData.query.constructor.name
            : queryData.query.where.constructor.name
        }`,
      inner,
      code
    );
  }
}