const { Pool, QueryResult } = require('pg');

class Database {
    /**
     * Potgres Pool for making requests
     */
    pool;
    /**
     * Single instance for database
     */
    static database;
    /**
     * Instance to be used as a Singleton
     */
    static get shared() {
        if (!this.database) {
            this.database = new Database();
        }
        return this.database;
    }

    constructor() {
        let config = {};
        if (process.env.DATABASE_URL) {
            config = {
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            }
        } else {
            config = {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : "5432")
            }
            console.info(config);
        }
        this.pool = new Pool(config);
    }

    /**
     * Executes a query into the database
     * @param query Query to be executed in the database
     * @returns rows returned as the Entity desired.
     */
    async execute(query) {
        console.info(`Executing query: ${query}`);
        let client = await this.pool.connect();
        try {
            let queryResult;
            queryResult = await client.query(query);
            queryResult = queryResult.rows ? queryResult.rows : queryResult;
            return queryResult;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = {
    Database
}