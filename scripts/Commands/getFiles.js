"use strict";
exports.__esModule = true;
exports.getFactory = exports.addManyToOneCommandToFactory = exports.addOneToManyCommandToFactory = exports.addBaseCommandsToFactory = exports.createManyToOneCommandFile = exports.createOneToManyCommandFile = exports.createBaseCommandFiles = void 0;
var createBaseCommandFiles = function (className, names) {
    var _a;
    var files = (_a = {},
        _a[names.create] = '',
        _a[names.read] = '',
        _a[names.update] = '',
        _a[names["delete"]] = '',
        _a);
    files[names.create] = "import {Command} from \"@Logic/Commands/Command\";\nimport {" + className + "} from \"@Common/Entities/" + className + "\";\nimport {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';\nexport class " + names.create + " extends Command<" + className + ">{\n    constructor(private insertData: " + className + ") {\n        super();\n    }\n    async execute() {\n        const dao = getActiveFactory().create" + className + "DAO();\n        return dao.create(this.insertData);\n    }\n}\n";
    files[names.read] = "import {Command} from \"@Logic/Commands/Command\";\nimport {" + className + "} from \"@Common/Entities/" + className + "\";\nimport {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';\nexport class " + names.read + " extends Command<" + className + ">{\n    constructor(private where: " + className + ", private skip?: number, private limit?: number) {\n        super();\n    }\n    async execute() {\n        const dao = getActiveFactory().create" + className + "DAO();\n        return dao.get(this.where, this.skip, this.limit);\n    }\n}\n";
    files[names.update] = "import {Command} from \"@Logic/Commands/Command\";\nimport {" + className + "} from \"@Common/Entities/" + className + "\";\nimport {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';\nexport class " + names.update + " extends Command<" + className + ">{\n    constructor(private where: " + className + ", private updateData: " + className + ") {\n        super();\n    }\n    async execute() {\n        const dao = getActiveFactory().create" + className + "DAO();\n        return dao.update(this.where, this.updateData);\n    }\n}\n";
    files[names["delete"]] = "import {Command} from \"@Logic/Commands/Command\";\nimport {" + className + "} from \"@Common/Entities/" + className + "\";\nimport {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';\nexport class " + names["delete"] + " extends Command<number>{\n    constructor(private deleteData: " + className + ") {\n        super();\n    }\n    async execute() {\n        const dao = getActiveFactory().create" + className + "DAO();\n        return dao.delete(this.deleteData);\n    }\n}\n";
    return files;
};
exports.createBaseCommandFiles = createBaseCommandFiles;
var createOneToManyCommandFile = function (className, parentName, name, variableName) {
    var imports = "import {Command} from '@Logic/Commands/Command';";
    if (className !== parentName) {
        imports += "\nimport {" + parentName + "} from '@Common/Entities/" + parentName + "';";
    }
    imports += "\nimport {" + className + "} from '@Common/Entities/" + className + "';\nimport {" + className + "Loader} from '@Logic/Loaders/" + className + "Loader';";
    return imports + "\nexport class " + name + " extends Command<" + className + ">{\n    constructor(private where: " + className + ", private parent: " + parentName + ") {\n        super();\n    }\n    async execute(): Promise<" + className + "> {\n        const parent = {id: this.parent." + variableName + "};\n        const loader = " + className + "Loader.getInstance();\n        return await loader.load(parent, this.where) as " + className + ";\n    }\n}\n";
};
exports.createOneToManyCommandFile = createOneToManyCommandFile;
var createManyToOneCommandFile = function (className, parentName, name, variableName) {
    var imports = "import {Command} from '@Logic/Commands/Command';";
    if (className !== parentName) {
        imports += "\nimport {" + parentName + "} from '@Common/Entities/" + parentName + "';";
    }
    imports += "\nimport {" + className + "} from '@Common/Entities/" + className + "';\nimport {" + className + "Loader} from '@Logic/Loaders/" + className + "Loader';";
    return imports + "\nexport class " + name + " extends Command<" + className + "> {\n    constructor(private where: " + className + ", private parent: " + parentName + ", private limit?: number) {\n        super();\n    }\n    async execute(): Promise<" + className + "[]> {\n        const parent = {" + variableName + ": this.parent.id};\n        const loader = " + className + "Loader.getInstance();\n        return await loader.load(parent, this.where, this.limit) as " + className + "[];\n    }\n}\n";
};
exports.createManyToOneCommandFile = createManyToOneCommandFile;
var addBaseCommandsToFactory = function (className, names) {
    factory = "import {" + className + "} from '@Common/Entities/" + className + "';\nimport {" + names.create + "} from '@Logic/Commands/" + className + "/" + names.create + "';\nimport {" + names.read + "} from '@Logic/Commands/" + className + "/" + names.read + "';\nimport {" + names.update + "} from '@Logic/Commands/" + className + "/" + names.update + "';\nimport {" + names["delete"] + "} from '@Logic/Commands/" + className + "/" + names["delete"] + "';\n" + factory;
    factory = factory.slice(0, factory.length - 2);
    factory += "    static create" + names.create + "(insertData: " + className + ") {\n        return new " + names.create + "(insertData)\n    }\n    static create" + names.read + "(where: " + className + ", limit?: number, skip?: number) {\n       return new " + names.read + "(where, limit, skip);\n    }\n    static create" + names.update + "(where: " + className + ", updateData: " + className + ") {\n       return new " + names.update + "(where, updateData);\n    }\n    static create" + names["delete"] + "(deleteData: " + className + ") {\n        return new " + names["delete"] + "(deleteData);\n    }\n}\n";
};
exports.addBaseCommandsToFactory = addBaseCommandsToFactory;
var addOneToManyCommandToFactory = function (className, parentName, name) {
    factory = "import {" + name + "} from '@Logic/Commands/" + className + "/" + name + "';\n" + factory;
    factory = factory.slice(0, factory.length - 2);
    factory += "    static create" + name + " (where: " + className + ", parent: " + parentName + ") {\n        return new " + name + "(where, parent);\n    }\n}\n";
};
exports.addOneToManyCommandToFactory = addOneToManyCommandToFactory;
var addManyToOneCommandToFactory = function (className, parentName, name) {
    factory = "import {" + name + "} from '@Logic/Commands/" + className + "/" + name + "';\n" + factory;
    factory = factory.slice(0, factory.length - 2);
    factory += "    static create" + name + "(where: " + className + ", parent: " + parentName + ", limit?:number) {\n        return new " + name + "(where, parent, limit);\n    }\n}\n";
};
exports.addManyToOneCommandToFactory = addManyToOneCommandToFactory;
var getFactory = function () {
    factory = factory.includes('\n\nexport') ? factory : factory.replace('export', '\nexport');
    return factory;
};
exports.getFactory = getFactory;
var factory = "export class CommandFactory {\n    private constructor() {}\n}\n";
