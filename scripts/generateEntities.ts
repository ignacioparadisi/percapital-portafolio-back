import { writeFileSync } from 'fs';
// @ts-ignore
import { minimizeFirstLetter, removeDoctive, snakeToCamelCase } from "../src/Common/Utils/auxiliaries";

enum dataTypes {
    'integer' = 'number',
    'bigint' = 'number',
    'numeric' = 'number',
    'character varying' = 'string',
    'text' = 'string',
    'boolean' = 'boolean',
    'date' = 'Date',
    'timestamp without time zone' = 'Date'
}

export const generateEntities = async (columns: any[], path: string, tableName: string, oneToMany: any[], manyToOne: any[]) => {
    let className = removeDoctive(tableName);
    className = snakeToCamelCase(className);


    const entitiesPath = `Common/Entities/${className}.ts`
    console.info(`Generating ${entitiesPath}`);

    let file = generateInitialFile(className);
    let constructor = `   constructor(entity?: ${className}) {\n        super(entity);`
    columns.map(column => {
        const columnName = column.column_name;
        const dataType = column.data_type;
        if (columnName !== 'id') {
            var variableName = snakeToCamelCase(columnName, true);
            // @ts-ignore
            file += `\n    ${variableName}?: ${dataTypes[dataType]};`;
            constructor += `\n        this.${variableName} = entity ? entity.${variableName} : undefined;`
        }
    });
    constructor += `\n   }`;
    oneToMany.map(value => {
        let dataType;
        [dataType, file] = addImport(value, file, className);
        file += `\n    ${minimizeFirstLetter(className === dataType ? `Sub${dataType}` : dataType)}s?: ${dataType}[];`;
    });
    manyToOne.map(value => {
        let dataType;
        [dataType, file] = addImport(value, file, className);
        file += `\n    ${minimizeFirstLetter(className === dataType ? `Parent${dataType}` : dataType)}?: ${dataType};`;
    })
    file += `\n\n${constructor}`;
    file += '\n}\n';

    writeFileSync(`${path}/${entitiesPath}`, file);
}

const generateInitialFile = (className: string) => {
    return `import {Entity} from '@Common/Entities/Entity';
export class ${className} extends Entity {`
}

const addImport = (value: any, file: string, className: string) => {
    let dataType = removeDoctive(value.foreign_table_name);
    dataType = snakeToCamelCase(dataType);
    if (dataType !== className) {
        file = `import {${dataType}} from '@Common/Entities/${dataType}';\n${file}`
    }
    return [dataType, file];
}