import { Entity } from '@Common/Entities/Entity';
import { DatabaseError } from '@Common/Errors/DatabaseError';
import { Pool, QueryResult } from 'pg';

export class Database {
  /**
   * Potgres Pool for making requests
   */
  private pool: Pool;
  /**
   * Single instance for database
   */ 
  private static database?: Database;
  /**
   * Instance to be used as a Singleton
   */
  public static get shared(): Database {
    if (!this.database) {
      this.database = new Database();
    }
    return this.database;
  } 

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT as string, 5432)
    });
  }

  /**
   * Executes a query into the database
   * @param query Query to be executed in the database
   * @returns rows returned as the Entity desired.
   */
  public async execute<T extends Entity>(query: string): Promise<T[]> {
    console.info(`Executing query: ${query}`);
    let client = await this.pool.connect();
    try {
      let queryResult: T[] | QueryResult;
      queryResult = await client.query(query);
      queryResult = (queryResult as QueryResult).rows ? (queryResult as QueryResult).rows : queryResult;
      queryResult = queryResult as T[];
      return queryResult;
    } finally {
      client.release();
    }
  }
}