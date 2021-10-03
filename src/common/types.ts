import { Entity } from '@Common/Entities/Entity';

export type ArrayEntity<T extends Entity> = {
  readonly [P in keyof T]: any[];
};

export type OrderBy<T> = {
  readonly [P in keyof T]?: string;
};

export const availablePermissions = [
];