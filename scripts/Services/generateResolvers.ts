import { minimizeFirstLetter, removeDoctive, snakeToCamelCase } from '../../src/Common/Utils/auxiliaries';
import { writeFileSync } from "fs";

export const generateResolvers = async (path: string, tableName: string, oneToMany: any[], manyToOne: any[]) => {
    let className = removeDoctive(tableName);
    className = snakeToCamelCase(className);
    const resolverPath = `Services/resolvers/${className}.ts`;
    let { file, mutations } = createInitialFile(className);
    oneToMany.map(value => {
        file = addRelationFile(value, className, createOneToManyFile, file);
    });
    manyToOne.map(value => {
        file = addRelationFile(value, className, createManyToOneFile, file);
    })
    file += `\n    },\n    ${mutations}`;
    writeFileSync(`${path}/${resolverPath}`, file);

    addToIndexFile(className);

    writeFileSync(`${path}/Services/resolvers/index.ts`, indexFile);

}

const addRelationFile = (value: any, className: string, fileFunction: Function, file: string) => {
    let parentName = removeDoctive(value.foreign_table_name);
    parentName = snakeToCamelCase(parentName);
    if (className !== parentName) {
        file = `import {${parentName}} from '@Common/Entities/${parentName}';\n${file}`;
    }
    const relationFile = fileFunction(className, parentName);
    file += `\n        ${relationFile}`;
    return file;
}

const createInitialFile = (className: string) => {
    const file = `import {${className}} from '@Common/Entities/${className}';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const ${className}Resolver = {
    Query: {
        get${className}s: async (parent: any, args: GraphQLQuery) => {
            console.info('get${className}s parent:', parent, 'args: ',args);
            const where = new ${className}(args.where)
            const command = CommandFactory.createGet${className}sCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    ${className}: {`;
    const mutations = `Mutation: {
        create${className}: async (parent: any, args: GraphQLMutation) => {
            console.info('create${className} parent: ', parent, 'args: ',args);
            const createData = new ${className}(args.insertData);
            const command = CommandFactory.createCreate${className}Command(createData);
            return command.execute();
        },
        update${className}: async (parent: any, args: GraphQLMutation) => {
            console.info('update${className} parent: ', parent, 'args: ',args);
            const where = new ${className}(args.where);
            const updateData = new ${className}(args.updateData)
            const command = CommandFactory.createUpdate${className}Command(where, updateData);
            return command.execute();
        },
        delete${className}: async (parent: any, args: GraphQLMutation) => {
            console.info('delete${className} parent: ', parent, 'args: ',args);
            const deleteData = new ${className}(args.deleteData);
            const command = CommandFactory.createDelete${className}Command(deleteData);
            return command.execute();
        }
    }
}
`
    return { file, mutations };
}

const createManyToOneFile = (className: string, relationName: string) => {
    const variableName = className === relationName ? `Parent${relationName}` : relationName;
    const parentName = className === relationName ? `Sub${relationName}` : className;
    return `${minimizeFirstLetter(variableName)}: async (parent: ${className}, args: GraphQLQuery) => {
            console.info('${minimizeFirstLetter(variableName)} parent: ', parent, 'args: ',args)
            const where = new ${relationName}(args.where);
            const command = CommandFactory.createGet${variableName}By${parentName}Command(where, parent);
            return command.execute();
        },`
}

const createOneToManyFile = (className: string, relationName: string) => {
    const variableName = className === relationName ? `Sub${relationName}` : relationName;
    const parentName = className === relationName ? `Parent${relationName}` : className;
    return `${minimizeFirstLetter(variableName)}s: async (parent: ${className}, args: GraphQLQuery) => {
            console.info('${minimizeFirstLetter(variableName)}s parent: ', parent, 'args: ',args)
            const where = new ${relationName}(args.where);
            const command = CommandFactory.createGet${variableName}sBy${parentName}Command(where, parent, args.limit);
            return command.execute();
        },`
}

const addToIndexFile = (className: string) => {
    indexFile = indexFile.replace('\n\nexport', `\nimport {${className}Resolver} from './${className}';
export`);
    indexFile = indexFile.slice(0, indexFile.length - 3);
    indexFile += !first ? `,\n    ${className}Resolver\n])` : `    ${className}Resolver\n])`;
    first = false;
}

let indexFile = `import {mergeResolvers} from "@graphql-tools/merge";
export const resolvers = mergeResolvers([
])
`
let first = true;