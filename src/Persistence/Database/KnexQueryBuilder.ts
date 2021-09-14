import { Entity } from '@Common/Entities/Entity';
import { DatabaseError } from '@Common/Errors/DatabaseError';
import {
  camelToSnakeCase,
  getEntityFromDB,
  getQueryFromEntity,
  getRelationEntityFromDB,
  queryBuilder,
} from '@Common/Utils/auxiliaries';
import { Knex } from 'knex';
import { QueryResult } from 'pg';
import { get, getWithCount, QueryBuilder } from './QueryBuilder';

export class KnexQueryBuilder<T extends Entity> implements QueryBuilder<T> {
  private readonly tableName: string;
  private queryModel: queryBuilder<T> = { _id: '' };

  constructor(entity: Entity, private database: Knex) {
    Object.keys(entity).map((key) => {
      // @ts-ignore
      this.queryModel[key] = camelToSnakeCase(key);
    });
    this.tableName = camelToSnakeCase(entity.constructor.name);
    console.info(this.tableName, this.queryModel);
  }

  getWithCount(
    params: getWithCount<T>
  ): Promise<{ count: number; entities: T[] }> {
    throw new Error('Method not implemented.');
  }

  createAll(entities: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async get({ where, limit, skip, batch }: get<T>): Promise<T[]> {
    try {
      console.info(
        `Get to ${this.tableName}, where: `,
        where,
        ` limit: ${limit}, skip: ${skip}, batch: ${!!batch}`
      );
      const query = getQueryFromEntity<T>(where, this.queryModel);
      let queryResult: T[] | QueryResult;
      let queryPromise: Knex.QueryBuilder | Knex.Raw;
      if (batch) {
        if (limit) {
          queryPromise = this.database
            .raw(`SELECT * from (SELECT *, rank() OVER (
                                    PARTITION BY ${batch.parentIdName}
                                    ORDER BY id DESC
                                    )
                         FROM ${this.tableName}
                         WHERE ${batch.parentIdName} in (${batch.values.map(
            (value) => value
          )}) ${
            query
              ? Object.keys(query).map((key) => {
                  // @ts-ignore
                  return `AND ${key} = '${query[key]}'`;
                })
              : ''
          }
                        ) rank_filter where rank <= ${limit}`);
        } else {
          queryPromise = this.database
            .select()
            .from(this.tableName)
            .whereIn(batch.parentIdName, batch.values)
            .andWhere(query);
        }
      } else {
        queryPromise = this.database
          .select()
          .from(this.tableName)
          .where(query)
          .limit(limit as number)
          .offset(skip as number);
      }
      console.info(queryPromise.toString());
      queryResult = await queryPromise;
      queryResult = (queryResult as QueryResult).rows
        ? (queryResult as QueryResult).rows
        : queryResult;
      queryResult = queryResult as T[];
      return Promise.all(
        queryResult.map(async (result) =>
          getEntityFromDB<T>(result, this.queryModel)
        )
      );
    } catch (e) {
      throw new DatabaseError({ query: where, skip, limit }, e);
    }
  }

  async create(entity: T): Promise<T> {
    try {
      console.info(`Create ${this.tableName}, entity: `, entity);
      console.log(this.queryModel);
      const insertData = getQueryFromEntity<T>(entity, this.queryModel);
      const createResult = (await this.database(this.tableName)
        // .returning([this.queryModel._id])
        .returning(["id"])
        .insert(insertData)) as T[];
      return getEntityFromDB<T>(createResult[0], this.queryModel);
    } catch (e) {
      throw new DatabaseError({ query: entity }, e);
    }
  }

  async update(where: T, entity: T): Promise<T> {
    try {
      console.info(
        `Update ${this.tableName} where: `,
        where,
        'updateData: ',
        entity
      );
      const query = getQueryFromEntity<T>(where, this.queryModel);
      const updateData = getQueryFromEntity<T>(entity, this.queryModel);
      const updatePromise = this.database(this.tableName)
        .where(query)
        .update(updateData, [this.queryModel._id]);
      console.info(updatePromise.toString());
      const updateResult = (await updatePromise) as T[];
      console.info(updateResult);
      return (
        await Promise.all(
          updateResult.map(async (result) =>
            getEntityFromDB<T>(result, this.queryModel)
          )
        )
      )[0] as T;
    } catch (e) {
      throw new DatabaseError({ query: { where, update: entity } }, e);
    }
  }

  async delete(entity: T): Promise<number> {
    try {
      console.info(`Delete in ${this.tableName} entity: `, entity);
      const deleteData = getQueryFromEntity<T>(entity, this.queryModel);
      return this.database(this.tableName).where(deleteData).del();
    } catch (e) {
      throw new DatabaseError({ query: entity }, e);
    }
  }

  async getWithJoin(
    where: T,
    { table, column }: { table: T; column: string }
  ): Promise<T | void> {
    const query = getQueryFromEntity<T>(where, this.queryModel);
    let joinTableName = camelToSnakeCase(table.constructor.name);
    // @ts-ignore
    const thisId = `${this.tableName}.${this.queryModel[column]}`;
    const joinId = `${joinTableName}.id`;
    const queryPromise = this.database
      .select()
      .from(this.tableName)
      .where(query)
      .innerJoin(joinTableName, thisId, joinId);
    console.info(queryPromise.toString());
    const queryResult = await queryPromise;
    console.info('queryResult', queryResult);
    if (queryResult[0]) {
      const relation = getRelationEntityFromDB(queryResult[0], this.queryModel);
      const relationName = column.replace('Id', '');
      const entity = getEntityFromDB<T>(queryResult[0], this.queryModel);
      // @ts-ignore
      relation.id = entity[column];
      // @ts-ignore
      entity[relationName] = relation;
      return entity;
    }
  }
}