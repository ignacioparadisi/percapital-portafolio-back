import { Entity } from '@Common/entities/Entity';

export type GraphQLQuery = {
  where: Entity;
  limit?: number;
  skip?: number;
  block?: string;
  latest?: boolean;
  symbol?: string;
  interval?: string;
};

export type GraphQLMutation = {
  insertData: Entity;
  updateData: Entity;
  deleteData: Entity;
  where: Entity;
};