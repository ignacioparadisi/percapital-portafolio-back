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
exports.__esModule = true;
exports.generateCommand = void 0;
var auxiliaries_1 = require("../../src/Common/Utils/auxiliaries");
var getFiles_1 = require("./getFiles");
var fs_1 = require("fs");
var generateCommand = function (path, tableName, oneToMany, manyToOne) { return __awaiter(void 0, void 0, void 0, function () {
    var className, commandPath, baseCommandNames, baseCommandFiles;
    return __generator(this, function (_a) {
        className = (0, auxiliaries_1.removeDoctive)(tableName);
        className = (0, auxiliaries_1.snakeToCamelCase)(className);
        commandPath = "LogicLayer/Commands/" + className;
        console.info("Generating " + commandPath);
        baseCommandNames = {
            create: "Create" + className + "Command",
            read: "Get" + className + "sCommand",
            update: "Update" + className + "Command",
            "delete": "Delete" + className + "Command"
        };
        baseCommandFiles = (0, getFiles_1.createBaseCommandFiles)(className, baseCommandNames);
        (0, getFiles_1.addBaseCommandsToFactory)(className, baseCommandNames);
        if (!(0, fs_1.existsSync)(path + "/" + commandPath)) {
            (0, fs_1.mkdirSync)(path + "/" + commandPath);
        }
        Object.keys(baseCommandFiles).map(function (key) {
            (0, fs_1.writeFileSync)(path + "/" + commandPath + "/" + key + ".ts", baseCommandFiles[key]);
        });
        oneToMany.map(function (value) {
            return addRelationFile(value, className, path, commandPath, getFiles_1.createOneToManyCommandFile, getFiles_1.addOneToManyCommandToFactory);
        });
        manyToOne.map(function (value) {
            return addRelationFile(value, className, path, commandPath, getFiles_1.createManyToOneCommandFile, getFiles_1.addManyToOneCommandToFactory, true);
        });
        (0, fs_1.writeFileSync)(path + "/LogicLayer/Commands/CommandFactory.ts", (0, getFiles_1.getFactory)());
        return [2 /*return*/];
    });
}); };
exports.generateCommand = generateCommand;
var addRelationFile = function (value, className, path, commandPath, fileFunction, factoryFunction, manyToOne) {
    var parentName = (0, auxiliaries_1.removeDoctive)(value.foreign_table_name);
    parentName = (0, auxiliaries_1.snakeToCamelCase)(parentName);
    var variableName = (0, auxiliaries_1.snakeToCamelCase)(value.column_name);
    var firstName;
    var secondName;
    if (className === parentName) {
        firstName = !manyToOne ? "Parent" + className : "Sub" + className;
        secondName = manyToOne ? "Parent" + className : "Sub" + className;
    }
    else {
        firstName = className;
        secondName = parentName;
    }
    var commandName = "Get" + firstName + (manyToOne ? 's' : '') + "By" + secondName + "Command";
    var file = fileFunction(className, parentName, commandName, variableName);
    (0, fs_1.writeFileSync)(path + "/" + commandPath + "/" + commandName + ".ts", file);
    factoryFunction(className, parentName, commandName);
};
