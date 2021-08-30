import { removeDoctive, snakeToCamelCase } from '../src/common/utils/auxiliaries';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export const generateDAO = async (path: string, tableName: string) => {
    let className = removeDoctive(tableName);
    className = snakeToCamelCase(className);
    const factoryPath = `Persistence/DAO/Factories`;
    const daoPath = `Persistence/DAO/${className}`;
    console.info(`Generating ${daoPath}`);
    const files = generateFiles(className);
    addFactory(className);

    if (!existsSync(`${path}/${daoPath}`)) {
        mkdirSync(`${path}/${daoPath}`);
    }
    if (!existsSync(`${path}/${factoryPath}`)) {
        mkdirSync(`${path}/${factoryPath}`);
    }

    writeFileSync(`${path}/${daoPath}/I${className}DAO.ts`, files.interface);
    writeFileSync(`${path}/${daoPath}/${className}DAO.ts`, files.concrete);
    writeFileSync(`${path}/${factoryPath}/AbstractDAOFactory.ts`, factories.abstract);
    writeFileSync(`${path}/${factoryPath}/PsqlDAOFactory.ts`, factories.concrete);
};

const generateFiles = (className: string) => {
    const files = {
        concrete: '',
        interface: ''
    };
    files.concrete = `import {DAO} from '../DAO';
import {I${className}DAO} from './I${className}DAO';
import {${className}} from '@Common/Entities/${className}';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class ${className}DAO extends DAO<${className}> implements I${className}DAO {
    constructor() {
        super(new ${className}());
    }
    async create(entity: ${className}): Promise<${className}> {
        return this.database.create(entity);
    }
    async get(where: ${className}, limit?: number, skip?: number, batch?: BatchQueryData): Promise<${className}[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: ${className}, entity: ${className}): Promise<${className}[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: ${className}): Promise<number> {
        return this.database.delete(entity);
    }
}
`;

    files.interface = `import {IDAO} from '../IDAO';
import {${className}} from '@Common/Entities/${className}';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface I${className}DAO extends IDAO {
    create(entity: ${className}): Promise<${className}>;
    get(where: ${className}, limit?: number, skip?: number, batch?: BatchQueryData): Promise<${className}[]>;
    update(where: ${className}, entity: ${className}): Promise<${className}[]>;
    delete(entity: ${className}): Promise<number>;
}`;
    return files;
};

const addFactory = (className: string) => {
    factories.abstract = factories.abstract.substring(0, factories.abstract.length - 2);
    factories.concrete = factories.concrete.substring(0, factories.concrete.length - 2);
    factories.abstract = `import {I${className}DAO} from '@Persistence/DAO/${className}/I${className}DAO';\n${factories.abstract}`;
    factories.concrete = `import {${className}DAO} from '@Persistence/DAO/${className}/${className}DAO';\n${factories.concrete}`;

    factories.abstract += `    abstract create${className}DAO(): I${className}DAO;\n}\n`;
    factories.concrete += `    create${className}DAO(): ${className}DAO {
        return new ${className}DAO();
    }
}
`;
}

const factories = {
    concrete: `import {AbstractDAOFactory} from '@Persistence/DAO/Factories/AbstractDAOFactory';
export class PsqlDAOFactory extends AbstractDAOFactory {
}
`,
    abstract: `
export abstract class AbstractDAOFactory {
}
`
}