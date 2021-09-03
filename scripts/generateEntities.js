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
exports.generateEntities = void 0;
var fs_1 = require("fs");
// @ts-ignore
var auxiliaries_1 = require("../src/Common/Utils/auxiliaries");
var dataTypes;
(function (dataTypes) {
    dataTypes["integer"] = "number";
    dataTypes["character varying"] = "string";
    dataTypes["boolean"] = "boolean";
    dataTypes["date"] = "Date";
})(dataTypes || (dataTypes = {}));
var generateEntities = function (columns, path, tableName, oneToMany, manyToOne) { return __awaiter(void 0, void 0, void 0, function () {
    var className, entitiesPath, file, constructor;
    return __generator(this, function (_a) {
        className = (0, auxiliaries_1.removeDoctive)(tableName);
        className = (0, auxiliaries_1.snakeToCamelCase)(className);
        entitiesPath = "Common/Entities/" + className + ".ts";
        console.info("Generating " + entitiesPath);
        file = generateInitialFile(className);
        constructor = "   constructor(entity?: " + className + ") {\n        super(entity);";
        columns.map(function (column) {
            var columnName = column.column_name;
            var dataType = column.data_type;
            if (columnName !== 'id') {
                var variableName = (0, auxiliaries_1.snakeToCamelCase)(columnName);
                // @ts-ignore
                file += "\n    " + variableName + "?: " + dataTypes[dataType] + ";";
                constructor += "\n        this." + variableName + " = entity ? entity." + variableName + " : undefined;";
            }
        });
        constructor += "\n   }";
        oneToMany.map(function (value) {
            var _a;
            var dataType;
            _a = __read(addImport(value, file, className), 2), dataType = _a[0], file = _a[1];
            file += "\n    " + (0, auxiliaries_1.minimizeFirstLetter)(className === dataType ? "Sub" + dataType : dataType) + "s?: " + dataType + "[];";
        });
        manyToOne.map(function (value) {
            var _a;
            var dataType;
            _a = __read(addImport(value, file, className), 2), dataType = _a[0], file = _a[1];
            file += "\n    " + (0, auxiliaries_1.minimizeFirstLetter)(className === dataType ? "Parent" + dataType : dataType) + "?: " + dataType + ";";
        });
        file += "\n\n" + constructor;
        file += '\n}\n';
        (0, fs_1.writeFileSync)(path + "/" + entitiesPath, file);
        return [2 /*return*/];
    });
}); };
exports.generateEntities = generateEntities;
var generateInitialFile = function (className) {
    return "import {Entity} from '@Common/Entities/Entity';\nexport class " + className + " extends Entity {";
};
var addImport = function (value, file, className) {
    var dataType = (0, auxiliaries_1.removeDoctive)(value.foreign_table_name);
    dataType = (0, auxiliaries_1.snakeToCamelCase)(dataType);
    if (dataType !== className) {
        file = "import {" + dataType + "} from '@Common/Entities/" + dataType + "';\n" + file;
    }
    return [dataType, file];
};
