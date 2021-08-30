import {minimizeFirstLetter, removeDoctive, snakeToCamelCase} from '../../src/common/utils/auxiliaries';
import {writeFileSync} from 'fs';

enum DataTypes {
    'integer'= 'Int',
    'character varying' = 'String',
    'boolean' = 'Boolean',
    'date' = 'String'
}

export const generateSchemas = async (columns: any[], path: string, tableName: string, oneToMany: any[], manyToOne: any[]) => {
    let className = removeDoctive(tableName);
    className = snakeToCamelCase(className);
    const schemaPath = `Services/schemas/${className}.ts`;
    console.info(`Generating ${schemaPath}`);

    let [file, inputFile] = generateInitialFile(className);

    columns.map(column => {
        const dataType = column.data_type;
        const name = column.column_name;
        const variableName = snakeToCamelCase(name);
        // @ts-ignore
        file += `\n        ${variableName}: ${DataTypes[dataType]}`;
        // @ts-ignore
        inputFile += `\n        ${variableName}: ${DataTypes[dataType]}`;
    });

    oneToMany.map(value => {
        const dataType = getDataType(value);
        file += `\n        ${minimizeFirstLetter(className === dataType ? `Sub${dataType}` : dataType)}s(where: ${dataType}Input, limit: Int): [${dataType}]`;
    });
    manyToOne.map(value => {
        const dataType = getDataType(value)
        file += `\n        ${minimizeFirstLetter(className === dataType ? `Parent${dataType}` : dataType)}(where: ${dataType}Input): ${dataType}`;
    })
    file += '\n    }'
    file += `\n\n    ${inputFile}\n    }`;
    file += `\n\n    ${createFinalData(className)}`;
    writeFileSync(`${path}/${schemaPath}`, file);
    addToIndexFile(className);

    writeFileSync(`${path}/Services/schemas/index.ts`, indexFile);

}

const generateInitialFile = (className: string) => {
    return [`import {gql} from 'apollo-server';
export const ${className}TypeDef = gql\`
    type ${className} {`, `input ${className}Input {`];
}

const getDataType = (value: any) => {
    let dataType = removeDoctive(value.foreign_table_name);
    dataType = snakeToCamelCase(dataType);
    return dataType
}

const createFinalData = (className: string) => {
    return `type Query {
        get${className}s(where: ${className}Input, skip:Int, limit: Int): [${className}]
    }
    type Mutation {
        create${className}(insertData: ${className}Input!): ${className}
        update${className}(where: ${className}Input! updateData: ${className}Input!): [${className}]
        delete${className}(deleteData: ${className}Input): Int
    }
\`
`
}

const addToIndexFile = (className: string) => {
    indexFile = indexFile.replace('\n\nexport', `\nimport {${className}TypeDef} from './${className}';
export`);
    indexFile = indexFile.slice(0, indexFile.length-3);
    indexFile += !first ? `,\n    ${className}TypeDef\n])` : `    ${className}TypeDef\n])`;
    first = false;
}

let indexFile = `import {mergeTypeDefs} from "@graphql-tools/merge";
export const typeDefs = mergeTypeDefs([
])
`
let first = true;