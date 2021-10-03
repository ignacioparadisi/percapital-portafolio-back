import { Operation } from "@Common/entities/Operation";
import { OperationType } from "@Common/entities/OperationType";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { OperationsDBFunctions } from "@Persistence/database/functions/OperationsDBFunctions";
import { IOperationsDAO } from "./IOperationsDAO";

export class OpertaionsDAO implements IOperationsDAO {
    create(entity: Operation): Promise<Operation> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
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