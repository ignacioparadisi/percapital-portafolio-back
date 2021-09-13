import KnexObject, { Knex } from 'knex';

const getConfig = () => {
  let config = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT as string, 5432),
    },
  }
  console.log(config);
  return config;
};

let db: Knex;

export const getDBInstance = () => {
  if (!db) {
    db = KnexObject(getConfig());
  }

  return db;
};