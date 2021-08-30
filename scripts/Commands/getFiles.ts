type BaseCommandNames = {
    create: string;
    read: string;
    update: string;
    delete: string;
}

export const createBaseCommandFiles = (className: string, names: BaseCommandNames) => {
    const files = {
        [names.create]: '',
        [names.read]: '',
        [names.update]: '',
        [names.delete]: ''
    };
    files[names.create] = `import {Command} from "@Logic/Commands/Command";
import {${className}} from "@Common/Entities/${className}";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ${names.create} extends Command<${className}>{
    constructor(private insertData: ${className}) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().create${className}DAO();
        return dao.create(this.insertData);
    }
}
`;
    files[names.read] = `import {Command} from "@Logic/Commands/Command";
import {${className}} from "@Common/Entities/${className}";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ${names.read} extends Command<${className}>{
    constructor(private where: ${className}, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().create${className}DAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
`;
    files[names.update] = `import {Command} from "@Logic/Commands/Command";
import {${className}} from "@Common/Entities/${className}";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ${names.update} extends Command<${className}>{
    constructor(private where: ${className}, private updateData: ${className}) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().create${className}DAO();
        return dao.update(this.where, this.updateData);
    }
}
`;
    files[names.delete] = `import {Command} from "@Logic/Commands/Command";
import {${className}} from "@Common/Entities/${className}";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ${names.delete} extends Command<number>{
    constructor(private deleteData: ${className}) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().create${className}DAO();
        return dao.delete(this.deleteData);
    }
}
`;
    return files;
}

export const createOneToManyCommandFile = (className: string, parentName: string, name: string, variableName: string) => {
    let imports = `import {Command} from '@Logic/Commands/Command';`;
    if (className !== parentName) {
        imports += `\nimport {${parentName}} from '@Common/Entities/${parentName}';`;
    }
    imports += `\nimport {${className}} from '@Common/Entities/${className}';
import {${className}Loader} from '@Logic/Loaders/${className}Loader';`

    return `${imports}
export class ${name} extends Command<${className}>{
    constructor(private where: ${className}, private parent: ${parentName}) {
        super();
    }
    async execute(): Promise<${className}> {
        const parent = {id: this.parent.${variableName}};
        const loader = ${className}Loader.getInstance();
        return await loader.load(parent, this.where) as ${className};
    }
}
`;
}

export const createManyToOneCommandFile = (className: string, parentName: string, name: string, variableName: string) => {
    let imports = `import {Command} from '@Logic/Commands/Command';`;
    if (className !== parentName) {
        imports += `\nimport {${parentName}} from '@Common/Entities/${parentName}';`;
    }
    imports += `\nimport {${className}} from '@Common/Entities/${className}';
import {${className}Loader} from '@Logic/Loaders/${className}Loader';`

    return `${imports}
export class ${name} extends Command<${className}> {
    constructor(private where: ${className}, private parent: ${parentName}, private limit?: number) {
        super();
    }
    async execute(): Promise<${className}[]> {
        const parent = {${variableName}: this.parent.id};
        const loader = ${className}Loader.getInstance();
        return await loader.load(parent, this.where, this.limit) as ${className}[];
    }
}
`;
}

export const addBaseCommandsToFactory = (className: string, names: BaseCommandNames) => {
    factory = `import {${className}} from '@Common/Entities/${className}';
import {${names.create}} from '@Logic/Commands/${className}/${names.create}';
import {${names.read}} from '@Logic/Commands/${className}/${names.read}';
import {${names.update}} from '@Logic/Commands/${className}/${names.update}';
import {${names.delete}} from '@Logic/Commands/${className}/${names.delete}';
${factory}`;
    factory = factory.slice(0,factory.length-2);
    factory += `    static create${names.create}(insertData: ${className}) {
        return new ${names.create}(insertData)
    }
    static create${names.read}(where: ${className}, limit?: number, skip?: number) {
       return new ${names.read}(where, limit, skip);
    }
    static create${names.update}(where: ${className}, updateData: ${className}) {
       return new ${names.update}(where, updateData);
    }
    static create${names.delete}(deleteData: ${className}) {
        return new ${names.delete}(deleteData);
    }
}
`;
}

export const addOneToManyCommandToFactory = (className: string, parentName: string, name: string) => {
    factory =  `import {${name}} from '@Logic/Commands/${className}/${name}';\n${factory}`;
    factory = factory.slice(0, factory.length-2);
    factory += `    static create${name} (where: ${className}, parent: ${parentName}) {
        return new ${name}(where, parent);
    }
}
`
}

export const addManyToOneCommandToFactory = (className: string, parentName: string, name: string) => {
    factory =  `import {${name}} from '@Logic/Commands/${className}/${name}';\n${factory}`;
    factory = factory.slice(0, factory.length-2);
    factory +=`    static create${name}(where: ${className}, parent: ${parentName}, limit?:number) {
        return new ${name}(where, parent, limit);
    }
}
`
}

export const getFactory = () => {
    factory = factory.includes('\n\nexport') ? factory : factory.replace('export', '\nexport');
    return factory;
}

let factory = `export class CommandFactory {
    private constructor() {}
}
`