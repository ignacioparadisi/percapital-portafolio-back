"use strict";
exports.__esModule = true;
exports.Entity = void 0;
var Entity = /** @class */ (function () {
    function Entity(entity, PREDICATE_NAME) {
        this.PREDICATE_NAME = PREDICATE_NAME;
        this._id = (entity === null || entity === void 0 ? void 0 : entity._id) ? Number(entity._id) : undefined;
    }
    return Entity;
}());
exports.Entity = Entity;
