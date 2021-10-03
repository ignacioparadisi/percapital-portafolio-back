import { Entity } from '@Common/entities/Entity';
import { DatabaseError } from '@Common/errors/DatabaseError';
import { Decodable, decodeMultiple } from '@Common/utils/Decodable';
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
    if (process.env.DATABASE_URL) {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL
      });
    } else {
      this.pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT as string, 5432)
      });
    }
  }

  /**
   * Executes a query into the database
   * @param query Query to be executed in the database
   * @returns rows returned as the Entity desired.
   */
  public async execute<T extends Entity & Decodable>(query: string, type: { new(): T }): Promise<T[]> {
    console.info(`Executing query: ${query}`);
    let client = await this.pool.connect();
    try {
      let queryResult: T[] | QueryResult;
      queryResult = await client.query(query);
      queryResult = (queryResult as QueryResult).rows ? (queryResult as QueryResult).rows : queryResult;
      queryResult = decodeMultiple(queryResult as T[], type);
      return queryResult;
    } catch (error) {
      throw new DatabaseError(query);
    } finally {
      client.release();
    }
  }
}