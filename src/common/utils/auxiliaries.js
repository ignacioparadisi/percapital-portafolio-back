"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getCaseInsensitiveName = exports.getValueForFlureeQuery = exports.toFlureeId = exports.getInQueryFromBatch = exports.getOrderByFromObject = exports.getWhereStatementFromObject = exports.removeId = exports.stripUndefined = exports.getRelationEntityFromDB = exports.getEntityFromDB = exports.getQueryFromEntity = exports.capitalizeFirstLetter = exports.minimizeFirstLetter = exports.addDoctive = exports.removeDoctive = exports.camelToSnakeCase = exports.snakeToCamelCase = void 0;
var snakeToCamelCase = function (snakeCase, slice) {
    if (slice === void 0) { slice = false; }
    var snakeCaseAux = snakeCase;
    if (slice) {
        snakeCaseAux = snakeCase.slice(4, snakeCaseAux.length);
    }
    var aux = snakeCaseAux.split('_');
    var variableName = '';
    aux.map(function (value, index) {
        if (index !== 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        variableName += value;
    });
    return variableName;
};
exports.snakeToCamelCase = snakeToCamelCase;
var camelToSnakeCase = function (camelCase) {
    var e_1, _a;
    var columnMatches = camelCase.match(/[A-Z]/g);
    var snakeCase = camelCase;
    var firstUpper = false;
    if (columnMatches) {
        try {
            for (var columnMatches_1 = __values(columnMatches), columnMatches_1_1 = columnMatches_1.next(); !columnMatches_1_1.done; columnMatches_1_1 = columnMatches_1.next()) {
                var match = columnMatches_1_1.value;
                if (snakeCase.indexOf(match) === 0) {
                    firstUpper = true;
                }
                snakeCase = snakeCase.replace(match, '_' + match.toLowerCase());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (columnMatches_1_1 && !columnMatches_1_1.done && (_a = columnMatches_1["return"])) _a.call(columnMatches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (firstUpper) {
            snakeCase = snakeCase.slice(1, snakeCase.length);
        }
    }
    return snakeCase;
};
exports.camelToSnakeCase = camelToSnakeCase;
var removeDoctive = function (value) {
    var returnValue = value.replace('doctive_', '');
    return returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
};
exports.removeDoctive = removeDoctive;
var addDoctive = function (value) { return 'doctive_' + value; };
exports.addDoctive = addDoctive;
var minimizeFirstLetter = function (value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
};
exports.minimizeFirstLetter = minimizeFirstLetter;
var capitalizeFirstLetter = function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
var getQueryFromEntity = function (entity, queryModel) {
    var queryToBuild = {};
    Object.keys(entity).map(function (key) {
        // @ts-ignore
        if (entity[key]) {
            // @ts-ignore
            queryToBuild[queryModel[key]] = entity[key];
        }
    });
    return queryToBuild;
};
exports.getQueryFromEntity = getQueryFromEntity;
var getEntityFromDB = function (entityFromDB, queryModel) {
    var entity = {};
    Object.keys(entityFromDB).map(function (key) {
        Object.keys(queryModel).map(function (modelKey) {
            // @ts-ignore
            if (queryModel[modelKey] === key) {
                // @ts-ignore
                entity[modelKey] = entityFromDB[key];
            }
        });
    });
    return entity;
};
exports.getEntityFromDB = getEntityFromDB;
var getRelationEntityFromDB = function (entityFromDB, queryModel) {
    var entity = {};
    // @ts-ignore
    var modelKeys = Object.keys(queryModel).map(function (key) { return queryModel[key]; });
    console.info('MOdel keys', modelKeys);
    Object.keys(entityFromDB).map(function (key) {
        if (!modelKeys.includes(key)) {
            console.info('Storing key', key);
            // @ts-ignore
            entity[(0, exports.snakeToCamelCase)(key)] = entityFromDB[key];
        }
    });
    return entity;
};
exports.getRelationEntityFromDB = getRelationEntityFromDB;
var stripUndefined = function (object) {
    var newObject = {};
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key]) {
                newObject[key] = object[key];
            }
        }
    }
    return newObject;
};
exports.stripUndefined = stripUndefined;
var removeId = function (object) {
    if (object.PREDICATE_NAME) {
        delete object.PREDICATE_NAME;
    }
    console.info('object', object);
    var newObject = {};
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var newKey = key;
            if (!['nationalId', 'professionalId', 'personalId'].includes(key)) {
                newKey = key.replace('Id', '');
            }
            newObject[newKey] = object[key];
        }
    }
    return newObject;
};
exports.removeId = removeId;
var getWhereStatementFromObject = function (object) {
    var whereString = '';
    Object.keys(object).forEach(function (key, i) {
        if (key !== '_id') {
            var assignationString = key + " = " + (0, exports.getValueForFlureeQuery)(object[key]);
            if (i === 0) {
                whereString = assignationString;
            }
            else {
                whereString += " AND " + assignationString;
            }
        }
    });
    return whereString;
};
exports.getWhereStatementFromObject = getWhereStatementFromObject;
var getOrderByFromObject = function (object) {
    if (object) {
        var key = Object.keys(object)[0];
        return [object[key], key];
    }
};
exports.getOrderByFromObject = getOrderByFromObject;
var getInQueryFromBatch = function (parentIdName, values) {
    console.debug("[getInQueryFromBatch] Values param: ", values);
    var query = '';
    var name = parentIdName.replace('Id', '');
    values.forEach(function (value, i) {
        var comparison = name + " = " + (0, exports.getValueForFlureeQuery)(value);
        if (i === 0) {
            query = comparison;
        }
        else {
            query += " OR " + comparison;
        }
    });
    return query;
};
exports.getInQueryFromBatch = getInQueryFromBatch;
/** Function that converts an optional GraphQL ID (string) to a Fluree ID (number) */
var toFlureeId = function (strId) {
    return strId ? +strId : undefined;
};
exports.toFlureeId = toFlureeId;
var getValueForFlureeQuery = function (value) {
    return typeof value === 'string'
        ? "\"" + value + "\""
        : Array.isArray(value)
            ? typeof value[0] === 'string'
                ? "\"" + value[0] + "\""
                : value[0]
            : value;
};
exports.getValueForFlureeQuery = getValueForFlureeQuery;
var getCaseInsensitiveName = function (value) {
    var accents = ['aá', 'eé', 'ií', 'oó', 'uú'];
    var returnValue = value.toLowerCase();
    var accumulator = 0;
    __spreadArray([], __read(value.toLowerCase()), false).forEach(function (char, index) {
        var e_2, _a;
        try {
            for (var accents_1 = __values(accents), accents_1_1 = accents_1.next(); !accents_1_1.done; accents_1_1 = accents_1.next()) {
                var accent = accents_1_1.value;
                if (accent.includes(char)) {
                    var element = accents.find(function (val) { return val.includes(char); });
                    var splitted = returnValue.split('');
                    splitted[index + accumulator] = "[" + element + "]";
                    returnValue = splitted.join('');
                    accumulator += 3;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (accents_1_1 && !accents_1_1.done && (_a = accents_1["return"])) _a.call(accents_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
    return returnValue;
};
exports.getCaseInsensitiveName = getCaseInsensitiveName;
