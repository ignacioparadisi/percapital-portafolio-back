"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.generateSchemas = void 0;
var auxiliaries_1 = require("../../src/Common/Utils/auxiliaries");
var fs_1 = require("fs");
var DataTypes;
(function (DataTypes) {
    DataTypes["integer"] = "Int";
    DataTypes["bigint"] = "Int";
    DataTypes["numeric"] = "Float";
    DataTypes["character varying"] = "String";
    DataTypes["text"] = "String";
    DataTypes["boolean"] = "Boolean";
    DataTypes["date"] = "String";
    DataTypes["timestamp without time zone"] = "String";
})(DataTypes || (DataTypes = {}));
var generateSchemas = function (columns, path, tableName, oneToMany, manyToOne) { return __awaiter(void 0, void 0, void 0, function () {
    var className, schemaPath, _a, file, inputFile;
    return __generator(this, function (_b) {
        className = (0, auxiliaries_1.removeDoctive)(tableName);
        className = (0, auxiliaries_1.snakeToCamelCase)(className);
        schemaPath = "Services/schemas/" + className + ".ts";
        console.info("Generating " + schemaPath);
        _a = __read(generateInitialFile(className), 2), file = _a[0], inputFile = _a[1];
        columns.map(function (column) {
            var dataType = column.data_type;
            var name = column.column_name;
            var variableName = (0, auxiliaries_1.snakeToCamelCase)(name, true);
            // @ts-ignore
            file += "\n        " + variableName + ": " + DataTypes[dataType];
            // @ts-ignore
            inputFile += "\n        " + variableName + ": " + DataTypes[dataType];
        });
        oneToMany.map(function (value) {
            var dataType = getDataType(value);
            file += "\n        " + (0, auxiliaries_1.minimizeFirstLetter)(className === dataType ? "Sub" + dataType : dataType) + "s(where: " + dataType + "Input, limit: Int): [" + dataType + "]";
        });
        manyToOne.map(function (value) {
            var dataType = getDataType(value);
            file += "\n        " + (0, auxiliaries_1.minimizeFirstLetter)(className === dataType ? "Parent" + dataType : dataType) + "(where: " + dataType + "Input): " + dataType;
        });
        file += '\n    }';
        file += "\n\n    " + inputFile + "\n    }";
        file += "\n\n    " + createFinalData(className);
        (0, fs_1.writeFileSync)(path + "/" + schemaPath, file);
        addToIndexFile(className);
        (0, fs_1.writeFileSync)(path + "/Services/schemas/index.ts", indexFile);
        return [2 /*return*/];
    });
}); };
exports.generateSchemas = generateSchemas;
var generateInitialFile = function (className) {
    return ["import {gql} from 'apollo-server';\nexport const " + className + "TypeDef = gql`\n    type " + className + " {", "input " + className + "Input {"];
};
var getDataType = function (value) {
    var dataType = (0, auxiliaries_1.removeDoctive)(value.foreign_table_name);
    dataType = (0, auxiliaries_1.snakeToCamelCase)(dataType);
    return dataType;
};
var createFinalData = function (className) {
    return "type Query {\n        get" + className + "s(where: " + className + "Input, skip:Int, limit: Int): [" + className + "]\n    }\n    type Mutation {\n        create" + className + "(insertData: " + className + "Input!): " + className + "\n        update" + className + "(where: " + className + "Input! updateData: " + className + "Input!): [" + className + "]\n        delete" + className + "(deleteData: " + className + "Input): Int\n    }\n`\n";
};
var addToIndexFile = function (className) {
    indexFile = indexFile.replace('\n\nexport', "\nimport {" + className + "TypeDef} from './" + className + "';\nexport");
    indexFile = indexFile.slice(0, indexFile.length - 3);
    indexFile += !first ? ",\n    " + className + "TypeDef\n])" : "    " + className + "TypeDef\n])";
    first = false;
};
var indexFile = "import {mergeTypeDefs} from \"@graphql-tools/merge\";\nexport const typeDefs = mergeTypeDefs([\n])\n";
var first = true;
