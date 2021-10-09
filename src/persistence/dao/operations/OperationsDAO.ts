import { Operation } from "@Common/entities/Operation";
import { OperationType } from "@Common/entities/OperationType";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { OperationsDBFunctions } from "@Persistence/database/functions/OperationsDBFunctions";
import { IOperationsDAO } from "./IOperationsDAO";

export class OperationsDAO implements IOperationsDAO {
    async create(entity: Operation): Promise<Operation> {
        if (!entity.priceRvId) {
            throw new RequiredFieldError('priceRvId');
        }
        if (!entity.userId) {
            throw new RequiredFieldError('userId');
        }
        if (!entity.stockAmount) {
            throw new RequiredFieldError('stockAmount');
        }
        if (!entity.stockPrice) {
            throw new RequiredFieldError('stockPrice');
        }
        if (!entity.typeId) {
            throw new RequiredFieldError('typeId');
        }
        if (!entity.ivaCvId) {
            throw new RequiredFieldError('ivaCvId');
        }
        if (!entity.comissionCvId) {
            throw new RequiredFieldError('comissionCvId');
        }
        if (!entity.registerCvId) {
            throw new RequiredFieldError('registerCvId');
        }

        let query = OperationsDBFunctions.createOperation(entity.priceRvId, entity.userId, entity.stockAmount, entity.stockPrice, 
            entity.typeId, entity.ivaCvId, entity.comissionCvId, entity.registerCvId, entity.createdAt);

        let result = await Database.shared.execute(query, Operation);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Error creating Operation');
    }

    async get(where?: Operation, limit?: number, skip?: number): Promise<Operation[]> {
        if (!where?.userId) {
            throw new RequiredFieldError('userId');
        }
        if (!where?.typeId) {
            throw new RequiredFieldError('typeId');
        }
        let query = '';
        if (where.typeId == OperationType.SELL) {
            query = OperationsDBFunctions.getSellOperations(where.userId, limit, skip);
        } else if (where.typeId == OperationType.BUY) {
            query = OperationsDBFunctions.getBuyOperations(where.userId, limit, skip);
        } else {
            return Promise.reject('Operation type is not valid');
        }
        let result = await Database.shared.execute(query, Operation);
        return result;
    }

    update(where: Operation, entity: Operation): Promise<Operation> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: Operation): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}