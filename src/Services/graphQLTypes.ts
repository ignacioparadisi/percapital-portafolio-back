import { Entity } from '@Common/Entities/Entity';

export type GraphQLQuery = {
  where: Entity;
  limit?: number;
  skip?: number;
  block?: string;
};

export type GraphQLMutation = {
  insertData: Entity;
  updateData: Entity;
  deleteData: Entity;
  where: Entity;
};