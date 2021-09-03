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
var pg_1 = require("pg");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
// @ts-ignore
var generateEntities_1 = require("./generateEntities");
var generateDAO_1 = require("./generateDAO");
var generateCommands_1 = require("./Commands/generateCommands");
var generateLoaders_1 = require("./generateLoaders");
var generateSchemas_1 = require("./Services/generateSchemas");
var generateResolvers_1 = require("./Services/generateResolvers");
(0, dotenv_1.config)({ path: process.cwd() + "/.env" });
var oneToManyQuery = "SELECT tce.table_schema,\n                               tce.constraint_name,\n                               tce.table_name,\n                               kcu.column_name,\n                               tc.table_schema    as foreign_table_schema,\n                               tc.constraint_name as foreign_constraint_name,\n                               tc.table_name      as foreign_table_name\n                        FROM information_schema.table_constraints AS tc\n                                 JOIN information_schema.key_column_usage AS kcu\n                                      ON tc.constraint_name = kcu.constraint_name\n                                 JOIN information_schema.referential_constraints AS rc\n                                      ON rc.constraint_name = tc.constraint_name\n                                 JOIN information_schema.table_constraints as tce\n                                      ON tce.constraint_name = rc.unique_constraint_name\n                        WHERE tc.constraint_type = 'FOREIGN KEY'\n                          AND tce.table_name = $1\n                        ORDER BY foreign_table_name";
var manyToOneQuery = "SELECT tc.table_schema,\n                               tc.constraint_name,\n                               tc.table_name,\n                               kcu.column_name,\n                               tce.table_schema    as foreign_table_schema,\n                               tce.constraint_name as foreign_constraint_name,\n                               tce.table_name      as foreign_table_name\n                        FROM information_schema.table_constraints AS tc\n                                 JOIN information_schema.key_column_usage AS kcu\n                                      ON tc.constraint_name = kcu.constraint_name\n                                 JOIN information_schema.referential_constraints AS rc\n                                      ON rc.constraint_name = tc.constraint_name\n                                 JOIN information_schema.table_constraints as tce\n                                      ON tce.constraint_name = rc.unique_constraint_name\n                        WHERE tc.constraint_type = 'FOREIGN KEY'\n                          AND tc.table_name = $1\n                        ORDER BY foreign_table_name";
var client = new pg_1.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10)
});
var projectPath = (0, path_1.resolve)(process.cwd(), './src');
console.time('Generated all files');
client.connect().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.query('select table_name from information_schema.tables where table_schema = \'public\'')];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, Promise.all(result.rows.map(function (table) { return __awaiter(void 0, void 0, void 0, function () {
                        var tableName, manyToOneResult, oneToManyResult, columnResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tableName = table.table_name;
                                    return [4 /*yield*/, client.query(manyToOneQuery, [tableName])];
                                case 1:
                                    manyToOneResult = _a.sent();
                                    return [4 /*yield*/, client.query(oneToManyQuery, [tableName])];
                                case 2:
                                    oneToManyResult = _a.sent();
                                    return [4 /*yield*/, client.query('select column_name, data_type from information_schema.columns where table_name = $1', [tableName])];
                                case 3:
                                    columnResult = _a.sent();
                                    return [4 /*yield*/, Promise.all([
                                            (0, generateEntities_1.generateEntities)(columnResult.rows, projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows),
                                            (0, generateDAO_1.generateDAO)(projectPath, tableName),
                                            (0, generateCommands_1.generateCommand)(projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows),
                                            (0, generateLoaders_1.generateLoader)(projectPath, tableName),
                                            (0, generateSchemas_1.generateSchemas)(columnResult.rows, projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows),
                                            (0, generateResolvers_1.generateResolvers)(projectPath, tableName, oneToManyResult.rows, manyToOneResult.rows)
                                        ])];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })["catch"](function (e) {
    console.error(e);
})["finally"](function () {
    console.timeEnd('Generated all files');
    return client.end();
});
