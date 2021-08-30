import { Client } from 'pg';
import { resolve } from 'path';
import { config } from "dotenv";

// @ts-ignore
import { generateEntities } from './generateEntities';
import { generateDAO } from './generateDAO';
import { generateCommand } from './Commands/generateCommands';
import { generateLoader } from './generateLoaders';
import { generateSchemas } from './Services/generateSchemas';
import { generateResolvers } from './Services/generateResolvers';


config({ path: `${process.cwd()}/.env` });

const oneToManyQuery = `SELECT tce.table_schema,
                               tce.constraint_name,
                               tce.table_name,
                               kcu.column_name,
                               tc.table_schema    as foreign_table_schema,
                               tc.constraint_name as foreign_constraint_name,
                               tc.table_name      as foreign_table_name
                        FROM information_schema.table_constraints AS tc
                                 JOIN information_schema.key_column_usage AS kcu
                                      ON tc.constraint_name = kcu.constraint_name
                                 JOIN information_schema.referential_constraints AS rc
                                      ON rc.constraint_name = tc.constraint_name
                                 JOIN information_schema.table_constraints as tce
                                      ON tce.constraint_name = rc.unique_constraint_name
                        WHERE tc.constraint_type = 'FOREIGN KEY'
                          AND tce.table_name = $1
                        ORDER BY foreign_table_name`;

const manyToOneQuery = `SELECT tc.table_schema,
                               tc.constraint_name,
                               tc.table_name,
                               kcu.column_name,
                               tce.table_schema    as foreign_table_schema,
                               tce.constraint_name as foreign_constraint_name,
                               tce.table_name      as foreign_table_name
                        FROM information_schema.table_constraints AS tc
                                 JOIN information_schema.key_column_usage AS kcu
                                      ON tc.constraint_name = kcu.constraint_name
                                 JOIN information_schema.referential_constraints AS rc
                                      ON rc.constraint_name = tc.constraint_name
                                 JOIN information_schema.table_constraints as tce
                                      ON tce.constraint_name = rc.unique_constraint_name
                        WHERE tc.constraint_type = 'FOREIGN KEY'
                          AND tc.table_name = $1
                        ORDER BY foreign_table_name`;

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT as string, 10),
})

const projectPath = resolve(process.cwd(), './src');

console.time('Generated all files');
client.connect().then(async () => {
    const result = await client.query('select table_name from information_schema.tables where table_schema = \'public\'');
    await Promise.all(result.rows.map(async table => {
        const tableName = table.table_name;
        const manyToOneResult = await client.query(manyToOneQuery, [tableName]);
        const oneToManyResult = await client.query(oneToManyQuery, [tableName]);
        const columnResult = await client.query('select column_name, data_type from information_schema.columns where table_name = $1', [tableName]);
        await Promise.all([
            generateEntities(columnResult.rows, projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows),
            generateDAO(projectPath, tableName),
            generateCommand(projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows),
            generateLoader(projectPath, tableName),
            generateSchemas(columnResult.rows, projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows),
            generateResolvers(projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows)
        ]);
    }));
}).catch(e => {
    console.error(e);
}).finally(() => {
    console.timeEnd('Generated all files');
    return client.end();
});