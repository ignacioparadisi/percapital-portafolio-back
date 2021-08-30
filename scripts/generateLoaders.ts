import {removeDoctive, snakeToCamelCase} from '../src/common/utils/auxiliarities';
import {writeFileSync} from 'fs';

export const generateLoader = (path: string, tableName: string) => {
    let className = removeDoctive(tableName);
    className = snakeToCamelCase(className);
    const loaderPath = `LogicLayer/Loaders/${className}Loader.ts`

    console.info(`Generating ${loaderPath}`);

    const file = createLoaderFile(className);
    writeFileSync(`${path}/${loaderPath}`, file);
}

const createLoaderFile = (className: string) => {
    return `import {Loader} from "@Logic/Loaders/Loader";
import {I${className}DAO} from "@Persistence/DAO/${className}/I${className}DAO";
import {${className}} from '@Common/Entities/${className}';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ${className}Loader extends Loader{
    protected dao: I${className}DAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().create${className}DAO();
    }
    static getInstance(): ${className}Loader {
        this.instance = !this.instance ? new ${className}Loader() : this.instance;
        return this.instance as ${className}Loader;
    }
    load(parent: any, where: ${className}, limit?: number, skip?: number): Promise<${className} | ${className}[]> {
        return super.load(parent, where, limit, skip);
    }
}
`
}