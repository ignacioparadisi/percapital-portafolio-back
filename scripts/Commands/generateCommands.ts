import {removeDoctive, snakeToCamelCase} from '../../src/common/utils/auxiliaries';
import {
    addBaseCommandsToFactory, addManyToOneCommandToFactory,
    addOneToManyCommandToFactory,
    createBaseCommandFiles, createManyToOneCommandFile,
    createOneToManyCommandFile, getFactory
} from './getFiles';
import {writeFileSync, existsSync, mkdirSync} from 'fs'

export const generateCommand = async (path: string, tableName: string, oneToMany: any[], manyToOne: any[]) => {
    let className = removeDoctive(tableName);
    className = snakeToCamelCase(className);
    const commandPath = `LogicLayer/Commands/${className}`;
    console.info(`Generating ${commandPath}`);
    const baseCommandNames = {
        create: `Create${className}Command`,
        read: `Get${className}sCommand`,
        update: `Update${className}Command`,
        delete: `Delete${className}Command`,
    }
    const baseCommandFiles = createBaseCommandFiles(className, baseCommandNames);
    addBaseCommandsToFactory(className, baseCommandNames);
    if (!existsSync(`${path}/${commandPath}`)) {
        mkdirSync(`${path}/${commandPath}`);
    }
    Object.keys(baseCommandFiles).map(key => {
        writeFileSync(`${path}/${commandPath}/${key}.ts`, baseCommandFiles[key]);
    });

    oneToMany.map(value =>
        addRelationFile(value, className, path, commandPath, createOneToManyCommandFile, addOneToManyCommandToFactory)
    );
    manyToOne.map(value =>
        addRelationFile(value, className, path, commandPath, createManyToOneCommandFile, addManyToOneCommandToFactory, true)
    );

    writeFileSync(`${path}/LogicLayer/Commands/CommandFactory.ts`, getFactory());

}

const addRelationFile = (value: any, className: string, path: string, commandPath: string, fileFunction: Function, factoryFunction: Function, manyToOne?:boolean) => {
    let parentName = removeDoctive(value.foreign_table_name);
    parentName = snakeToCamelCase(parentName);
    const variableName = snakeToCamelCase(value.column_name);
    let firstName;
    let secondName;
    if (className === parentName) {
        firstName = !manyToOne ? `Parent${className}` : `Sub${className}`;
        secondName = manyToOne ? `Parent${className}` : `Sub${className}`
    } else {
        firstName = className;
        secondName = parentName
    }
    const commandName = `Get${firstName}${manyToOne ? 's' : ''}By${secondName}Command`
    const file = fileFunction(className, parentName, commandName, variableName);
    writeFileSync(`${path}/${commandPath}/${commandName}.ts`, file);
    factoryFunction(className, parentName, commandName);
}