"use strict";
exports.__esModule = true;
exports.generateLoader = void 0;
var auxiliaries_1 = require("../src/Common/Utils/auxiliaries");
var fs_1 = require("fs");
var generateLoader = function (path, tableName) {
    var className = (0, auxiliaries_1.removeDoctive)(tableName);
    className = (0, auxiliaries_1.snakeToCamelCase)(className);
    var loaderPath = "LogicLayer/Loaders/" + className + "Loader.ts";
    console.info("Generating " + loaderPath);
    var file = createLoaderFile(className);
    (0, fs_1.writeFileSync)(path + "/" + loaderPath, file);
};
exports.generateLoader = generateLoader;
var createLoaderFile = function (className) {
    return "import {Loader} from \"@Logic/Loaders/Loader\";\nimport {I" + className + "DAO} from \"@Persistence/DAO/" + className + "/I" + className + "DAO\";\nimport {" + className + "} from '@Common/Entities/" + className + "';\nimport {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';\nexport class " + className + "Loader extends Loader{\n    protected dao: I" + className + "DAO;\n    private constructor() {\n        super();\n        this.dao = getActiveFactory().create" + className + "DAO();\n    }\n    static getInstance(): " + className + "Loader {\n        this.instance = !this.instance ? new " + className + "Loader() : this.instance;\n        return this.instance as " + className + "Loader;\n    }\n    load(parent: any, where: " + className + ", limit?: number, skip?: number): Promise<" + className + " | " + className + "[]> {\n        return super.load(parent, where, limit, skip);\n    }\n}\n";
};
